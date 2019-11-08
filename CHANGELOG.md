# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
