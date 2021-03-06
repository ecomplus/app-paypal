'use strict'

// log on files
const logger = require('console-files')
// abstractions to setup PayPal SDK
const initClient = require('./init-client')
const newConfig = require('./_new-config')

module.exports = (env, clientId, clientSecret, paymentId, executePaymentBody, paypalPlus) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret, paypalPlus)

  return new Promise((resolve, reject) => {
    // execute payment with PayPal API v1
    // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment/execute.js
    const tryExecute = executePaymentBody => {
      // override client config to ensure params
      const config = newConfig(env, clientId, clientSecret, paypalPlus)
      paypal.payment.execute(paymentId, executePaymentBody, config, (err, payment) => {
        if (!err) {
          resolve(payment)
        } else {
          const { response } = err
          if (response && response.httpStatusCode === 400) {
            // debug PayPal API response details
            if (response.details) {
              response.details = JSON.stringify(response.details, null, 2)
            }

            if (
              (!response.name || response.name === 'VALIDATION_ERROR') &&
              Array.isArray(executePaymentBody.transactions) &&
              executePaymentBody.transactions[0]
            ) {
              const { amount } = executePaymentBody.transactions[0]
              if (amount && amount.details) {
                logger.error(err)
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
          }

          if (response.name !== 'INSTRUMENT_DECLINED') {
            err.origin = 'execute-payment'
            logger.error(err)
          }
          reject(err)
        }
      })
    }
    tryExecute(executePaymentBody)
  })
}
