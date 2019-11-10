'use strict'

const fs = require('fs')
const path = require('path')

// UglifyJS to minify JS Client expressions
// https://www.npmjs.com/package/uglify-js#api-reference
const uglifyJS = require('uglify-js')

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI

// read JS script and minify to setup onload expression string
const onloadExpressions = {}
;['spb', 'paypal-plus'].forEach(folder => {
  const onloadScriptfile = path.join(__dirname, '../assets/', folder, '/onload-expression.js')
  onloadExpressions[folder] = uglifyJS.minify(fs.readFileSync(onloadScriptfile, 'utf8')).code
})

module.exports = (lang, paypalPlus = false) => {
  // returns default payment gateway object
  let label, assetsFolder
  if (!paypalPlus) {
    // Smart Payment Buttons
    // https://developer.paypal.com/docs/checkout/
    label = lang === 'pt_br' ? 'Pagar com PayPal' : 'Pay with PayPal'
    assetsFolder = 'spb'
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
      name: label
    },
    intermediator: {
      name: 'PayPal',
      link: 'https://www.paypal.com/',
      code: 'paypal'
    },
    icon: `${appBaseUri}/assets/${assetsFolder}/icon.png`,
    js_client: {
      onload_expression: onloadExpressions[assetsFolder],
      container_html: paypalPlus
        ? '<div id="ppplus"></div>' +
          '<button type="submit" id="pppContinue" onclick="ppp.doContinue(); return false;"> ' +
          `${(lang === 'pt_br' ? 'Finalizar compra' : 'Checkout')} </button>`
        : '<div id="paypal-button-container"></div>',
      transaction_promise: paypalPlus ? '_pppContinue' : '_paypalApprove'
    }
  }
}
