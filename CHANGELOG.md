# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.6.4](https://github.com/ecomplus/app-paypal/compare/v1.6.3...v1.6.4) (2020-07-23)


### Bug Fixes

* **create-transaction:** hardfix to keep exact created payment total ([040e1a2](https://github.com/ecomplus/app-paypal/commit/040e1a241259591f9eca2e76190dc3f504a206d2))

### [1.6.3](https://github.com/ecomplus/app-paypal/compare/v1.6.2...v1.6.3) (2020-07-23)


### Bug Fixes

* **execute-payment:** override client config to ensure params ([c202c4e](https://github.com/ecomplus/app-paypal/commit/c202c4efd3381ebdaa4a28a00a54b24996d0c3d4))
* **paypal-client:** stop persisting instancese (already done by sdk) ([8d6a1de](https://github.com/ecomplus/app-paypal/commit/8d6a1de89ce5664b85094be03437c7917a07bfea)), closes [/github.com/paypal/PayPal-node-SDK/blob/621d8b448cf4c6ae375e8276b06d76be32191725/lib/api.js#L76](https://github.com/ecomplus//github.com/paypal/PayPal-node-SDK/blob/621d8b448cf4c6ae375e8276b06d76be32191725/lib/api.js/issues/L76)

### [1.6.2](https://github.com/ecomplus/app-paypal/compare/v1.6.1...v1.6.2) (2020-07-23)


### Bug Fixes

* **create-transaction:** fix calculating tax after fixed subtotal ([0a5a301](https://github.com/ecomplus/app-paypal/commit/0a5a301dd7c7ac66e9fd28c527871aecd0cc094d))
* **create-transaction:** try preserve original paypal payment subtotal ([11433f3](https://github.com/ecomplus/app-paypal/commit/11433f3499d7d9781a2864703150b227defd9ce7))
* **parse-payment-body:** remove MIN_AMOUNT item (fix duplicated) ([635d8b6](https://github.com/ecomplus/app-paypal/commit/635d8b6109173354f9bc268e8af1a27decdb0dbc))

### [1.6.1](https://github.com/ecomplus/app-paypal/compare/v1.6.0...v1.6.1) (2020-07-23)


### Bug Fixes

* **paypal-payment:** fix rounding amount values ([ce2d0d5](https://github.com/ecomplus/app-paypal/commit/ce2d0d5b897be721fe11bf949c365569c3a25f37))

## [1.6.0](https://github.com/ecomplus/app-paypal/compare/v1.5.15...v1.6.0) (2020-07-20)


### Features

* **admin-settings:** add/handle new 'disable_remembered_cards' option ([ad6b84d](https://github.com/ecomplus/app-paypal/commit/ad6b84da846b7ca7e61554a1720b0a0628220005))

### [1.5.15](https://github.com/ecomplus/app-paypal/compare/v1.5.14...v1.5.15) (2020-05-28)

### [1.5.14](https://github.com/ecomplus/app-paypal/compare/v1.5.13...v1.5.14) (2020-05-28)


### Bug Fixes

* **list-payments:** normalizing purchase units value `toFixed(2)` ([6c6c3a5](https://github.com/ecomplus/app-paypal/commit/6c6c3a5b6ab5cb776c9761eec41b1e23b5cd2f85))

### [1.5.13](https://github.com/ecomplus/app-paypal/compare/v1.5.12...v1.5.13) (2020-05-28)


### Bug Fixes

* **create-transaction:** retry execute payment with amount one cent fix ([62b8c59](https://github.com/ecomplus/app-paypal/commit/62b8c5937fe32d011991b844f9dd17e26ef73d03))

### [1.5.12](https://github.com/ecomplus/app-paypal/compare/v1.5.11...v1.5.12) (2020-05-15)

### [1.5.11](https://github.com/ecomplus/app-paypal/compare/v1.5.10...v1.5.11) (2020-05-15)


### Bug Fixes

* **deps:** replace ecomplus-app-sdk with @ecomplus/application-sdk ([19fb076](https://github.com/ecomplus/app-paypal/commit/19fb076496b7ce173ddb9f511c2aa6791af9ac1e))
* **execute-payment:** handle retry without details on VALIDATION_ERROR ([3f12d70](https://github.com/ecomplus/app-paypal/commit/3f12d709a91d09cd08721a438a7084600bbb25ba))

### [1.5.10](https://github.com/ecomplus/app-paypal/compare/v1.5.9...v1.5.10) (2020-05-12)


### Bug Fixes

* **create-transaction:** fix handling instrument declined error ([eba5124](https://github.com/ecomplus/app-paypal/commit/eba51244ae289f68af474bb2d52b5315b3e04f24))

### [1.5.9](https://github.com/ecomplus/app-paypal/compare/v1.5.8...v1.5.9) (2020-05-12)


### Bug Fixes

* **create-transaction:** update paypal payment amount on execute ([d413018](https://github.com/ecomplus/app-paypal/commit/d413018cdc0f35ca0ffb5dd6b90f142f72200bb8))

### [1.5.8](https://github.com/ecomplus/app-paypal/compare/v1.5.7...v1.5.8) (2020-04-28)


### Bug Fixes

* **list-payments:** fix replacing payment method icon (second option) ([0f5248b](https://github.com/ecomplus/app-paypal/commit/0f5248b64ba94275fb9c5ccb03457fbd99abcc64))

### [1.5.7](https://github.com/ecomplus/app-paypal/compare/v1.5.6...v1.5.7) (2020-04-28)


### Bug Fixes

* **icons:** prevent two payment methods with same icon for credit card ([d37adcd](https://github.com/ecomplus/app-paypal/commit/d37adcd10c8062e3322cba444f131f93ee151095))

### [1.5.6](https://github.com/ecomplus/app-paypal/compare/v1.5.5...v1.5.6) (2020-04-22)

### [1.5.5](https://github.com/ecomplus/app-paypal/compare/v1.5.4...v1.5.5) (2020-04-10)

### [1.5.4](https://github.com/ecomclub/app-paypal/compare/v1.5.3...v1.5.4) (2020-01-16)


### Bug Fixes

* **checkout-client:** do not execute payment client side (onAuthorize) ([e8bb6ba](https://github.com/ecomclub/app-paypal/commit/e8bb6ba3e63142f052c50bd3f381abd2195ae5f6))

### [1.5.3](https://github.com/ecomclub/app-paypal/compare/v1.5.2...v1.5.3) (2020-01-16)

### [1.5.2](https://github.com/ecomclub/app-paypal/compare/v1.5.1...v1.5.2) (2020-01-16)

### [1.5.1](https://github.com/ecomclub/app-paypal/compare/v1.5.0...v1.5.1) (2020-01-16)


### Bug Fixes

* **paypal-client:** setup stored client key concating id and ppp bol ([e410e52](https://github.com/ecomclub/app-paypal/commit/e410e52542775c747374640a5a24c680ce8edbf0))

## [1.5.0](https://github.com/ecomclub/app-paypal/compare/v1.4.1...v1.5.0) (2020-01-16)


### Features

* **create-transaction:** save paypal selected installments option ([1445858](https://github.com/ecomclub/app-paypal/commit/14458581f921ff41c3016bd280020c34a2451df4))


### Bug Fixes

* **paypal-clients:** persist clients (5mins) to prevent api block ([#15](https://github.com/ecomclub/app-paypal/issues/15)) ([ca0d7b4](https://github.com/ecomclub/app-paypal/commit/ca0d7b458c6dfd7d37c61751c3fd195e0efe665d))

### [1.4.1](https://github.com/ecomclub/app-paypal/compare/v1.4.0...v1.4.1) (2020-01-16)


### Bug Fixes

* **paypal-invoice-number:** fix getting invoice number from pp payment ([9c3b92b](https://github.com/ecomclub/app-paypal/commit/9c3b92b4263ec1ce015469a8ae4faeab357b6a8d))

## [1.4.0](https://github.com/ecomclub/app-paypal/compare/v1.3.1...v1.4.0) (2020-01-16)


### Features

* **paypal-invoice-number:** set payment invoice number as tn reference ([31fd92c](https://github.com/ecomclub/app-paypal/commit/31fd92c5acc3e319e8e2fdc6bfc9577709939f45))

### [1.3.1](https://github.com/ecomclub/app-paypal/compare/v1.3.0...v1.3.1) (2020-01-15)


### Bug Fixes

* **list-payments:** set fetch_when_selected when possible (refetch) ([a1d1059](https://github.com/ecomclub/app-paypal/commit/a1d105967deb3c0821bee15c0ef6e1cbd17bb5a9))

## [1.3.0](https://github.com/ecomclub/app-paypal/compare/v1.2.3...v1.3.0) (2020-01-15)


### Features

* **list-payments:** support creating payment after payment selection ([94bb907](https://github.com/ecomclub/app-paypal/commit/94bb9077fb2264691c6c3e695a501aaea93722b3))

### [1.2.3](https://github.com/ecomclub/app-paypal/compare/v1.2.2...v1.2.3) (2020-01-15)


### Bug Fixes

* **paypal-payment:** setting random invoice number on body when creating ([dd134c6](https://github.com/ecomclub/app-paypal/commit/dd134c6cd0f512429a460afa7e7d540a118c861c))

### [1.2.2](https://github.com/ecomclub/app-paypal/compare/v1.2.1...v1.2.2) (2020-01-14)


### Bug Fixes

* **create-transaction:** preventing duplicated transaction code ([347b3b0](https://github.com/ecomclub/app-paypal/commit/347b3b00256350805d302c003363afe470f8aa13))
* **paypal-payment-body:** fix handling amount total 0 to prevent error ([acc0d4f](https://github.com/ecomclub/app-paypal/commit/acc0d4fff895380de67e255b4ca7a3de864b93bf))

### [1.2.1](https://github.com/ecomclub/app-paypal/compare/v1.2.0...v1.2.1) (2020-01-13)


### Bug Fixes

* **ecom-webhook:** always get entire app config before continue ([f2d5dba](https://github.com/ecomclub/app-paypal/commit/f2d5dbaf2ac4bca24502c58bb951b4ce7da88869))

## [1.2.0](https://github.com/ecomclub/app-paypal/compare/v1.1.5...v1.2.0) (2020-01-13)


### Features

* **create-transaction:** update PayPal Payment to add order number ([dff8f9e](https://github.com/ecomclub/app-paypal/commit/dff8f9e298ac5dc00db9661ee0b7649350211600))


### Bug Fixes

* **partner-id:** fix paypal plus parter id header on payment execution ([2fa568d](https://github.com/ecomclub/app-paypal/commit/2fa568d07a655725748edb0cdc7a08bd21882962))
* **ppp-client:** set payerTaxIdType on paypal plus params object ([4c54fd2](https://github.com/ecomclub/app-paypal/commit/4c54fd2a41618ca3e818a15ab4314738e88fa227))

### [1.1.5](https://github.com/ecomclub/app-paypal/compare/v1.1.4...v1.1.5) (2020-01-10)


### Bug Fixes

* **paypal-webhook:** fix parsing event type to flags ([214972c](https://github.com/ecomclub/app-paypal/commit/214972c4dc4174a840ba751537ee1bbbff82ca25))

### [1.1.4](https://github.com/ecomclub/app-paypal/compare/v1.1.3...v1.1.4) (2020-01-10)


### Bug Fixes

* **paypal-webhook:** try resource.sale_id before resource.id ([75ee089](https://github.com/ecomclub/app-paypal/commit/75ee0894f6080a50e800f3fe57823401dfd11c9d))

### [1.1.3](https://github.com/ecomclub/app-paypal/compare/v1.1.2...v1.1.3) (2020-01-09)


### Bug Fixes

* **list-payments:** also apply discount when min amount not specified ([e797a28](https://github.com/ecomclub/app-paypal/commit/e797a28b134a446fcbc89e0f9c181623cb0f77b9))

### [1.1.2](https://github.com/ecomclub/app-paypal/compare/v1.1.1...v1.1.2) (2020-01-09)

### [1.1.1](https://github.com/ecomclub/app-paypal/compare/v1.1.0...v1.1.1) (2020-01-09)

## [1.1.0](https://github.com/ecomclub/app-paypal/compare/v1.0.7...v1.1.0) (2020-01-08)


### Features

* **list-payments:** optional custom label for paypal plus ([8342aee](https://github.com/ecomclub/app-paypal/commit/8342aeeada39d7fda8daa81ddb7b3b94b663bd42))

### [1.0.7](https://github.com/ecomclub/app-paypal/compare/v1.0.6...v1.0.7) (2020-01-08)


### Bug Fixes

* **database:** update (upsert) when transaction code confict ([#20](https://github.com/ecomclub/app-paypal/issues/20)) ([dcef7ae](https://github.com/ecomclub/app-paypal/commit/dcef7ae3c82fae0995815a7d92a24c00c7e58480))
* **parse-payment:** fix preseting default order currency ([8350fd3](https://github.com/ecomclub/app-paypal/commit/8350fd37c11b79cf71e967aea073db7faffa4a0e))
* **parse-payment:** prevent error with amount zero ([0259e11](https://github.com/ecomclub/app-paypal/commit/0259e11cd70508dc6e9d6b6afb1356dcf19e3d83))

### [1.0.6](https://github.com/ecomclub/app-paypal/compare/v1.0.5...v1.0.6) (2020-01-03)

### [1.0.5](https://github.com/ecomclub/app-paypal/compare/v1.0.4...v1.0.5) (2020-01-03)

### [1.0.4](https://github.com/ecomclub/app-paypal/compare/v1.0.3...v1.0.4) (2020-01-03)

### [1.0.3](https://github.com/ecomclub/app-paypal/compare/v1.0.2...v1.0.3) (2020-01-03)

### [1.0.2](https://github.com/ecomclub/app-paypal/compare/v1.0.1...v1.0.2) (2020-01-03)


### Bug Fixes

* **chk-client:** env must be sandbox or production ([e3e5a5b](https://github.com/ecomclub/app-paypal/commit/e3e5a5b9dec8cfdcf1626d1f1fc9ea468a8bb928))

### [1.0.1](https://github.com/ecomclub/app-paypal/compare/v1.0.0...v1.0.1) (2020-01-02)


### Bug Fixes

* **list-payments:** ensure amount is an object (set empty if undefined) ([00c9c38](https://github.com/ecomclub/app-paypal/commit/00c9c387b6f496aafe52035345eabb19d7adf3c1))

## [1.0.0](https://github.com/ecomclub/app-paypal/compare/v0.3.21...v1.0.0) (2019-12-31)

### [0.3.21](https://github.com/ecomclub/app-paypal/compare/v0.3.20...v0.3.21) (2019-12-31)


### Bug Fixes

* **paypal-payment:** add `application_context` object ([#16](https://github.com/ecomclub/app-paypal/issues/16)) ([2ef7ee9](https://github.com/ecomclub/app-paypal/commit/2ef7ee99ec309e70f5cf557a4f3ba567edd883a3))

### [0.3.20](https://github.com/ecomclub/app-paypal/compare/v0.3.19...v0.3.20) (2019-12-31)


### Bug Fixes

* **list-payments:** fix onload expression (; after declared var) ([2feeb0b](https://github.com/ecomclub/app-paypal/commit/2feeb0b3b611e83e5d3240fe33980a35661ede1d))

### [0.3.19](https://github.com/ecomclub/app-paypal/compare/v0.3.18...v0.3.19) (2019-12-31)


### Bug Fixes

* **list-payments:** fix onload expression (string var) ([f1e012c](https://github.com/ecomclub/app-paypal/commit/f1e012c21441f227b0b9827a00fd0d9693570fd6))

### [0.3.18](https://github.com/ecomclub/app-paypal/compare/v0.3.17...v0.3.18) (2019-12-31)


### Bug Fixes

* **chk-client:** setting button locale for checkoutjs ([939b543](https://github.com/ecomclub/app-paypal/commit/939b543f13700e589d02c4934618743cb8c84e39))

### [0.3.17](https://github.com/ecomclub/app-paypal/compare/v0.3.16...v0.3.17) (2019-12-31)

### [0.3.16](https://github.com/ecomclub/app-paypal/compare/v0.3.15...v0.3.16) (2019-12-31)


### Bug Fixes

* **chk-client:** remove _paypalClientId and client object ([31d6c69](https://github.com/ecomclub/app-paypal/commit/31d6c69a9a111e09e012d285930c442df9abbd83))

### [0.3.15](https://github.com/ecomclub/app-paypal/compare/v0.3.14...v0.3.15) (2019-12-31)


### Bug Fixes

* **list-payments:** edit to use payments api for spb (checkout.js) ([#17](https://github.com/ecomclub/app-paypal/issues/17)) ([244a69a](https://github.com/ecomclub/app-paypal/commit/244a69a8f4b7d5dc3e714ad1c4d868dd10230281))
* **list-payments:** fix applying discount before creating pp payment ([859a82c](https://github.com/ecomclub/app-paypal/commit/859a82c2cc195294663a11659e5b920eafd21a25))

### [0.3.14](https://github.com/ecomclub/app-paypal/compare/v0.3.13...v0.3.14) (2019-12-30)


### Bug Fixes

* **paypal-clients:** persist clients to prevent api block ([#15](https://github.com/ecomclub/app-paypal/issues/15)) ([c4ad5f3](https://github.com/ecomclub/app-paypal/commit/c4ad5f344bbcf9717d72af99e43fa6a3f29da261))

### [0.3.13](https://github.com/ecomclub/app-paypal/compare/v0.3.12...v0.3.13) (2019-12-20)


### Bug Fixes

* **create-transaction:** fix checking amount (with percentual margin) ([962ac4b](https://github.com/ecomclub/app-paypal/commit/962ac4bc78b9d5846c759c1b1256ac656dffd51d))

### [0.3.12](https://github.com/ecomclub/app-paypal/compare/v0.3.11...v0.3.12) (2019-12-19)


### Bug Fixes

* **create-transaction:** fix checking amount (with margin) ([a13b0ba](https://github.com/ecomclub/app-paypal/commit/a13b0ba005e306685086006543c705b5b7104a43))

### [0.3.11](https://github.com/ecomclub/app-paypal/compare/v0.3.10...v0.3.11) (2019-12-19)


### Bug Fixes

* **assets:** fix clients to consume window.storefrontApp ([fe3b565](https://github.com/ecomclub/app-paypal/commit/fe3b5658adcfe3717f75bd844ecf405bab91f6a8))
* **list-payments:** check for discount.value before applying ([c9d7d6c](https://github.com/ecomclub/app-paypal/commit/c9d7d6c82a6e0ec927adeb75a707ed927a4df8e7))

### [0.3.10](https://github.com/ecomclub/app-paypal/compare/v0.3.9...v0.3.10) (2019-12-09)


### Bug Fixes

* **list-payments:** respond with erro when invalid PayPal credentials ([0de1b8e](https://github.com/ecomclub/app-paypal/commit/0de1b8ed624092382fb6f6bb9a7c0fb9c971f854))
* **paypal-client:** don't log unauthorized client errors ([a567291](https://github.com/ecomclub/app-paypal/commit/a567291a3026a452f8f0583a7afc7ec224757e43))

### [0.3.9](https://github.com/ecomclub/app-paypal/compare/v0.3.8...v0.3.9) (2019-11-29)


### Bug Fixes

* **list-payments:** ensure paypalplus promise is resolved ([00b26b3](https://github.com/ecomclub/app-paypal/commit/00b26b3cd5cc2596449c77e02c48d6c339dd491b))

### [0.3.8](https://github.com/ecomclub/app-paypal/compare/v0.3.7...v0.3.8) (2019-11-29)


### Bug Fixes

* **list-payments:** check !is_checkout_confirmation to skip duplications ([2be20ee](https://github.com/ecomclub/app-paypal/commit/2be20eeaca4f7559bccd2f340bf94c963f5a1c6b))
* **ppp-params:** explicit disallowRememberedCards to false ([1f4f2d4](https://github.com/ecomclub/app-paypal/commit/1f4f2d480cf12d05432ff21cad8b59f0d0545f89))

### [0.3.7](https://github.com/ecomclub/app-paypal/compare/v0.3.6...v0.3.7) (2019-11-12)


### Bug Fixes

* **currency-values:** parse to string with 2 fixed decimal ([9a789bd](https://github.com/ecomclub/app-paypal/commit/9a789bdd77baca5dfe5f0054b1ecab8f1bc6b787))

### [0.3.6](https://github.com/ecomclub/app-paypal/compare/v0.3.5...v0.3.6) (2019-11-12)


### Bug Fixes

* **create-transaction:** fix paypal payments v1 handler (fix promises) ([b555028](https://github.com/ecomclub/app-paypal/commit/b555028ce2df9931349333799c00f8ba22b24746))

### [0.3.5](https://github.com/ecomclub/app-paypal/compare/v0.3.4...v0.3.5) (2019-11-12)


### Bug Fixes

* **create-transaction:** fix transaction handler for paypal v1 (plus) ([6805950](https://github.com/ecomclub/app-paypal/commit/68059505031951694255d71e0a94eef048bfb227))

### [0.3.4](https://github.com/ecomclub/app-paypal/compare/v0.3.3...v0.3.4) (2019-11-11)


### Bug Fixes

* **create-payment:** check open_payment_id to prevent fatal error ([a720cac](https://github.com/ecomclub/app-paypal/commit/a720cac40b5863d3ad8c7072df1255099ce85d80))
* **list-payments:** checkout with paypal plus without new payment ([4bea048](https://github.com/ecomclub/app-paypal/commit/4bea0489c360bbf11c45645dc75b34ff94dfed76))

### [0.3.3](https://github.com/ecomclub/app-paypal/compare/v0.3.2...v0.3.3) (2019-11-11)


### Features

* **paypal-lib:** add execute payment handler ([3eb69d6](https://github.com/ecomclub/app-paypal/commit/3eb69d66b672abae2f26dae0aa14a2e5b0332ab7))


### Bug Fixes

* **create-transaction:** check for paypal payer id to execute payemnt ([d956fb5](https://github.com/ecomclub/app-paypal/commit/d956fb575e38ef5c901b52e7c57235cfe0b1e489))
* **ppp-select-page:** pass both original and returned payment ids ([b610d39](https://github.com/ecomclub/app-paypal/commit/b610d39a3cc50c1d57db6c995f8a4b9eea064cbb))

### [0.3.2](https://github.com/ecomclub/app-paypal/compare/v0.3.1...v0.3.2) (2019-11-11)


### Bug Fixes

* **paypal-plus:** save original payment request id for paypal plus ([fdba6c5](https://github.com/ecomclub/app-paypal/commit/fdba6c5bd944e4def02b73f041a7d9f541b727cb))

### [0.3.1](https://github.com/ecomclub/app-paypal/compare/v0.3.0...v0.3.1) (2019-11-11)


### Bug Fixes

* **paypal-webhook:** up to 20 chars on payment history flag (event type) ([d0e1b11](https://github.com/ecomclub/app-paypal/commit/d0e1b1123eac22fc7e9844ace5ddeb5e3004ea62))

## [0.3.0](https://github.com/ecomclub/app-paypal/compare/v0.2.9...v0.3.0) (2019-11-11)

### [0.2.9](https://github.com/ecomclub/app-paypal/compare/v0.2.8...v0.2.9) (2019-11-11)


### Bug Fixes

* **paypal-webhook:** also handling PAYMENT.PAYOUTSBATCH events ([443d99c](https://github.com/ecomclub/app-paypal/commit/443d99ccb5d9b2e34a3f4c02de719adb24d4c549))

### [0.2.8](https://github.com/ecomclub/app-paypal/compare/v0.2.7...v0.2.8) (2019-11-11)


### Bug Fixes

* **paypal-webhook:** fix saving pp webhook notification and event types ([54b5395](https://github.com/ecomclub/app-paypal/commit/54b5395f2bf14bfeff9c07422141d0af3b1f1197))

### [0.2.7](https://github.com/ecomclub/app-paypal/compare/v0.2.6...v0.2.7) (2019-11-11)


### Bug Fixes

* **paypal-webhook:** handling PAYMENT.SALE events for paypal plus ([5126186](https://github.com/ecomclub/app-paypal/commit/51261868f7aa6e680c598eca1e51d6e9d47df436))
* **paypal-webhooks:** update event names list for paypal plus ([2098f63](https://github.com/ecomclub/app-paypal/commit/2098f6386a9d71251f4194d2a3bc376e0d227b56))

### [0.2.6](https://github.com/ecomclub/app-paypal/compare/v0.2.5...v0.2.6) (2019-11-11)


### Bug Fixes

* **ppp-select-page:** minor checkout btn style fix ([605f9f8](https://github.com/ecomclub/app-paypal/commit/605f9f8df914b968d281d5be36945d0b66805417))

### [0.2.5](https://github.com/ecomclub/app-paypal/compare/v0.2.4...v0.2.5) (2019-11-11)


### Bug Fixes

* **ppp-select-page:** fixing continue action and minor improves ([0c1dca8](https://github.com/ecomclub/app-paypal/commit/0c1dca83a55d4d97adaa51027c76ae286774df16))

### [0.2.4](https://github.com/ecomclub/app-paypal/compare/v0.2.3...v0.2.4) (2019-11-11)


### Bug Fixes

* **ppp-selection-page:** fix submit button styles and add spinner ([c066d8a](https://github.com/ecomclub/app-paypal/commit/c066d8ac9feb194542eb746df50259f6a7eb9528))

### [0.2.3](https://github.com/ecomclub/app-paypal/compare/v0.2.2...v0.2.3) (2019-11-11)


### Bug Fixes

* **list-payments:** shorter timeout for create payment req ([e4fdf25](https://github.com/ecomclub/app-paypal/commit/e4fdf258f4a7ce220fc4d1b033a50a9a3c317efc))
* **parse-payment-body:** fix redirect urls ([f23d54a](https://github.com/ecomclub/app-paypal/commit/f23d54a83f6d6e3aa491ebc184e759095b26ef44))

### [0.2.2](https://github.com/ecomclub/app-paypal/compare/v0.2.1...v0.2.2) (2019-11-11)

### [0.2.1](https://github.com/ecomclub/app-paypal/compare/v0.2.0...v0.2.1) (2019-11-11)


### Bug Fixes

* **list-payments:** fix creating payment request for paypal plus ([0e6fbf4](https://github.com/ecomclub/app-paypal/commit/0e6fbf4dbc451aa033fd2c98cb890da53f42742c))

## [0.2.0](https://github.com/ecomclub/app-paypal/compare/v0.1.33...v0.2.0) (2019-11-10)

### [0.1.33](https://github.com/ecomclub/app-paypal/compare/v0.1.32...v0.1.33) (2019-11-10)


### Features

* **list-payments:** check available discount by payment method ([bba3c4b](https://github.com/ecomclub/app-paypal/commit/bba3c4b5555cabfe4644cee080ee5265dc9afebb))
* **onload-expression:** handling paypal plus selection page ([89bbd86](https://github.com/ecomclub/app-paypal/commit/89bbd8622bfdf5305e3c06b990806e570bdf9e11))
* **parse-payment:** parsing list payments to paypal payment v1 ([ae47740](https://github.com/ecomclub/app-paypal/commit/ae4774099ef4d53768f45e3ff6cb167433686af3))
* **payment-gateway:** also handling gateway object for paypal plus ([8f4cca1](https://github.com/ecomclub/app-paypal/commit/8f4cca15c209801e9f896ddc0e29b74539f0c059))
* **paypal-plus:** finally prepare list payments to setup paypal plus ([cfe999a](https://github.com/ecomclub/app-paypal/commit/cfe999a59b714945dc7c30bff1cc27547aa06322))


### Bug Fixes

* **payment-gateway:** fix paypal plus container (add continue button) ([cafb6bf](https://github.com/ecomclub/app-paypal/commit/cafb6bffb1758ba43a73a7040f3b48c6967236d7))

### [0.1.32](https://github.com/ecomclub/app-paypal/compare/v0.1.31...v0.1.32) (2019-11-08)


### Bug Fixes

* **paypal-webhook:** skip logging transaction not found, return 400 ([87d9d3e](https://github.com/ecomclub/app-paypal/commit/87d9d3ec67052683abd157522d6279e36e154557))

### [0.1.31](https://github.com/ecomclub/app-paypal/compare/v0.1.30...v0.1.31) (2019-11-08)


### Bug Fixes

* **paypal-webhook:** fix verifying paypal webhook event ([d981969](https://github.com/ecomclub/app-paypal/commit/d9819692d4c1b4d13fcbeac9cac33d427da0c4cc))

### [0.1.30](https://github.com/ecomclub/app-paypal/compare/v0.1.29...v0.1.30) (2019-11-08)


### Bug Fixes

* **paypal-webhook:** ignore WEBHOOK_URL_ALREADY_EXISTS (err.response) ([ea8ee1e](https://github.com/ecomclub/app-paypal/commit/ea8ee1e0f17b694d51f1f45358ef035e1285e5e6))

### [0.1.29](https://github.com/ecomclub/app-paypal/compare/v0.1.28...v0.1.29) (2019-11-08)


### Bug Fixes

* **paypal-webhook:** ignore WEBHOOK_URL_ALREADY_EXISTS error ([29bcbc7](https://github.com/ecomclub/app-paypal/commit/29bcbc7d9af827779d2b467d23e51822108ef900))

### [0.1.28](https://github.com/ecomclub/app-paypal/compare/v0.1.27...v0.1.28) (2019-11-08)

### [0.1.27](https://github.com/ecomclub/app-paypal/compare/v0.1.26...v0.1.27) (2019-11-08)


### Bug Fixes

* **ecom-webhook:** fix resolve/reject first promise ([abc7f0f](https://github.com/ecomclub/app-paypal/commit/abc7f0f1a327051c9e91b1463f265bc4e4309da7))

### [0.1.26](https://github.com/ecomclub/app-paypal/compare/v0.1.25...v0.1.26) (2019-11-08)

### [0.1.25](https://github.com/ecomclub/app-paypal/compare/v0.1.24...v0.1.25) (2019-11-08)


### Bug Fixes

* **create-transaction:** set status to under analysis by default ([4a91d66](https://github.com/ecomclub/app-paypal/commit/4a91d6640ba4a3ad3ca9d83e957b8478938238d1))

### [0.1.24](https://github.com/ecomclub/app-paypal/compare/v0.1.23...v0.1.24) (2019-11-08)


### Features

* **paypal-client:** optionally add partner id header ([f430a6f](https://github.com/ecomclub/app-paypal/commit/f430a6f37408a9571a2be71caf80fc3bc7ef1b3e))


### Bug Fixes

* **get-order:** fix using PayPalHttpClient ([170d00f](https://github.com/ecomclub/app-paypal/commit/170d00fad0dcf818bbccea851f6d3e2c3990df49))

### [0.1.23](https://github.com/ecomclub/app-paypal/compare/v0.1.22...v0.1.23) (2019-11-08)


### Bug Fixes

* **paypal-sdk:** set disable-funding=card when scf not true ([9957463](https://github.com/ecomclub/app-paypal/commit/995746357f08db31ed235812aa5ac17ff5ca02bf))

### [0.1.22](https://github.com/ecomclub/app-paypal/compare/v0.1.21...v0.1.22) (2019-11-08)


### Bug Fixes

* **paypal-sdk:** set disable-funding=card by default ([05d236e](https://github.com/ecomclub/app-paypal/commit/05d236e6a76508ef76239716e3673727dab11a84))

### [0.1.21](https://github.com/ecomclub/app-paypal/compare/v0.1.20...v0.1.21) (2019-11-01)


### Bug Fixes

* **ecom-webhook:** fix getting config (hidden) ([c816a3b](https://github.com/ecomclub/app-paypal/commit/c816a3b839d34f91a1a8583021b5a617f627f186))
* **procedures:** fix default procedure trigger ([0a76b43](https://github.com/ecomclub/app-paypal/commit/0a76b4383c8d21a2827100a862db1be1c07e9e66))

### [0.1.20](https://github.com/ecomclub/app-paypal/compare/v0.1.19...v0.1.20) (2019-10-24)


### Bug Fixes

* **assets:** update app json auth scope ([163de8c](https://github.com/ecomclub/app-paypal/commit/163de8cc9300685853316922464808a7bcb64d1e))
* **routes:** also add /ecom/webhook to express router ([fa95d02](https://github.com/ecomclub/app-paypal/commit/fa95d02534fa01b1534b5d769b8732acede6f60d))

### [0.1.19](https://github.com/ecomclub/app-paypal/compare/v0.1.18...v0.1.19) (2019-10-22)


### Bug Fixes

* **onload:** handle paypal buttons error (reject) ([944c495](https://github.com/ecomclub/app-paypal/commit/944c4959d69bdae7b23018bae657680624295795))

### [0.1.18](https://github.com/ecomclub/app-paypal/compare/v0.1.17...v0.1.18) (2019-10-21)


### Features

* **create-transaction:** handle transaction verifying paypal order ([eac9797](https://github.com/ecomclub/app-paypal/commit/eac97974a8050d9743a5f13cfd556ca69fcdf11e))
* **database:** setup table to reference PayPal transactions to store ([7d91ad8](https://github.com/ecomclub/app-paypal/commit/7d91ad85cc3af68b8b060cf141a554d893ac7fcc))
* **lib-paypal:** add method to verify paypal webhook ([a3636e7](https://github.com/ecomclub/app-paypal/commit/a3636e7936acb6226d4c079cbf523a69bdb97310))
* **onload:** parse checkout data to paypal order object ([1c4d6f5](https://github.com/ecomclub/app-paypal/commit/1c4d6f51a236fc4d59a6617cce7d58e2d57aec2e))
* **paypal-order:** method to fetch pre created paypal order ([aed56e1](https://github.com/ecomclub/app-paypal/commit/aed56e1dde126865b08e8c84054570f6d32ca293))
* **paypal-webhooks:** handle paypal events to update order status ([9790380](https://github.com/ecomclub/app-paypal/commit/97903805b5b0bacebf4406888dbd3b287d58cd26))
* **store-orders:** methods to work with orders on store api ([d3b76a8](https://github.com/ecomclub/app-paypal/commit/d3b76a8cc0406ed7ca2684489f9c882c3631e9a3))


### Bug Fixes

* **create-transaction:** use paypal payment id as transaction code ([ff2f489](https://github.com/ecomclub/app-paypal/commit/ff2f4891cc14004444583a9ce22953e59b9081a7))
* **onload:** add open_payment_id with paypal order id ([d06617a](https://github.com/ecomclub/app-paypal/commit/d06617a8d56487207e5d26d70bc5328339d97427))
* **paypal-webhooks:** add order event types ([7415d35](https://github.com/ecomclub/app-paypal/commit/7415d35b68abe99d41596443542a845f3ff53a96))

### [0.1.17](https://github.com/ecomclub/app-paypal/compare/v0.1.16...v0.1.17) (2019-10-18)

### [0.1.16](https://github.com/ecomclub/app-paypal/compare/v0.1.15...v0.1.16) (2019-10-18)

### [0.1.15](https://github.com/ecomclub/app-paypal/compare/v0.1.14...v0.1.15) (2019-10-18)


### Bug Fixes

* **onload:** set _newPaypalOrderObj on window ([93fdbf4](https://github.com/ecomclub/app-paypal/commit/93fdbf472700adad02f1d0e9b66bc40895cf6b9d))

### [0.1.14](https://github.com/ecomclub/app-paypal/compare/v0.1.13...v0.1.14) (2019-10-18)

### [0.1.13](https://github.com/ecomclub/app-paypal/compare/v0.1.12...v0.1.13) (2019-10-17)


### Features

* **list-payments:** handle enable_standard_card_fiels config option ([f807734](https://github.com/ecomclub/app-paypal/commit/f807734cc14a6a8b49e8d72870749389406e59a8))


### Bug Fixes

* **onload:** handle std card fields, get vars from window ([d837ff9](https://github.com/ecomclub/app-paypal/commit/d837ff96f76a8fd731c84f643a9b6398673e225b))

### [0.1.12](https://github.com/ecomclub/app-paypal/compare/v0.1.11...v0.1.12) (2019-10-17)

### [0.1.11](https://github.com/ecomclub/app-paypal/compare/v0.1.10...v0.1.11) (2019-10-17)

### [0.1.10](https://github.com/ecomclub/app-paypal/compare/v0.1.9...v0.1.10) (2019-10-17)

### [0.1.9](https://github.com/ecomclub/app-paypal/compare/v0.1.8...v0.1.9) (2019-10-17)

### [0.1.8](https://github.com/ecomclub/app-paypal/compare/v0.1.7...v0.1.8) (2019-10-17)


### Features

* **create-profile:** handle ecom webhooks to create paypal web profile ([533d8e8](https://github.com/ecomclub/app-paypal/commit/533d8e82f7997b60033b083b2d57d453a9fd7198))
* **ecom-webhook:** also setup paypal webhook ([67c374a](https://github.com/ecomclub/app-paypal/commit/67c374a47dc79ab8992ba51b49e9228ddde2baf1))
* **paypal-webhook:** add handlers to create paypal webhook ([1ce0ded](https://github.com/ecomclub/app-paypal/commit/1ce0ded4c036dd50039b05cc1887bd7fd4788c13))


### Bug Fixes

* **onload:** try to get amount from global _amount ([449676c](https://github.com/ecomclub/app-paypal/commit/449676cafeada194e8df2ea603b7a94337525f35))
* **procedures:** remove field filter for trigger ([62f89cf](https://github.com/ecomclub/app-paypal/commit/62f89cf620d0a77c61dcfed3c4042929bac6b83d))
* **routes:** move ecom/modules/webhook to ecom/webhook ([2c59744](https://github.com/ecomclub/app-paypal/commit/2c5974446f16163a6a951a8387ca18ff27629d06))

### [0.1.7](https://github.com/ecomclub/app-paypal/compare/v0.1.6...v0.1.7) (2019-10-17)


### Features

* **payment-gateway:** add base gateway object for paypal plus ([ef1b10f](https://github.com/ecomclub/app-paypal/commit/ef1b10fb70689cf23aa655d477a5cf3129c139ad))
* **paypal-api:** init sdk and create paypal web profile ([0c184d3](https://github.com/ecomclub/app-paypal/commit/0c184d31513de4db35e00d144b8335329bc9a96f))
* **procedures:** add procedure for app hidden data changes ([d393e5e](https://github.com/ecomclub/app-paypal/commit/d393e5ef40782f13c17b63d3bb747cc8b570c17c))

### [0.1.6](https://github.com/ecomclub/app-paypal/compare/v0.1.5...v0.1.6) (2019-10-16)


### Bug Fixes

* **list-payments:** can't set country with paypal sdk on production ([78a2490](https://github.com/ecomclub/app-paypal/commit/78a2490c793e25e7821100d6f85f74a4552c68c0))

### [0.1.5](https://github.com/ecomclub/app-paypal/compare/v0.1.4...v0.1.5) (2019-10-16)


### Bug Fixes

* **list-payments:** preseting paypal script locale and country ([5312bfa](https://github.com/ecomclub/app-paypal/commit/5312bfa6e78e6b27aaf6d27e43d0ec3ede1c60f9))

### [0.1.4](https://github.com/ecomclub/app-paypal/compare/v0.1.3...v0.1.4) (2019-10-16)


### Features

* **list-payments:** handle config debug option ([65c436e](https://github.com/ecomclub/app-paypal/commit/65c436e366fd60d6ece8e9292e8b0fdd2749be16))

### [0.1.3](https://github.com/ecomclub/app-paypal/compare/v0.1.2...v0.1.3) (2019-10-16)


### Bug Fixes

* **list-payments:** can't disable card (it's disable on popup also) ([ba0395b](https://github.com/ecomclub/app-paypal/commit/ba0395bc057c851eebebe25d2d5a4ebf61e8beaf))

### [0.1.2](https://github.com/ecomclub/app-paypal/compare/v0.1.1...v0.1.2) (2019-10-16)


### Features

* **onload:** return some PayPal order data ([15d329e](https://github.com/ecomclub/app-paypal/commit/15d329e23a37966a20fcede3f58d3f8ce5d68427))


### Bug Fixes

* **list-payments:** disable cards (paypal components bug) ([4e9c97e](https://github.com/ecomclub/app-paypal/commit/4e9c97efa50fcf110a0c06b7bc8bcf6da6ff834a))

### [0.1.1](https://github.com/ecomclub/app-paypal/compare/v0.1.0...v0.1.1) (2019-10-15)


### Bug Fixes

* **src:** setup additional routes files ([1898196](https://github.com/ecomclub/app-paypal/commit/1898196be6f2474acf6641a5da72bfc5307fc2d0))
* **web:** update app routes ([3c155ad](https://github.com/ecomclub/app-paypal/commit/3c155ada44c4d11d626daae443180482f46105fb))

## [0.1.0](https://github.com/ecomclub/app-paypal/compare/v0.0.3...v0.1.0) (2019-10-15)

### [0.0.3](https://github.com/ecomclub/app-paypal/compare/v0.0.2...v0.0.3) (2019-10-15)

### 0.0.2 (2019-10-15)


### Features

* **assets:** setup files for payment icon and js client ([bb2f56e](https://github.com/ecomclub/app-paypal/commit/bb2f56e61e1cf5d7805f77541e7ff84df79a0396))
* **list-payments:** route to handle list payments module ([9df0cc8](https://github.com/ecomclub/app-paypal/commit/9df0cc8f8ce59d37e0af54e3659377eb8349fafb))
* **onload-expression:** handle paypal buttons ([0f58552](https://github.com/ecomclub/app-paypal/commit/0f5855218c9d765be1220384e9a5d0c21d4ccb9d))
* **payment-gateway:** setup base payment gateway object ([caa369c](https://github.com/ecomclub/app-paypal/commit/caa369ce0f0cc956e1a0b25e0639fdf78a6cf954))


### Bug Fixes

* **list-payments:** fixes for payment gateway js_client on list response ([66707aa](https://github.com/ecomclub/app-paypal/commit/66707aae8823ac6d43b5ee9c7f9bd82ffb094e87))
* **payment-gateway:** fix default label and js client ([5920dc7](https://github.com/ecomclub/app-paypal/commit/5920dc7aaf66d4acce130019fd523b26dfd52874))
* error with english ([ce81158](https://github.com/ecomclub/app-paypal/commit/ce811581a91d596aa122ff39f675ee5702622b4a))
