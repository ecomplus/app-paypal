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
;['paypal-checkout', 'spb', 'paypal-plus'].forEach(folder => {
  const onloadScriptfile = path.join(__dirname, '../assets/', folder, '/onload-expression.js')
  onloadExpressions[folder] = uglifyJS.minify(fs.readFileSync(onloadScriptfile, 'utf8')).code
})

module.exports = (lang, paypalPlus = false, enableNewSpb = false) => {
  // returns default payment gateway object
  let label, assetsFolder
  if (!paypalPlus) {
    // Smart Payment Buttons
    // https://developer.paypal.com/docs/checkout/
    label = lang === 'pt_br' ? 'Pagar com PayPal' : 'Pay with PayPal'
    assetsFolder = lang === 'en_us' || enableNewSpb ? 'spb' : 'paypal-checkout'
  } else {
    // PayPal Plus
    // https://developer.paypal.com/docs/integration/paypal-plus/mexico-brazil/create-a-payment-request/
    label = lang === 'pt_br' ? 'Cartão de crédito' : 'Credit card'
    assetsFolder = 'paypal-plus'
  }
  const iconSrc = `${appBaseUri}/assets/${assetsFolder}/icon.png`

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
    icon: paypalPlus ? iconSrc
      : 'https://www.paypalobjects.com/webstatic/pt_PT/mktg/logo-center/pp_solution-graphic_pt.png',
    js_client: {
      onload_expression: onloadExpressions[assetsFolder],
      container_html: paypalPlus
        ? '<div id="pppLoading" class="p-2">' +
          '<div class="spinner-border" role="status">' +
          '<span class="sr-only">Loading...</span></div></div>' +
          '<div id="ppplus"></div>' +
          '<button class="btn btn-success btn-lg btn-block" type="submit" id="pppContinue" ' +
          'onclick="_pppApp.doContinue(); return false;"> ' +
          '<i class="fas fa-lock mr-1"></i> ' +
          `${(lang === 'pt_br' ? 'Finalizar compra' : 'Checkout')} </button>`
        : '<div id="paypal-button-container"></div>' +
          `<img src="${iconSrc}" class="img-fluid mt-1">`,
      transaction_promise: paypalPlus ? '_pppContinue' : '_paypalApprove'
    }
  }
}
