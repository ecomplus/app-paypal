'use strict'

const { DEFAULT_PAYPAL_ENV, PAYPAL_PARTNER_ID } = process.env

// persist clients to prevent API block
const storedClients = {}

module.exports = (env, clientId, clientSecret, paypalPlus = false) => {
  const clientKey = clientId + Boolean(paypalPlus).toString()
  if (storedClients[clientKey]) {
    return storedClients[clientKey]
  }

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

  storedClients[clientKey] = paypal
  setTimeout(() => {
    storedClients[clientKey] = null
  }, 1000 * 60 * 5)
  return paypal
}
