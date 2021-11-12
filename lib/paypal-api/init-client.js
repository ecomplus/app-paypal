'use strict'

module.exports = (env, clientId, clientSecret, paypalPlus = false) => {
  // setup and configure PayPal REST API client
  const paypal = require('./paypal-rest-sdk/')
  paypal.configure(require('./_new-config')(env, clientId, clientSecret, paypalPlus))
  return paypal
}
