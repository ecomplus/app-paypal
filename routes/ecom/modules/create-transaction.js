'use strict'

// log on files
const logger = require('console-files')
// get pre-created PayPal order
const getPaypalOrder = require(process.cwd() + '/lib/paypal-api/get-order')
// get pre-created PayPal payment
const getPaypalPayment = require(process.cwd() + '/lib/paypal-api/get-payment')
// parse create transaction body to PayPal model
const parsePaymentBody = require(process.cwd() + '/lib/parse-payment-body')
// update PayPal payment transaction
const editPaypalPayment = require(process.cwd() + '/lib/paypal-api/edit-payment')
// execute PayPal payment request
const executePaypalPayment = require(process.cwd() + '/lib/paypal-api/execute-payment')
// SQLite3 database abstracted
const { get, save } = require(process.cwd() + '/lib/database')

module.exports = appSdk => {
  return (req, res) => {
    const { storeId, body } = req
    // body was already pre-validated on @/bin/web.js
    // treat module request body
    const { params, application } = body
    // app configured options
    const config = Object.assign({}, application.data, application.hidden_data)

    // PayPal app credentials
    const paypalClientId = config.paypal_client_id
    const paypalSecret = config.paypal_secret
    const paypalEnv = config.paypal_sandbox && 'sandbox'

    if (paypalClientId && paypalSecret && params.open_payment_id) {
      // params object follows create transaction request schema:
      // https://apx-mods.e-com.plus/api/v1/create_transaction/schema.json?store_id=100
      const orderId = params.order_id

      new Promise((resolve, reject) => {
        const paypalPayerId = params.intermediator_buyer_id
        if (paypalPayerId) {
          const [
            paypalPaymentId,
            paypalOrderId,
            paypalInvoiceNumber
          ] = params.open_payment_id.split('/')
          if (paypalPaymentId && paypalOrderId) {
            // must get payment before execute to read installments info
            const paypalPlus = Boolean(params.payment_method && params.payment_method.code === 'credit_card')
            let initialPaypalPayment
            const mergePaypalPayment = {}

            getPaypalPayment(
              paypalEnv,
              paypalClientId,
              paypalSecret,
              paypalPaymentId,
              paypalPlus
            )
              .then(paypalPayment => {
                initialPaypalPayment = paypalPayment
                ;['credit_financing_offered'].forEach(paymentProp => {
                  mergePaypalPayment[paymentProp] = paypalPayment[paymentProp]
                })
                // logger.log(`PayPal Payment:\n${JSON.stringify(paypalPayment, null, 2)}`)
              })
              .catch(e => {
                // already debugged
                // ignore here to execute anyway
              })

              .finally(() => {
                // execute payment
                // https://developer.paypal.com
                // /docs/integration/paypal-plus/mexico-brazil/test-your-integration-and-execute-the-payment/
                const round = n => n ? Math.round(n * 100) / 100 : 0
                let total = round(params.amount.total)
                let subtotal
                let updatingPayment

                try {
                  const { amount } = initialPaypalPayment.transactions[0]
                  subtotal = Number(amount.details.subtotal)
                  if (amount.total) {
                    const amountDiff = total - Number(amount.total)
                    if (amountDiff) {
                      if (round(Math.abs(amountDiff)) <= 0.02) {
                        // hardfix to keep exact payment total
                        total = Number(amount.total)
                      } else {
                        // try to update payment amount before execute
                        const createPaymentBody = parsePaymentBody(params)
                        const editPaymentBody = [{
                          op: 'replace',
                          path: '/transactions/0/amount',
                          value: createPaymentBody.transactions[0].amount
                        }, {
                          op: 'replace',
                          path: '/transactions/0/item_list/items',
                          value: createPaymentBody.transactions[0].item_list.items
                        }]

                        updatingPayment = editPaypalPayment(
                          paypalEnv,
                          paypalClientId,
                          paypalSecret,
                          paypalPaymentId,
                          editPaymentBody
                        )
                      }
                    }
                  }
                } catch (e) {
                  subtotal = round(params.amount.subtotal)
                }

                let isRetry = false
                const tryExecute = isPaymentUpdated => {
                  const executePaymentBody = {
                    payer_id: paypalPayerId
                  }
                  if (isPaymentUpdated !== true) {
                    // must specify execution amount
                    const freight = round(params.amount.freight)
                    const fixedSubtotal = subtotal + freight <= total ? subtotal : total - freight
                    executePaymentBody.transactions = [{
                      amount: {
                        total: total.toFixed(2),
                        currency: params.currency_id || 'BRL',
                        details: {
                          subtotal: fixedSubtotal.toFixed(2),
                          shipping: freight.toFixed(2),
                          tax: (total - fixedSubtotal - freight).toFixed(2)
                        }
                      }
                    }]
                  }

                  // debug payment execution
                  logger.log(`Executing ${paypalPaymentId} for #${storeId} with client ID ${paypalClientId}`)
                  executePaypalPayment(
                    paypalEnv,
                    paypalClientId,
                    paypalSecret,
                    paypalPaymentId,
                    executePaymentBody,
                    paypalPlus
                  )
                    .then(paypalPayment => resolve({
                      paypalOrderId,
                      paypalPayment: Object.assign(paypalPayment, mergePaypalPayment),
                      paypalInvoiceNumber
                    }))

                    .catch(err => {
                      if (
                        !isRetry &&
                        (!err.httpStatusCode || err.httpStatusCode === 400 || err.httpStatusCode >= 500)
                      ) {
                        if (!(err.httpStatusCode >= 500)) {
                          // try to hardfix amount one cent
                          const fixedTotal = parseInt(params.amount.total * 100) / 100
                          if (fixedTotal < total.toFixed(2)) {
                            total -= 0.006
                          } else {
                            total += 0.006
                          }
                        }
                        isRetry = true
                        setTimeout(tryExecute, 300)
                      } else {
                        if (err.response && err.response.name === 'PAYER_ACTION_REQUIRED') {
                          // try redirecting user to payment on PayPal checkout
                          let redirectPaymentUri
                          if (Array.isArray(initialPaypalPayment.links)) {
                            const linkObj = initialPaypalPayment.links.find(({ rel }) => rel === 'approval_url')
                            if (linkObj) {
                              redirectPaymentUri = linkObj.href
                            }
                          }
                          if (redirectPaymentUri) {
                            return resolve({
                              paypalOrderId,
                              paypalPayment: Object.assign(initialPaypalPayment, mergePaypalPayment),
                              paypalInvoiceNumber,
                              redirectPaymentUri
                            })
                          }
                        }

                        if (err.httpStatusCode === 400) {
                          const error = new Error('PayPal execute with error')
                          error.initialPaypalPayment = JSON.stringify(initialPaypalPayment)
                          error.executePaymentBody = JSON.stringify(executePaymentBody)
                          logger.error(error)
                        }
                        reject(err)
                      }
                    })
                }

                if (updatingPayment) {
                  // wait payment edit request
                  updatingPayment
                    .then(() => {
                      tryExecute(true)
                    })
                    .catch(() => {
                      tryExecute()
                    })
                } else {
                  tryExecute()
                }
              })
          } else {
            const err = new Error('Unknown PayPal Payment/Order IDs')
            err.statusCode = 400
            reject(err)
          }
        } else {
          resolve({ paypalOrderId: params.open_payment_id })
        }
      })

        .then(({ paypalOrderId, paypalPayment, paypalInvoiceNumber, redirectPaymentUri }) => {
          // debug new order
          logger.log(`New PayPal order ${paypalOrderId} for store #${storeId} /${orderId}`)

          if (!paypalPayment) {
            // send request to PayPal API
            // https://developer.paypal.com/docs/api/orders/v2/#orders_get
            return getPaypalOrder(paypalEnv, paypalClientId, paypalSecret, paypalOrderId)
              .then(paypalOrder => ({ paypalOrder }))
          } else {
            return {
              paypalOrder: {
                invoice_number: paypalInvoiceNumber,
                ...paypalPayment,
                reference_id: paypalOrderId
              },
              redirectPaymentUri
            }
          }
        })

        .then(({ paypalOrder, redirectPaymentUri }) => {
          // validate transaction amount
          let amount, transactionCode, paymentLink, paymentReference

          if (Array.isArray(paypalOrder.purchase_units) && paypalOrder.purchase_units.length) {
            // PayPal Checkout v2
            const paypalPurchaseUnit = paypalOrder.purchase_units[0]
            // authorizations, captures
            const paypalPaymentType = paypalPurchaseUnit.payments &&
              Object.keys(paypalPurchaseUnit.payments)[0]
            const paypalPayment = paypalPaymentType &&
              paypalPurchaseUnit.payments[paypalPaymentType][0]

            transactionCode = paypalPayment ? paypalPayment.id : paypalOrder.id
            amount = paypalPurchaseUnit.amount
              ? parseFloat(paypalPurchaseUnit.amount.value)
              : paypalPayment && parseFloat(paypalPayment.amount.value)

            // save some additional PayPal order data
            if (Array.isArray(paypalOrder.links)) {
              for (let i = 0; i < paypalOrder.links.length; i++) {
                const link = paypalOrder.links[i]
                if (link.rel === 'approve' || link.rel === 'approval_url') {
                  paymentLink = link.href
                  break
                }
              }
            }
            paymentReference = paypalPurchaseUnit.reference_id
          } else if (Array.isArray(paypalOrder.transactions)) {
            const paypalTransaction = paypalOrder.transactions[0]
            if (paypalTransaction) {
              // PayPal Payments v1
              // PayPal Plus executed payment
              // https://developer.paypal.com
              // /docs/integration/paypal-plus/mexico-brazil/test-your-integration-and-execute-the-payment/
              const paypalSale = Array.isArray(paypalTransaction.related_resources) &&
                paypalTransaction.related_resources[0] &&
                paypalTransaction.related_resources[0].sale

              paymentReference = paypalOrder.reference_id
              transactionCode = paypalSale ? paypalSale.id : paymentReference
              amount = paypalTransaction.amount && parseFloat(paypalTransaction.amount.total)
            }
          }

          if (amount && amount >= params.amount.total * 0.975) {
            // mount response transaction
            // https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
            const transaction = {
              amount,
              intermediator: {
                transaction_id: paypalOrder.id,
                transaction_code: transactionCode
              },
              status: {
                current: redirectPaymentUri ? 'pending' : 'under_analysis'
              }
            }
            if (redirectPaymentUri) {
              transaction.payment_link = redirectPaymentUri
              transaction.notes = 'ATENÇÃO: Não foi possível efetuar a cobrança, ' +
                'é necessário finalizar o pagamento diretamente no PayPal'
            } else if (paymentLink) {
              transaction.payment_link = paymentLink
            }
            const transactionReference = paypalOrder.invoice_number || paymentReference
            if (transactionReference) {
              transaction.intermediator.transaction_reference = transactionReference
            }

            const creditFinancing = paypalOrder.credit_financing_offered
            if (creditFinancing && creditFinancing.term) {
              // save selected installments option
              transaction.installments = {
                number: creditFinancing.term,
                tax: false
              }
              ;['monthly_payment', 'total_cost'].forEach(creditFinancingProp => {
                if (creditFinancing[creditFinancingProp]) {
                  const value = parseFloat(creditFinancing[creditFinancingProp].value)
                  if (value) {
                    const installmentsProp = creditFinancingProp === 'total_cost'
                      ? 'total' : 'value'
                    transaction.installments[installmentsProp] = value
                  }
                }
              })
            }

            if (params.amount.total && params.amount.total !== amount) {
              // save received amount on custom fields for debug
              transaction.custom_fields = transaction.custom_fields || []
              for (const amountField in params.amount) {
                if (typeof params.amount[amountField] === 'number') {
                  if (transaction.custom_fields.length >= 10) {
                    break
                  } else {
                    transaction.custom_fields.push({
                      field: `pr_amount_${amountField}`,
                      value: params.amount[amountField].toString()
                    })
                  }
                }
              }
            }

            // final create transaction response payload
            const response = {
              transaction,
              redirect_to_payment: Boolean(redirectPaymentUri)
            }

            if (transactionCode) {
              // save to order database if not already saved
              return get(transactionCode)
                .then(data => {
                  if (!data) {
                    throw new Error('Empty databse row ?')
                  }
                  // duplicated order ?
                  res.status(409).send({
                    error: 'TRANSACTION_CODE_DUPLICATED',
                    message: 'Ignoring PayPal order ID already fulfilled'
                  })
                })

                .catch(() => {
                  // save new transaction code
                  save(transactionCode, storeId, orderId)
                    .then(() => {
                      // all done
                      // send response and finish process
                      res.send(response)
                    })
                })
            } else {
              // send response with additional notes
              transaction.notes = 'ATENTION: Can\'t save PayPal reference to update order status'
              return res.send(response)
            }
          }

          // invalid PayPal order
          res.status(400).send({
            error: 'CREATE_TRANSACTION_INVALID',
            message: 'PayPal order ID not valid for this create transaction request'
          })
        })

        .catch(err => {
          // return error status code
          res.status(err.httpStatusCode || err.statusCode || 500)
          res.send({
            error: 'CREATE_TRANSACTION_ERR',
            message: (err.response && err.response.message) || err.message
          })
        })
    } else {
      // no PayPal credentials
      res.status(409).send({
        error: 'CREATE_TRANSACTION_DISABLED',
        message: 'PayPal Client ID is unset on app hidden data (payment method unavailable)'
      })
    }
  }
}
