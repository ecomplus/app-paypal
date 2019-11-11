'use strict'

// handle Store API errors
const errorHandling = require('./error-handling')

module.exports = ({ appSdk, storeId, auth }, orderId, status, notificationCode, flags) => {
  // change order transaction status on E-Com Plus Store API
  // https://developers.e-com.plus/docs/api/#/store/orders/orders
  const url = `/orders/${orderId}/payments_history.json`
  const method = 'POST'
  let data
  if (typeof status === 'object' && status !== null) {
    // request body object sent as 'status' function param
    data = status
  } else {
    data = {
      date_time: new Date().toISOString(),
      status
    }
    if (notificationCode) {
      data.notification_code = notificationCode
    }
    if (Array.isArray(flags)) {
      data.flags = flags
    }
  }

  // send and return authenticated Store API request
  return appSdk.apiRequest(storeId, url, method, data, auth)
    .catch(err => {
      errorHandling(err)
      throw err
    })
}
