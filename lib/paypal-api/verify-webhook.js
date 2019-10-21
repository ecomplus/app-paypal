'use strict'

// log on files
// const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, eventBody) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret)

  // verify received notification body
  // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/notifications/webhook-events/get_and_verify.js
  return new Promise((resolve, reject) => {
    paypal.notification.webhookEvent.getAndVerify(eventBody, (err, response) => {
      if (err) {
        // invalid webhook ?
        // logger.error(err)
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}
