## VET Network faucet

### Building from source

1. Clone repository
2. Update `configs/config.json` (see config.json with placeholders below)
3. Add your reCaptcha `sitekey`, `secret`. For more info, [see](https://developers.google.com/recaptcha/docs/verify?hl=ru)
4. Go to `faucet`, and run `npm install`
5. Go to `faucet/public` and run:
    ```
    npm install
    npm run sass
    npm run coffee
    ```
9. Go out to project `faucet` and run `npm start`.

Faucet will be launched at `http://localhost:8000` .

### Server `config.json` with placeholders

```
{
  "environment": "dev",
  "debug": true,
  "Captcha": {
    "sitekey": "reCaptcha site key (shown on HTML)",
    "secret": "type your reCaptcha plugin secret here"
  },
  "Ethereum": {
    "etherToTransfer": "type amount of Ether to be sent from faucet here, for example 0.5",
    "gasLimit": "type Ethereum transaction gas limit here, for example, 0x7b0c",
    "live": {
      "rpc": "http://127.0.0.1:8545",
      "privateKey": "type private key of sender here, for example, 54dd4125ed5418a7a68341413f4006256159f9f5ade8fed94e82785ef59523ab"
    },
    "dev": {
      "rpc": "http://127.0.0.1:8545",
      "privateKey": "type private key of sender here, for example, 54dd4125ed5418a7a68341413f4006256159f9f5ade8fed94e82785ef59523ab"
    }
  }
}
```

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
* https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/
* https://docs.docker.com/compose/networking/
* https://askubuntu.com/questions/505506/how-to-get-bash-or-ssh-into-a-running-container-in-background-mode

### Recipient

0xc225efE07Db9d3a85e18306CbEA8dE1b667e0e92
