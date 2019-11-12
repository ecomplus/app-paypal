'use strict'

// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, createPaymentBody) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret)

  return new Promise((resolve, reject) => {
    // create payment with PayPal API v1
    // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment/create_with_paypal.js
    paypal.payment.create(createPaymentBody, (err, payment) => {
      if (err) {
        const { response } = err
        if (response && response.httpStatusCode === 400) {
          // debug PayPal API response details
          if (response.details) {
            response.details = JSON.stringify(response.details, null, 2)
            err.data = JSON.stringify(createPaymentBody, null, 2)
          }
        }
        logger.error(err)
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}
