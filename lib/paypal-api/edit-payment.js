'use strict'

// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, paymentId, editPaymentBody) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret)

  return new Promise((resolve, reject) => {
    // edit payment with PayPal API v1
    // https://developer.paypal.com/docs/api/payments/v1/#payment_update
    let patchRequestBody
    if (!Array.isArray(editPaymentBody)) {
      patchRequestBody = []
      for (const field in editPaymentBody) {
        const value = editPaymentBody[field]
        if (value) {
          patchRequestBody.push({
            op: 'add',
            path: `/transactions/0/${field}`,
            value
          })
        }
      }
    } else {
      patchRequestBody = editPaymentBody
    }

    paypal.payment.update(paymentId, patchRequestBody, (err, payment) => {
      if (err) {
        const { response } = err
        if (response) {
          const { httpStatusCode, details } = response
          if (httpStatusCode === 400 && details) {
            // debug PayPal API response details
            response.details = JSON.stringify(details, null, 2)
            err.origin = 'edit-payment'
            logger.error(err)
          }
        }
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}
