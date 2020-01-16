'use strict'

// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, paymentId, paypalPlus) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret, paypalPlus)

  return new Promise((resolve, reject) => {
    // get payment with PayPal API v1
    // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment/get.js
    paypal.payment.get(paymentId, (err, payment) => {
      if (err) {
        const { response } = err
        if (response && response.httpStatusCode !== 404) {
          // debug PayPal API response
          logger.error(err)
        }
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}
