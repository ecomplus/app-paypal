'use strict'

// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, paymentId, executePaymentBody, paypalPlus) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret, paypalPlus)

  return new Promise((resolve, reject) => {
    // execute payment with PayPal API v1
    // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment/execute.js
    const tryExecute = executePaymentBody => {
      paypal.payment.execute(paymentId, executePaymentBody, (err, payment) => {
        if (!err) {
          resolve(payment)
        } else {
          const { response } = err
          if (response && response.httpStatusCode === 400) {
            if (
              (!response.name || response.name === 'VALIDATION_ERROR') &&
              Array.isArray(executePaymentBody.transactions) &&
              executePaymentBody.transactions[0]
            ) {
              const { amount } = executePaymentBody.transactions[0]
              if (amount && amount.details) {
                // retry without transaction amount details (optional)
                return setTimeout(() => {
                  tryExecute(Object.assign(executePaymentBody, {
                    transactions: [{
                      amount: {
                        currency: amount.currency,
                        total: amount.total
                      }
                    }]
                  }))
                }, 300)
              }
            }

            // debug PayPal API response details
            if (response.details) {
              response.details = JSON.stringify(response.details, null, 2)
            }
          }
          if (response.name !== 'INSTRUMENT_DECLINED') {
            logger.error(err)
          }
          reject(err)
        }
      })
    }
    tryExecute(executePaymentBody)
  })
}
