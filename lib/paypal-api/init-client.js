'use strict'

const { DEFAULT_PAYPAL_ENV, PAYPAL_PARTNER_ID } = process.env

module.exports = (env, clientId, clientSecret, paypalPlus = false) => {
  // setup and configure PayPal REST API client
  const paypal = require('paypal-rest-sdk')
  const paypalOptions = {
    mode: env || DEFAULT_PAYPAL_ENV,
    client_id: clientId,
    client_secret: clientSecret
  }
  if (PAYPAL_PARTNER_ID) {
    paypalOptions.headers = {
      'PayPal-Partner-Attribution-Id': paypalPlus
        ? PAYPAL_PARTNER_ID.replace('_EC', '_PPPlus')
        : PAYPAL_PARTNER_ID
    }
  }
  paypal.configure(paypalOptions)
  return paypal
}
