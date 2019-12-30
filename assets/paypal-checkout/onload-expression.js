;(function () {
  window._newPaypalPaymentObj = function () {
    if (window.storefrontApp) {
      var amount = window.storefrontApp.amount
      if (amount && amount.total) {
        // parse E-Com Plus checkout data to resumed PayPal payment object
        return {
          intent: 'sale',
          transactions: [{
            amount: {
              total: amount.total.toString(),
              currency: (window.$ecomConfig && window.$ecomConfig.get('currency')) || 'BRL'
            }
          }]
        }
      }
    }
    return window._paypalPaymentObj
  }

  window._paypalApprove = new Promise(function (resolve, reject) {
    // https://developer.paypal.com/docs/archive/checkout/integrate/#how-a-client-integration-works
    window.paypal.Button.render({
      env: window._paypalEnv,
      client: {
        [window._paypalEnv]: window._paypalClientId
      },

      payment: function (data, actions) {
        if (window._paypalPaymentId) {
          return window._paypalPaymentId
        }
        return actions.payment.create(window._newPaypalPaymentObj())
      },

      onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function () {
          resolve({
            intermediator_buyer_id: data.payerID,
            open_payment_id: window._paypalPaymentId + '/' + data.paymentID
          })
        })
      }
    }, '#paypal-button-container')
  })
}())
