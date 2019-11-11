;(function () {
  window._pppContinue = new Promise(function (resolve, reject) {
    // https://developer.paypal.com
    // /docs/integration/paypal-plus/mexico-brazil/integrate-a-payment-selection-page/
    var pppParams = {
      approvalUrl: window._paypalApprovalUrl,
      placeholder: 'ppplus',
      mode: window._paypalEnv,
      disableContinue: 'pppContinue',
      enableContinue: 'pppContinue',
      onContinue: function (_, payerId, paymentId) {
        resolve({
          open_payment_id: window._paypalPaymentId || paymentId || ''
        })
      },
      onError: function (err) {
        reject(err)
      },
      onLoad: function () {
        var $loading = document.getElementById('pppLoading')
        if ($loading) {
          $loading.remove()
        }
      }
    }

    if (window._checkout) {
      var customer = window._checkout.customer
      if (customer) {
        pppParams.payerEmail = customer.main_email
        pppParams.payerTaxId = customer.doc_number
        pppParams.country = customer.doc_country || 'BR'
        if (pppParams.country === 'BR') {
          pppParams.language = 'pt_BR'
        }
        if (customer.name && customer.name.given_name) {
          pppParams.payerFirstName = customer.name.given_name
          if (customer.name.middle_name && customer.name.family_name) {
            pppParams.payerLastName = customer.name.middle_name + ' ' + customer.name.family_name
          } else if (customer.name.middle_name || customer.name.family_name) {
            pppParams.payerLastName = customer.name.middle_name || customer.name.family_name
          }
        }
        if (Array.isArray(customer.phones) && customer.phones[0]) {
          pppParams.payerPhone = customer.phones[0].number.toString()
        }
      }
    }

    window._pppApp = window.PAYPAL.apps.PPP(pppParams)
  })
}())
