'use strict'

// generate default payment gateway object
const newPaymentGateway = require(process.cwd() + '/lib/new-payment-gateway')
// parse list payments body from Mods API to PayPal model
const parsePaymentBody = require(process.cwd() + '/lib/parse-payment-body')
// create PayPal payment request
const createPaypalPayment = require(process.cwd() + '/lib/paypal-api/create-payment')

module.exports = appSdk => {
  return (req, res) => {
    // body was already pre-validated on @/bin/web.js
    // treat module request body
    const { params, application } = req.body
    // app configured options
    const config = Object.assign({}, application.data, application.hidden_data)
    const paypalClientId = config.paypal_client_id
    const paypalSecret = config.paypal_secret
    const paypalEnv = config.paypal_sandbox ? 'sandbox' : 'live'

    if (!paypalClientId) {
      // must have configured PayPal app ID and secret
      return res.status(400).send({
        error: 'LIST_PAYMENTS_ERR',
        message: 'PayPal Client ID is unset on app hidden data (merchant must configure the app)'
      })
    }

    // params object follows list payments request schema:
    // https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100
    if (!params.lang) {
      // set PT-BR as default
      params.lang = 'pt_br'
    }
    let totalValue
    if (params.amount) {
      totalValue = params.amount.total
    }

    // start mounting response body
    // https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100
    const response = {
      payment_gateways: []
    }

    const addPaymentGateway = (paypalPlus, paypalPayment) => {
      // add payment gateway object to response
      const paymentGateway = newPaymentGateway(params.lang, paypalPlus)
      response.payment_gateways.push(paymentGateway)

      // merge configured options to payment gateway object
      ;['label', 'text', 'icon'].forEach(prop => {
        if (config[prop]) {
          paymentGateway[prop] = config[prop]
        }
      })

      // check available discount by payment method
      const paymentMethod = paymentGateway.payment_method
      if (
        config.discount &&
        (!config.discount_payment_method || config.discount_payment_method === paymentMethod.code)
      ) {
        paymentGateway.discount = config.discount
      }

      const { discount } = paymentGateway
      if (discount) {
        if (discount.apply_at !== 'freight') {
          // default discount option
          const { value } = discount
          const label = config.discount_option_label || paymentGateway.label
          response.discount_option = { label, value }
          // specify the discount type and min amount is optional
          ;['type', 'min_amount'].forEach(prop => {
            if (discount[prop]) {
              response.discount_option[prop] = discount[prop]
            }
          })
        }

        if (discount.min_amount) {
          // check amount value to apply discount
          if (params.amount && params.amount.total < discount.min_amount) {
            delete paymentGateway.discount
          } else {
            delete discount.min_amount
          }
        }
      }

      const installmentsOption = config.installments_option
      if (installmentsOption && installmentsOption.max_number) {
        // default configured installments option
        response.installments_option = installmentsOption

        if (totalValue) {
          // map to payment gateway installments
          paymentGateway.installment_options = []
          const minInstallment = installmentsOption.min_installment || 5
          for (let number = 2; number <= installmentsOption.max_number.length; number++) {
            // check installment value and configured minimum
            const value = totalValue / number
            if (value >= minInstallment) {
              paymentGateway.installment_options.push({
                number,
                value,
                // PayPal only supports interest-free installments
                tax: false
              })
            } else {
              break
            }
          }
        }
      }

      // PayPal Checkout JS client
      const jsClient = paymentGateway.js_client
      const locales = params.lang.split('_')
      let paypalScript

      if (!paypalPlus) {
        // https://developer.paypal.com/docs/checkout/integrate/
        paypalScript = 'https://www.paypal.com/sdk/js' +
          `?client-id=${paypalClientId}` +
          `&currency=${params.currency_id}` +
          `&locale=${locales[0]}_${(locales[1] || locales[0]).toUpperCase()}`
        if (!config.enable_standard_card_fiels) {
          paypalScript += '&disable-funding=card'
        }
        if (config.paypal_debug) {
          paypalScript += '&debug=true'
        }
      } else {
        // https://developer.paypal.com
        // /docs/integration/paypal-plus/mexico-brazil/integrate-a-payment-selection-page/
        paypalScript = 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js'
      }
      jsClient.script_uri = paypalScript

      // setup global variables on client for onload expression
      let onloadExpression = `window._paypalEnv="${paypalEnv}";`
      if (paypalPayment && Array.isArray(paypalPayment.links)) {
        // approval URL for PayPal Plus
        // https://developer.paypal.com/docs/integration/paypal-plus/mexico-brazil/create-a-payment-request/
        const linkObj = paypalPayment.links.find(({ rel }) => rel === 'approval_url')
        if (linkObj) {
          onloadExpression += `window._paypalApprovalUrl="${linkObj.href}";`
        }
      }
      if (config.enable_standard_card_fiels) {
        // https://developer.paypal.com/docs/checkout/integration-features/standard-card-fields/
        // standard card fields is disabled by default due to bugs (BR only ?)
        onloadExpression += 'window._paypalStCardFields=true;'
      }

      // add order amount on JS expression
      const paypalOrder = {}
      if (totalValue) {
        paypalOrder.purchase_units = [{
          amount: {
            value: totalValue.toString()
          }
        }]
      }
      jsClient.onload_expression = onloadExpression +
        `window._paypalOrderObj=${JSON.stringify(paypalOrder)};` +
        jsClient.onload_expression
    }

    new Promise(resolve => {
      if (!config.enable_paypal_plus) {
        resolve()
      } else {
        // also add payment gateway for PayPal Plus
        let skip = false
        // prevent list payments timeout
        const timeout = setTimeout(() => {
          skip = true
          resolve()
        }, 8000)

        // start PayPal Plus integration flux creating payment request
        createPaypalPayment(paypalEnv, paypalClientId, paypalSecret, parsePaymentBody(params))
          .then(paypalPayment => {
            if (!skip) {
              addPaymentGateway(true, paypalPayment)
              resolve()
            }
          })
          .catch(() => {
            // resolve anyway to list payments without PayPal Plus option
            resolve()
          })
          .finally(() => clearTimeout(timeout))
      }
    })

      .then(() => {
        // common PayPal SPB payment
        addPaymentGateway()
        // finally send success response
        res.send(response)
      })
  }
}
