'use strict'

// setup and configure PayPal Checkout client
// https://github.com/paypal/Checkout-NodeJS-SDK
const paypal = require('@paypal/checkout-server-sdk')

// persist clients to prevent API block
const storedClients = {}

module.exports = (env, clientId, clientSecret) => {
  if (storedClients[clientId]) {
    return storedClients[clientId]
  }

  // new PayPal client instance
  const envMethod = env === 'sandbox' ? 'SandboxEnvironment' : 'LiveEnvironment'
  const environment = new paypal.core[envMethod](clientId, clientSecret)
  const client = new paypal.core.PayPalHttpClient(environment)

  storedClients[clientId] = client
  setTimeout(() => {
    storedClients[clientId] = null
  }, 1000 * 60 * 60 * 7)
  return client
}
