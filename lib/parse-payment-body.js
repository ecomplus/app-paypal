'use strict'

module.exports = body => {
  // parse list payments module request body to PayPal reference
  // https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100
  const { lang, customer, amount, items, domain } = body

  // https://developer.paypal.com/docs/integration/paypal-plus/mexico-brazil/create-a-payment-request/
  const paypalPayment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    transactions: [{
      amount: {
        currency: body.currency_id || 'BRL',
        total: amount.total,
        details: {
          shipping: amount.freight || 0,
          subtotal: amount.total - amount.freight
        }
      },
      description: lang === 'pt_br' ? `Pagamento na loja ${domain}` : `Payment in store ${domain}`,
      payment_options: {
        allowed_payment_method: 'IMMEDIATE_PAY'
      },
      item_list: {
        items: []
      }
    }],
    redirect_urls: {
      return_url: `${domain}/app/#/confirmation`,
      cancel_url: `${domain}/app/#/cancel`
    }
  }
  const paypalTransaction = paypalPayment.transactions[0]
  const paypalItemsList = paypalTransaction.item_list

  // try customer address and phone number
  const address = customer.addresses && customer.addresses.find(addr => addr.default)
  if (address) {
    paypalItemsList.shipping_address = {
      recipient_name: address.name,
      line1: address.line_address ||
        (address.street ? address.street + ' ' + (address.number || 'S/N') : ''),
      line2: address.complement || '',
      city: address.city,
      country_code: address.country_code || 'BR',
      postal_code: address.zip,
      state: address.province_code || address.province || ''
    }
    const phone = customer.phones && customer.phones[0]
    if (phone) {
      paypalItemsList.shipping_address.phone = phone.number
    }
  }

  // parse transaction items list
  items.forEach(item => {
    paypalItemsList.items.push({
      name: item.name,
      quantity: item.quantity,
      price: item.final_price || item.price,
      sku: item.sku,
      currency: item.currency_id || 'BRL'
    })
  })
  if (amount.discount) {
    // https://github.com/paypal/PayPal-PHP-SDK/issues/908
    const name = lang === 'pt_br' ? 'Desconto' : 'Discount'
    paypalItemsList.items.push({
      name,
      quantity: 1,
      price: -amount.discount,
      sku: name.toUpperCase(),
      currency: paypalTransaction.amount.currency
    })
  }

  return paypalPayment
}
