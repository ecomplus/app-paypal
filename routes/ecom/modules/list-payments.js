'use strict'

// generate default payment gateway object
const newPaymentGateway = require(process.cwd() + '/lib/new-payment-gateway')

module.exports = appSdk => {
  return (req, res) => {
    // body was already pre-validated on @/bin/web.js
    // treat module request body
    const { params, application } = req.body
    // app configured options
    const config = Object.assign({}, application.data, application.hidden_data)
    const paypalClientId = config.paypal_client_id
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
    const paymentGateway = newPaymentGateway(params.lang)
    // merge configured options to payment gateway object
    ;['label', 'text', 'icon', 'discount'].forEach(prop => {
      if (config[prop]) {
        paymentGateway[prop] = config[prop]
      }
    })
    // setup response object
    const response = {
      payment_gateways: [paymentGateway]
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
    // https://developer.paypal.com/docs/checkout/integrate/
    paymentGateway.js_client.script_uri = 'https://www.paypal.com/sdk/js' +
      `?client-id=${paypalClientId}&currency=${params.currency_id}&disable-funding=card`

    // add order amount on JS expression
    const paypalOrder = {}
    if (totalValue) {
      paypalOrder.purchase_units = [{
        amount: {
          value: totalValue.toString()
        }
      }]
    }
    const paypalOrderJson = JSON.stringify(paypalOrder)
    paymentGateway.js_client.onload_expression = `window._paypalOrderObj=${paypalOrderJson};` +
      paymentGateway.js_client.onload_expression

    res.send(response)
  }
}
