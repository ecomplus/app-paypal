# app-paypal
E-Com Plus app to integrate PayPal EC &amp; Plus

## Project scope

### TODO

* Use this [boilerplate](https://github.com/ecomclub/express-app-boilerplate).
* Create two endpoints to receive POST for `list_payment` and `create_transaction` following these [schemas](https://github.com/ecomclub/modules-api/tree/master/docs).
* The app must authenticate it self with paypal through [oauth](https://developer.paypal.com/docs/api/overview/).
* The app must receive Paypal's notifications always that is a status change in a transaction, and reproduce it on [E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store/orders/).


### HOW TODO

The app use SQLite to persist data. The boilerplate handle some E-Com Plus requests like app's authenticantion callbacks and webhooks. Use the same DB to persist paypal's data, like tokens and other useful info.

`ecomplus_app_auth`'s table is automaticaly generated and has the necessary info. So the app just can consume [E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store) resources.

> list_payment

The endpoint has to be enabled to recieve a post. Resquest body must follow the schema bellow.

```javascript
{
  "module": "list_payments",
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
    "_id": "5d5ffef4f11b5b64ea01cabc",
    "app_id": 8001,
    "version": "0.1.0",
    "modules": {
      "list_payments": {
        "endpoint": "https://paypal.ecomplus.biz/ecom/modules/list-payments",
        "enabled": true
      }
    },
    "hidden_data": {},
    "data": {}
  }
}
```
##### PARAMETERS
| Property | Description |
| -------- | ----------- |
| module | Name of launched module |
| params | Object with app's information used to list payment options. The object must follow this JSON [Schema] (https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100).
| application | Object with requesting app information.|
Resource's response must follow this JSON [Schema](https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100). Response's displayed options must be setted by a user. Use application's hidden_data property to save this and other settings.

Observation:
- Resource must answer even if there are no users's configuration in app's hidden_data. For this, create a plug and play default configuration.
- If there is any request without `items` or `amount` parameters, the resource must follow this JSON [Schema](https://apx-mods.e-com.plus/api/v1/list_payments/response_schema.json?store_id=100) with `installment_option` and `discount_option` properties, if setted on app's `hidden_data` and  `payment_gateways` property as an empty array `[]`.
- - -
> create_transaction

The endpoint has to be enabled to recieve a post. Resquest body must follow the schema bellow.

```javascript
{
  "module": "create_transaction",
  "params": {},
  "application": {
    "_id": "5d5ffef4f11b5b64ea01cabc",
    "app_id": 8001,
    "version": "0.1.0",
    "modules": {
      "create_transaction": {
        "endpoint": "https://paypal.ecomplus.biz/ecom/modules/create-transaction",
        "enabled": true
      }
    },
    "hidden_data": {},
    "data": {}
  }
}
```
Received parameters on create_transaction are the same as on list_payment, differing on `params` property that follows this JSON [Schema](https://apx-mods.e-com.plus/api/v1/create_transaction/schema.json?store_id=100).

This resource need to receive modules API POST, create a transaction in Paypal, make transaction's payment and return the transaction as this JSON [Schema](https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100).

Observation:
- All needed info to create the transaction and make the payment are sent in `params` property.
- Module's response must follow this JSON [Schema](https://apx-mods.e-com.plus/api/v1/create_transaction/response_schema.json?store_id=100).

> webhook/notifications (paypal)

Endpoint must receive paypal's notifications and insert a new entry in it's [order](https://developers.e-com.plus/docs/api/#/store/orders/) `payment_history`.


- - -
### General

- All requisitions sent by E-Com Plus API has a X-Store-Id in it's headers.
-  Endpoints that start with `/ecom/` can access X-Store-id value through `req.storeId` express variable.
-  Use  [ecomplus-app-sdk](https://github.com/ecomclub/ecomplus-app-sdk) lib to make operations, [E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store/) fetch app credentials through informed storeId.
-  In boilerplate's `lib/store-api/` folder is a `get-config.js` file, that returns app's `hidden_data` and `data` setted configuration.
- Requisitions on [E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store/) follow a pattern, if the app dont use ecomplus-app-sdk, [read](https://developers.e-com.plus/docs/reference/store/#authentication-headers) which parameters are needed to make operations.

### Daemon Proccess

The app will be replicated in other servers, so backgroud processes should be called in `bin/local.js` to avoid records duplication or double executation of a service.

### Logs

Use [console-files](https://github.com/leomp12/console-files) lib, which is installed together with boilerplate to save app's error logs

### Patterns

- Set to methods variables and endpoints, names that make sense.
- Use status code correctly in all responses.
- Always answer, even if with a error message.
- Use console-files lib to save error logs that may be usefull.
- Respect [schemas](https://github.com/ecomclub/modules-api/tree/master/docs)! formats, or your answer will be invalid for the module.

#### References

E-Com Plus Store API - [Orders](https://developers.e-com.plus/docs/api/#/store/orders/)

E-Com Plus Store API - [Applications](https://developers.e-com.plus/docs/api/#/store/applications/)

E-Com Plus Store API - [Procedures](https://developers.e-com.plus/docs/api/#/store/procedures/)

PayPal [API](https://developer.paypal.com/docs/api/overview/)
