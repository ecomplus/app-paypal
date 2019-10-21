'use strict'

// log on files
const logger = require('console-files')
// get store and order ID from local database based on PayPal transaction code
const { get } = require(process.cwd() + '/lib/database')
// read configured E-Com Plus app data
const getConfig = require(process.cwd() + '/lib/store-api/get-config')
// update order transaction status on Store API
const updatePaymentStatus = require(process.cwd() + '/lib/store-api/update-payment-status')
// list orders from E-Com Plus Store API searching by transaction code
const listOrdersByTransaction = require(process.cwd() + '/lib/store-api/list-orders-by-transaction')
// validate and read PayPal webhook event
const verifyWebhook = require(process.cwd() + '/lib/paypal-api/verify-webhook')
// get intermediator object from payment gateway object
const { intermediator } = require(process.cwd() + '/lib/new-payment-gateway')()

const CLIENT_ERR = 'invalidClient'

module.exports = appSdk => {
  return (req, res) => {
    const { body } = req
    // handle PayPal webhook body
    // https://developer.paypal.com/docs/integration/direct/webhooks/notification-messages/
    const transactionCode = body && body.resource && body.resource.id
    if (!transactionCode) {
      return res.sendStatus(400)
    }

    // declare reusable Store API authentication object and Store ID
    let sdkClient, storeId

    // get Store ID first
    get(transactionCode)

      .then(data => {
        storeId = data.storeId
        // logger.log(storeId)
        // pre-authenticate to reuse auth object
        return appSdk.getAuth(storeId)
      })

      .then(auth => {
        sdkClient = { appSdk, storeId, auth }
        // get app configured options
        // including hidden (authenticated) data
        return getConfig(sdkClient, true)
      })

      .then(config => {
        // PayPal app credentials
        const paypalClientId = config.paypal_client_id
        const paypalSecret = config.paypal_secret
        const paypalEnv = config.paypal_sandbox && 'sandbox'
        if (paypalClientId && paypalSecret) {
          // read and verify PayPal webhook event
          return verifyWebhook(paypalEnv, paypalClientId, paypalSecret, body)
        } else {
          const err = new Error('No configured PayPal app credentials')
          err.name = CLIENT_ERR
          throw err
        }
      })

      .then(paypalEvent => {
        // we have full PayPal event object here
        // parse PayPal event type to E-Com Plus financial status
        let status
        switch (paypalEvent.event_type) {
          case 'PAYMENT.AUTHORIZATION.CREATED':
            status = 'under_analysis'
            break
          case 'PAYMENT.AUTHORIZATION.VOIDED':
            status = 'unauthorized'
            break
          case 'PAYMENT.CAPTURE.COMPLETED':
            status = 'paid'
            break
          case 'PAYMENT.CAPTURE.DENIED':
            status = 'voided'
            break
          case 'PAYMENT.CAPTURE.PENDING':
            status = 'pending'
            break
          case 'PAYMENT.CAPTURE.REFUNDED':
          case 'PAYMENT.CAPTURE.REVERSED':
            status = 'refunded'
            break
          default:
            // ignore unknow status
            return true
        }

        // list order IDs for respective transaction code
        return listOrdersByTransaction(sdkClient, transactionCode, intermediator.code)
          .then(orders => {
            // change transaction status on E-Com Plus API
            const notificationCode = body.notification_id
            const promises = []
            orders.forEach(order => {
              promises.push(updatePaymentStatus(sdkClient, order._id, status, notificationCode))
            })
            return Promise.all(promises)
          })
      })

      .then(() => {
        // Store API was changed with current transaction status
        // all done
        res.status(204)
        res.end()
      })

      .catch(err => {
        if (!err.request && err.name !== CLIENT_ERR) {
          // not Axios error ?
          logger.error(err)
        }
        // return response with error
        res.status(500)
        const { message } = err
        res.send({
          error: 'paypal_webhook_error',
          message
        })
      })
  }
}
