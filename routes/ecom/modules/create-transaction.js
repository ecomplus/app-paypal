'use strict'

// log on files
const logger = require('console-files')
// get pre-created PayPal order
const getPaypalOrder = require(process.cwd() + '/lib/paypal-api/get-order')
// get pre-created PayPal payment
const getPaypalPayment = require(process.cwd() + '/lib/paypal-api/get-payment')
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
            // execute payment
            // https://developer.paypal.com
            // /docs/integration/paypal-plus/mexico-brazil/test-your-integration-and-execute-the-payment/
            const executePaymentBody = {
              payer_id: paypalPayerId
            }
            const paypalPlus = Boolean(params.payment_method && params.payment_method.code === 'credit_card')

            // must get payment before execute to read installments info
            const mergePaypalPayment = {}
            getPaypalPayment(
              paypalEnv,
              paypalClientId,
              paypalSecret,
              paypalPaymentId,
              paypalPlus
            )
              .then(paypalPayment => {
                ['credit_financing_offered'].forEach(paymentProp => {
                  mergePaypalPayment[paymentProp] = paypalPayment[paymentProp]
                })
                logger.log(`PayPal Payment:\n${paypalPayment}`)
              })
              .catch(e => {
                // already debugged
                // ignore here to execute anyway
              })

              .finally(() => {
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
                  .catch(reject)
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

        .then(({ paypalOrderId, paypalPayment, paypalInvoiceNumber }) => {
          // debug new order
          logger.log(`New PayPal order ${paypalOrderId} for store #${storeId} /${orderId}`)

          if (!paypalPayment) {
            // send request to PayPal API
            // https://developer.paypal.com/docs/api/orders/v2/#orders_get
            return getPaypalOrder(paypalEnv, paypalClientId, paypalSecret, paypalOrderId)
          } else {
            return {
              invoice_number: paypalInvoiceNumber,
              ...paypalPayment,
              reference_id: paypalOrderId
            }
          }
        })

        .then(paypalOrder => {
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
                if (link.rel === 'approve') {
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
            // mount response body
            // https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
            const transaction = {
              amount,
              intermediator: {
                transaction_id: paypalOrder.id,
                transaction_code: transactionCode
              },
              status: {
                current: 'under_analysis'
              }
            }
            if (paymentLink) {
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

            if (transactionCode) {
              // save to order database if not already saved
              return get(transactionCode)
                .then(data => {
                  if (!data) {
                    throw new Error('Empty databse row ?')
                  }
                  // duplicated order ?
                  res.status(400).send({
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
                      res.send({ transaction })
                    })
                })
            } else {
              // send response with additional notes
              transaction.notes = 'ATENTION: Can\'t save PayPal reference to update order status'
              return res.send({ transaction })
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
          res.status(err.statusCode || 500)
          const { message } = err
          res.send({
            error: 'CREATE_TRANSACTION_ERR',
            message
          })
        })
    } else {
      // no PayPal credentials
      res.status(400).send({
        error: 'CREATE_TRANSACTION_DISABLED',
        message: 'PayPal Client ID is unset on app hidden data (payment method unavailable)'
      })
    }
  }
}
