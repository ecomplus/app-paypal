'use strict'

// log on files
const logger = require('console-files')
// setup and configure PayPal SDK
const initPaypal = require('./init-paypal')

module.exports = (clientId, clientSecret, storeName, storeLogo, bankTnxUrl, countryCode) => {
  // new PayPal SDK instance
  const paypal = initPaypal(clientId, clientSecret)

  // create an experience profile
  // https://github.com/paypal/PayPal-node-SDK/blob/master/samples/payment_experience/web_profile/create.js
  const webProfileBody = {
    name: `EComPlus_${Date.now()}`,
    presentation: {
      brand_name: storeName || 'Loja Virtual',
      logo_image: storeLogo || 'https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_mc_vs_dc_ae.jpg',
      locale_code: countryCode || 'BR'
    },
    input_fields: {
      allow_note: true,
      no_shipping: 1,
      address_override: 1
    },
    flow_config: {
      landing_page_type: 'billing',
      bank_txn_pending_url: bankTnxUrl || 'http://www.yeowza.com'
    }
  }

  paypal.webProfile.create(webProfileBody, err => {
    if (err) {
      logger.error(err)
    }
  })
}
