;(function () {
  window._newPaypalOrderObj = function () {
    if (window._amount && window._amount.total) {
      // TODO: pass payer info on order create
      return {
        intent: 'CAPTURE',
        payer: {
          name: {
            given_name: 'PayPal',
            surname: 'Customer'
          },
          address: {
            address_line_1: '123 Fake Street',
            address_line_2: 'Apt 2',
            admin_area_2: 'San Jose',
            admin_area_1: 'CA',
            postal_code: '95121',
            country_code: 'US'
          },
          email_address: 'customer@domain.com',
          phone: {
            phone_type: 'MOBILE',
            phone_number: {
              national_number: '14082508100'
            }
          }
        },
        purchase_units: [
          {
            amount: {
              value: '15.00',
              currency_code: 'BRL'
            },
            shipping: {
              address: {
                address_line_1: '2211 N First Street',
                address_line_2: 'Building 17',
                admin_area_2: 'San Jose',
                admin_area_1: 'CA',
                postal_code: '95131',
                country_code: 'US'
              }
            }
          }
        ]
      }
      /*
      return {
        purchase_units: [{
          amount: {
            value: window._amount.total.toString()
          }
        }]
      }
      */
    }
    return window._paypalOrderObj
  }

  window._paypalApprove = new Promise(function (resolve) {
    // https://developer.paypal.com/docs/checkout/integrate/#3-render-the-smart-payment-buttons
    window.paypal.Buttons({
      enableStandardCardFields: false,

      createOrder: function (data, actions) {
        return actions.order.create(window._newPaypalOrderObj())
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
