'use strict'

module.exports = (env, clientId, clientSecret) => {
  // setup and configure PayPal REST API client
  const paypal = require('paypal-rest-sdk')
  paypal.configure({
    mode: env || process.env.DEFAULT_PAYPAL_ENV,
    client_id: clientId,
    client_secret: clientSecret
  })
  return paypal
}
