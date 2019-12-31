# app-paypal

[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

E-Com Plus app to integrate PayPal SPB & Plus

[CHANGELOG](https://github.com/ecomclub/app-paypal/blob/master/CHANGELOG.md)

## About

This application will:

1. Integrate PayPal business account;
2. Add payment methods and create transactions with
[Modules API (**List payments & Create transaction**)](https://developers.e-com.plus/modules-api/);
3. Receive PayPal Webhooks to update transaction status on created orders;

[App](https://developers.e-com.plus/docs/api/#/store/applications/) `hidden_data`
will store [PayPal App credentials](https://developer.paypal.com/developer/applications/),
`data` will store discount, installments and custom PayPal SPB/Plus options.

`data`/`hidden_data` expected object model is defined (JSON Schema) on
[app `admin_settings`](https://github.com/ecomclub/app-paypal/blob/master/assets/app.json).

It's based on
[E-Com Plus Express App Boilerplate](https://github.com/ecomclub/express-app-boilerplate),
application installation and authentication was kept as is
with original endpoints from boilerplate source:

- [`/bin/web.js`](https://github.com/ecomclub/app-paypal/blob/master/bin/web.js):
Express web server setup;
- [`/routes/ecom/auth-callback.js`](https://github.com/ecomclub/app-paypal/blob/master/routes/ecom/auth-callback.js):
Endpoint for
[E-Com Plus Authentication Callback](https://developers.e-com.plus/docs/api/#/store/authenticate-app/authenticate-app);

### List payments module endpoint

Additional endpoint was created to handle `list_payments`
([`/ecom/modules/list-payments`](https://github.com/ecomclub/app-paypal/blob/master/routes/ecom/modules/list-payments.js))
module, it receives requests from Modules API on stores with this app installed.

It'll receive POST with body _like_:

```javascript
{
  "params": {
    "items": [
      {
        "name": "Monitor Gamer Asus ROG Swift LED 24\" Widescreen FHD PG248Q",
        "sku": "HUJ1471",
        "price": 2995.36,
        "quantity": 1,
        "currency_id": "BRL",
        "currency_symbol": "R$",
        "product_id": "5c705802c626be23430d5053",
        "final_price": 2995.36
      }
    ],
    "amount": {
      "freight": 50.39,
      "discount": 0,
      "total": 3045.75,
      "subtotal": 2995.36
    },
    "currency_id": "BRL",
    "currency_symbol": "R$"
  },
  "application": {
    "hidden_data": {
      "paypal_client_id": "1234",
      "paypal_secret": "123456"
    },
    "data": {
      "enable_paypal_plus": true
    }
  }
}
```

Then:

1. Check for
[SPB (new version)](https://developer.paypal.com/docs/checkout/),
[checkout.js](https://developer.paypal.com/docs/archive/checkout/) and/or
[PayPal Plus](https://developer.paypal.com/docs/integration/paypal-plus/mexico-brazil/paypal-plus-integration-guide-mexico-brazil/) enabled;

2. Setup payment methods clients
([onload expressions](https://github.com/ecomclub/app-paypal/tree/master/assets))
to run on [Storefront App](https://github.com/ecomclub/storefront-app);

3. Check/apply discount option by payment method;

4. Create [Payment](https://developer.paypal.com/docs/api/payments/v1/)
for PayPal Plus or checkout.js if used;

5. Return response with configured payment methods objects;

> [Full `params` object reference](https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100)
from Modules API docs.

> Full `data`/`hidden_data` object referece on
[app.json](https://github.com/ecomclub/app-paypal/blob/master/assets/app.json) `admin_settings`.

> [Full `response` object reference](https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100)
from Modules API docs.

### Create transaction module endpoint

Additional endpoint was created to handle `create_transaction`
([`/ecom/modules/create-transaction`](https://github.com/ecomclub/app-paypal/blob/master/routes/ecom/modules/create-transaction.js))
module, it receives requests from Modules API to:

1. Executed PayPal Payment or read created PayPal Order (new SPB);
2. Save PayPal Payment/Order ID associated to E-Com Plus Order ID for status synchronization (SQLite3);
3. Send response to confirm/cancel E-Com Plus order;

### PayPal Webhooks endpoint

Custom endpoint to handle PayPal Webhooks
([`/paypal/webhook`](https://github.com/ecomclub/app-paypal/blob/master/routes/paypal/webhook.js)):

1. Validate and read PayPal Webhook event;
2. Read local database (SQLite3) to match Payment/Order ID of respective even
(saved on [create transaction](#create-transaction-module-endpoint));
3. Check new transaction status and parse to PayPal enum to E-Com Plus enum;
4. Update E-Com Plus order adding new `payment_history` with current status;

## Environment variables sample

Variable              | Value
---                   | ---
`LOGGER_OUTPUT`       | `~/app/log/logger.out`
`LOGGER_ERRORS`       | `~/app/log/logger.err`
`LOGGER_FATAL_ERRORS` | `~/app/log/_stderr`
`PORT`                | `3000`
`APP_NAME`            | `PayPal`
`APP_BASE_URI`        | `https://paypal.ecomplus.biz`
`DB_PATH`             | `~/app/db.sqlite`
`ECOM_AUTH_DB`        | `~/app/db.sqlite`
`ECOM_AUTH_UPDATE`    | `enabled`
`DAEMON_SERVICES`     | `true`
`PAYPAL_PARTNER_ID`   | `EcomPartnerId`

## Production server

Published at https://paypal.ecomplus.biz

### Continuous deployment

When new version is **production ready**,
[create a new release](https://github.com/ecomclub/app-paypal/releases)
(or `npm run release`) to run automatic deploy from _master_ branch
and (re)publish the app.
