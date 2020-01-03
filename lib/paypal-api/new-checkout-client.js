'use strict'

// setup and configure PayPal Checkout client
// https://github.com/paypal/Checkout-NodeJS-SDK
const paypal = require('@paypal/checkout-server-sdk')

module.exports = (env, clientId, clientSecret) => {
  // new PayPal client instance
  const envMethod = env === 'sandbox' ? 'SandboxEnvironment' : 'LiveEnvironment'
  const environment = new paypal.core[envMethod](clientId, clientSecret)
  return new paypal.core.PayPalHttpClient(environment)
}
