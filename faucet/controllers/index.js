const ethUtil = require('ethereumjs-util');

module.exports = function(app) {
  let EthereumTx = app.EthereumTx;
  let generateErrorResponse = app.generateErrorResponse;
  let config = app.config;
  let configureWeb3 = app.configureWeb3;
  let validateCaptcha = app.validateCaptcha;

  const senderPrivateKey = config.Ethereum[config.environment].privateKey;
  const privateKeyHex = Buffer.from(senderPrivateKey, 'hex');
  const senderAddr = ethUtil.privateToAddress(privateKeyHex);
  console.log('The sender address: 0x' + senderAddr.toString('hex'));

  // Default to 7 days, instead of crashing
  if (config.Ethereum[config.environment].waitDays === undefined) {
    config.Ethereum[config.environment].waitDays = 7;
  }

  const waitDays = parseFloat(config.Ethereum[config.environment].waitDays);
  console.log(`Cool down period between funding requests: ${waitDays} days`);

  app.post('/', function(request, response) {
    let recaptureResponse = request.body.captcha;
    if (!recaptureResponse) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid captcha'});

    let receiver = request.body.receiver;
    if (!receiver) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid wallet address'});
    validateCaptcha(recaptureResponse, function(err, out) {
      validateCaptchaResponse(err, out, receiver, response);
    });
  });

  function validateCaptchaResponse(err, out, receiver, response) {
    if (!out) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid captcha'});
    if (!out.success) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid captcha'});
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://db/wallet');
    Wallet.findOne({address: receiver}, function(err, user) {
      if (err) throw err;
      //console.log(user);
      let todayTime = Date.now();
      if (!user) {
        // create a new user
        let newWallet = Wallet({address: receiver, createdAt: todayTime});
        // save the user
        newWallet.save(function(err) {
          if (err) throw err;
          configureWeb3(config, function(err, web3) {
            configureWeb3Response(err, web3, receiver, response);
          });
        });
      } else if (user && user.createdAt <= (todayTime - (waitDays*24*60*60*1000))) {
        configureWeb3(config, function(err, web3) {
          configureWeb3Response(err, web3, receiver, response);
        });
      } else {
        return generateErrorResponse(response, {
          code: 500,
          title: 'Error',
          message: `${waitDays} day(s) for each address, please be back later.`
        });
      }
    });
  }

  function validateWalletResponse(err, out, receiver, response) {
    if (!out) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid captcha'});
    if (!out.success) return generateErrorResponse(response, {code: 500, title: 'Error', message: 'Invalid captcha'});

    configureWeb3(config, function(err, web3) {
      configureWeb3Response(err, web3, receiver, response);
    });
  }

  function configureWeb3Response(err, web3, receiver, response) {
    if (err) {
            return generateErrorResponse(response, err);
        }

    if (!web3.isAddress(receiver)) {
            return generateErrorResponse(response, {code: 500, title: 'Error', message: 'invalid address'});
        }

    let gasPrice = parseInt(web3.eth.gasPrice);
    let gasPriceHex = web3.toHex(gasPrice);
    let amount = parseInt(web3.toWei(config.Ethereum.etherToTransfer, 'ether'));
    let nonce = web3.eth.getTransactionCount('0x' + senderAddr.toString('hex'));
    let nonceHex = web3.toHex(nonce);
    const rawTx = {
      nonce: nonceHex,
      gasPrice: gasPriceHex,
      gasLimit: config.Ethereum.gasLimit,
      to: receiver,
      value: web3.toHex(amount),
      data: '0x00',
      chainId: web3.toHex(web3.version.network),
    };

    let tx = new EthereumTx(rawTx);
    tx.sign(privateKeyHex);

    let serializedTx = tx.serialize();
    let tran_txt = '0x' + serializedTx.toString('hex');
    web3.eth.sendRawTransaction(tran_txt, function(err, hash) {
      sendRawTransactionResponse(err, hash, response);
    });
  }

  function sendRawTransactionResponse(err, hash, response) {
    if (err) return generateErrorResponse(response, err);

    let successResponse = {
      code: 200,
      title: 'Success',
      message: 'Tx is posted to blockchain',
      txHash: hash,
    };

    response.send({success: successResponse});
  }
};
