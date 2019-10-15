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
          // show a success message to your buyer
          window.alert('Transaction completed by ' + details.payer.name.given_name)
          resolve()
        })
      }
    }).render('#paypal-button-container')
  })
}())
