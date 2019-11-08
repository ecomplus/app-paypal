'use strict'

// log on files
const logger = require('console-files')
// read configured E-Com Plus app data
const getConfig = require(process.cwd() + '/lib/store-api/get-config')
// create PayPal experience profile
const createPaypalProfile = require(process.cwd() + '/lib/paypal-api/create-profile')
// register PayPal notification webhook
const createPaypalWebhook = require(process.cwd() + '/lib/paypal-api/create-webhook')

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'

module.exports = appSdk => {
  return (req, res) => {
    const { storeId } = req
    logger.log(`Store webhook #${storeId}`)
    // treat E-Com Plus trigger body here
    // https://developers.e-com.plus/docs/api/#/store/triggers/
    const trigger = req.body

    // check if PayPal app credentials were edited
    if (trigger.body && (trigger.body.paypal_client_id || trigger.body.paypal_secret)) {
      new Promise(resolve => {
        if (!trigger.body.paypal_client_id || !trigger.body.paypal_secret) {
          // get app configured options
          // including hidden (authenticated) data
          return getConfig({ appSdk, storeId }, true)
        } else {
          return trigger.body
        }
      })

        .then(configObj => {
          logger.log(configObj)
          // check both PayPal app credentials
          const paypalClientId = configObj.paypal_client_id
          const paypalSecret = configObj.paypal_secret
          const paypalEnv = configObj.paypal_sandbox && 'sandbox'

          if (paypalClientId && paypalSecret) {
            // get public store info
            // https://developers.e-com.plus/docs/api/#/store/stores/stores
            const url = `/stores/${storeId}.json`
            // public E-Com Plus Store API request
            return appSdk.apiRequest(storeId, url, 'GET', null, null, true)
              .then(({ response }) => ({
                paypalClientId,
                paypalSecret,
                paypalEnv,
                store: response.data
              }))
          } else {
            // cannot continue without all credentials configured
            const err = new Error()
            err.name = SKIP_TRIGGER_NAME
            throw err
          }
        })

        .then(({
          paypalClientId,
          paypalSecret,
          paypalEnv,
          store
        }) => {
          logger.log(store)
          // setup PayPal web profile and webhook once per store
          return createPaypalWebhook(
            paypalEnv,
            paypalClientId,
            paypalSecret
          ).then(() => {
            logger.log('PayPal Webhook')
            return createPaypalProfile(
              paypalEnv,
              paypalClientId,
              paypalSecret,
              store.name,
              store.logo && store.logo.url,
              store.domain && `https://${store.domain}/app/#/confirmation/`,
              store.languages && store.languages.length &&
                store.languages[0].replace(/^[a-z]{2}_?/, '').toUpperCase()
            )
          })
        })

        .then(() => {
          // PayPal experience profile created
          res.send(ECHO_SUCCESS)
        })

        .catch(err => {
          if (err.name === SKIP_TRIGGER_NAME) {
            // trigger ignored by app configuration
            res.send(ECHO_SKIP)
          } else {
            // logger.error(err)
            // request to Store API with error response
            // return error status code
            res.status(500)
            const { message } = err
            res.send({
              error: ECHO_API_ERROR,
              message
            })
          }
        })
    } else {
      // nothing to do
      res.send(ECHO_SKIP)
    }
  }
}
