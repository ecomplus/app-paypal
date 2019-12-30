'use strict'

// persist clients to prevent API block
const storedClients = {}

module.exports = (env, clientId, clientSecret) => {
  if (storedClients[clientId]) {
    return storedClients[clientId]
  }

  // setup and configure PayPal REST API client
  const paypal = require('paypal-rest-sdk')
  const paypalOptions = {
    mode: env || process.env.DEFAULT_PAYPAL_ENV,
    client_id: clientId,
    client_secret: clientSecret
  }
  if (process.env.PAYPAL_PARTNER_ID) {
    paypalOptions.headers = {
      'PayPal-Partner-Attribution-Id': process.env.PAYPAL_PARTNER_ID
    }
  }
  paypal.configure(paypalOptions)

  storedClients[clientId] = paypal
  setTimeout(() => {
    storedClients[clientId] = null
  }, 1000 * 60 * 60 * 7)
  return paypal
}
