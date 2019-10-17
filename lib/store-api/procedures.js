'use strict'

// APP hostname and base URL path
const appBaseUri = process.env.APP_BASE_URI
// APP name to procedures titles
const appName = process.env.APP_NAME

// exports array of procedures to be created on each store after app installation
// Procedure object reference:
// https://developers.e-com.plus/docs/api/#/store/procedures/
module.exports = [
  ({ applicationId }) => ({
    title: appName,
    triggers: [
      {
        resource: 'applications',
        resource_id: applicationId,
        subresource: 'hidden_data'
      }
    ],
    webhooks: [
      {
        api: {
          external_api: {
            uri: appBaseUri + '/ecom/webhook'
          }
        },
        method: 'POST'
      }
    ]
  })
]
