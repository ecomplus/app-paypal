'use strict'

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI
// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

// preset webhook body with Paypal event names
// https://developer.paypal.com/docs/integration/direct/webhooks/event-names/#authorized-and-captured-payments
const webhookBody = {
  url: `${appBaseUri}/paypal/webhook`,
  event_types: [
    'PAYMENT.AUTHORIZATION.CREATED',
    'PAYMENT.AUTHORIZATION.VOIDED',
    'PAYMENT.CAPTURE.COMPLETED',
    'PAYMENT.CAPTURE.DENIED',
    'PAYMENT.CAPTURE.PENDING',
    'PAYMENT.CAPTURE.REFUNDED',
    'PAYMENT.CAPTURE.REVERSED'
  ].map(name => ({ name }))
}

module.exports = (env, clientId, clientSecret) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret)

  // check if webhook is not already created
  // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/notifications/webhooks/list.js
  return new Promise((resolve, reject) => {
    paypal.notification.webhook.list((err, webhooks) => {
      if (err) {
        logger.error(err)
        reject(err)
      } else {
        if (!Array.isArray(webhooks) || !webhooks.find(({ url }) => url === webhookBody.url)) {
          // must register new webhook
          // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/notifications/webhooks/create.js
          paypal.notification.webhook.create(webhookBody, (err, webhook) => {
            if (err) {
              logger.error(err)
              reject(err)
            } else {
              resolve()
            }
          })
        } else {
          // PayPal webhook already registered
          resolve()
        }
      }
    })
  })
}
