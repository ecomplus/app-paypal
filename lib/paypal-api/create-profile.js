'use strict'

// log on files
const logger = require('console-files')
// abstraction to setup PayPal SDK
const initClient = require('./init-client')

module.exports = (env, clientId, clientSecret, storeName, storeLogo, bankTnxUrl, countryCode) => {
  // configured PayPal REST API client
  const paypal = initClient(env, clientId, clientSecret)

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

  return new Promise((resolve, reject) => {
    paypal.webProfile.create(webProfileBody, err => {
      if (err) {
        logger.error(err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
