'use strict'

module.exports = (clientId, secret) => {
  // setup PayPal REST API client
  const paypal = require('paypal-rest-sdk')
  paypal.configure({
    mode: 'sandbox',
    client_id: clientId,
    client_secret: clientId
  })
  // returns configured PayPal SDK instance
  return paypal
}
