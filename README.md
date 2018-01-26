## VET Network faucet

### Building from source

1. Clone repository
2. Update config.json `./config.json` (see config.json with placeholders below)
3. Update `./public/index.html`: Find `<div class="g-recaptcha" data-sitekey="type your reCaptcha plugin secret here"></div>` line and type your reCaptcha plugin secret in `data-sitekey` attribute. For more info, [see](https://developers.google.com/recaptcha/docs/verify?hl=ru)
4. `npm install` from project's root
5. cd `./public`
6. `npm install`
7. `npm run sass`
8. `npm run coffee`
9. Go to project's root and run `npm start`.

Sokol POA Network faucet will be launched at `http://localhost:8000`

### Server config.json (`./config.json`) with placeholders

```
{
  "environment": "switcher between configurations: 'live' or 'dev'",
  "debug": "switch on/off server logs: true or false",
  "Captcha": {
    "secret": "type your reCaptcha plugin secret here"
  },
  "Ethereum": {
    "etherToTransfer": "type amount of Ether to be sent from faucet here, for example 0.5",
    "gasLimit": "type Ethereum transaction gas limit here, for example, 0x7b0c",
    "live": {
      "rpc": "type Ethereum RPC address here, for example http://127.0.0.1:8545",
      "privateKey": "type private key of sender here, for example, 54dd4125ed5418a7a68341413f4006256159f9f5ade8fed94e82785ef59523ab"
    },
    "dev": {
      ...
    }
  }
}

### Captcha

Use test keys provided by Google:

```
Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

For more information, read: https://developers.google.com/recaptcha/docs/faq

### Docker

* https://github.com/wsargent/docker-cheat-sheet
* http://containertutorials.com/volumes/volume_from_image.html
