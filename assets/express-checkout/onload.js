;(function () {
  // https://developer.paypal.com/docs/checkout/integrate/#3-render-the-smart-payment-buttons
  /* global paypal, _paypalOrderObj */
  window._paypalApprove = new Promise(function (resolve) {
    paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create(_paypalOrderObj)
      },

      onApprove: function (data, actions) {
        // capture the funds from the transaction
        return actions.order.capture().then(function (details) {
          // return some PayPal order data
          // https://developer.paypal.com/docs/api/orders/v2/#orders_get
          var i
          var transaction = {
            intermediator: {
              transaction_id: details.id
            }
          }
          if (Array.isArray(details.links)) {
            for (i = 0; i < details.links.length; i++) {
              var link = details.links[i]
              if (link.rel === 'approve') {
                transaction.payment_link = link.href
                break
              }
            }
          }
          if (Array.isArray(details.purchase_units) && details.purchase_units.length) {
            transaction.intermediator.transaction_reference = details.purchase_units[0].reference_id
          }
          resolve(transaction)
        })
      }
    }).render('#paypal-button-container')
  })
}())
