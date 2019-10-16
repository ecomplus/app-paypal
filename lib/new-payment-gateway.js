'use strict'

const fs = require('fs')
const path = require('path')

// UglifyJS to minify JS Client expressions
// https://www.npmjs.com/package/uglify-js#api-reference
const uglifyJS = require('uglify-js')

// read JS script and minify to setup onload expression string
const onloadExpressions = {}
;['express-checkout', 'paypal-plus'].forEach(folder => {
  const filepath = path.join(__dirname, '../assets/', folder, 'onload.js')
  onloadExpressions[folder] = uglifyJS.minify(fs.readFileSync(filepath, 'utf8')).code
})

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI

module.exports = (lang, paypalPlus = false) => {
  // returns default payment gateway object
  let label, assetsFolder
  if (!paypalPlus) {
    // Express Checkout
    // https://developer.paypal.com/docs/checkout/
    label = lang === 'pt_br' ? 'Pagar com PayPal' : 'Pay with PayPal'
    assetsFolder = 'express-checkout'
  } else {
    // PayPal Plus
    // https://developer.paypal.com/docs/integration/paypal-plus/mexico-brazil/create-a-payment-request/
    label = lang === 'pt_br' ? 'Cartão de crédito' : 'Credit card'
    assetsFolder = 'paypal-plus'
  }

  return {
    label,
    payment_method: {
      code: paypalPlus ? 'credit_card' : 'balance_on_intermediary',
      name: `${label} - PayPal ${(paypalPlus ? 'Plus' : 'EC')}`
    },
    intermediator: {
      name: 'PayPal',
      link: 'https://www.paypal.com/',
      code: 'paypal'
    },
    icon: `${appBaseUri}/assets/${assetsFolder}/icon.png`,
    js_client: {
      onload_expression: onloadExpressions[assetsFolder],
      container_html: `<div id="${(paypalPlus ? 'ppplus' : 'paypal-button-container')}"></div>`,
      transaction_promise: paypalPlus ? '_pppContinue' : '_paypalApprove'
    }
  }
}
