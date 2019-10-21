'use strict'

// get pre-created PayPal order
const getPaypalOrder = require(process.cwd() + '/lib/paypal-api/get-order')
// SQLite3 database abstracted
const { save } = require(process.cwd() + '/lib/database')

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

    if (paypalClientId && paypalSecret) {
      // params object follows create transaction request schema:
      // https://apx-mods.e-com.plus/api/v1/create_transaction/schema.json?store_id=100
      const orderId = params.order_id
      const paypalOrderId = params.open_payment_id

      // send request to PayPal API
      // https://developer.paypal.com/docs/api/orders/v2/#orders_get
      getPaypalOrder(paypalEnv, paypalClientId, paypalSecret, paypalOrderId)

        .then(paypalOrder => {
          // validate transaction amount
          if (Array.isArray(paypalOrder.purchase_units) && paypalOrder.purchase_units.length) {
            const paypalPurchaseUnit = paypalOrder.purchase_units[0]
            const amount = parseFloat(paypalPurchaseUnit.amount.value)
            if (amount && amount >= params.amount.total) {
              // mount response body
              // https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100
              const transaction = {
                amount,
                intermediator: {
                  transaction_id: paypalOrder.id,
                  transaction_code: paypalOrder.id
                }
              }

              // save some PayPal order data
              if (Array.isArray(paypalOrder.links)) {
                for (let i = 0; i < paypalOrder.links.length; i++) {
                  const link = paypalOrder.links[i]
                  if (link.rel === 'approve') {
                    transaction.payment_link = link.href
                    break
                  }
                }
              }
              transaction.intermediator.transaction_reference = paypalPurchaseUnit.reference_id

              // save to order database
              return save(paypalOrderId, storeId, orderId)
                .then(() => {
                  // all done
                  // send response and finish process
                  res.send({ transaction })
                })
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
          res.status(500)
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
