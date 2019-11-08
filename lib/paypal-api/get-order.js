'use strict'

// log on files
const logger = require('console-files')
// PayPal checkout SDK
const checkoutSdk = require('@paypal/checkout-server-sdk')
// abstraction to setup PayPal Checkout SDK
const newCheckoutClient = require('./new-checkout-client')

module.exports = (env, clientId, clientSecret, orderId) => {
  // configured PayPal checkout client
  const paypalClient = newCheckoutClient(env, clientId, clientSecret)

  // call PayPal to get the transaction details
  // https://developer.paypal.com/docs/checkout/integrate/#2-server-side
  const request = new checkoutSdk.orders.OrdersGetRequest(orderId)
  return paypalClient.execute(request)
    .then(({ result }) => result)
    .catch(err => {
      logger.log(err)
      throw err
    })
}
