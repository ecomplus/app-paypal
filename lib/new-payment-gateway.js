'use strict'

const fs = require('fs')
const path = require('path')

// UglifyJS to minify JS Client expressions
// https://www.npmjs.com/package/uglify-js#api-reference
const uglifyJS = require('uglify-js')

// read JS script and minify to setup onload expression string
const onloadScriptfile = path.join(__dirname, '../assets/js-client/onload.js')
const onloadExpression = uglifyJS.minify(fs.readFileSync(onloadScriptfile, 'utf8')).code

module.exports = lang => {
  // returns default payment gateway object
  const label = lang === 'pt_br' ? 'Cartão de crédito' : 'Credit card'

  return {
    label,
    payment_method: {
      code: 'credit_card',
      name: `${label} - PayPal`
    },
    intermediator: {
      name: 'PayPal',
      link: 'https://www.paypal.com/',
      code: 'paypal'
    },
    icon: 'https://paypal.ecomplus.biz/assets/icon.png',
    js_client: {
      onload_expression: onloadExpression
    }
  }
}
