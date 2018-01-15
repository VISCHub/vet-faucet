module.exports = function (app) {
	var EthereumTx = app.EthereumTx;
	var generateErrorResponse = app.generateErrorResponse;
	var config = app.config;
	var configureWeb3 = app.configureWeb3;
	var validateCaptcha = app.validateCaptcha;

	app.post('/', function(request, response) {
		var recaptureResponse = request.body.captcha;
		if (!recaptureResponse) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid captcha"});

		var receiver = request.body.receiver;
		if (!receiver) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid wallet address"});
		validateCaptcha(recaptureResponse, function(err, out) {
			validateCaptchaResponse(err, out, receiver, response);
		});
	});

	function validateCaptchaResponse(err, out, receiver, response) {
		if (!out) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid captcha"});
		if (!out.success) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid captcha"});
		var mongoose = require('mongoose');
		mongoose.connect('mongodb://localhost/wallet');
		Wallet.findOne({ address: receiver }, function(err, user) {
		  if (err) throw err;
		  console.log(user);
		  if (!user) {
		  	// create a new user
				var newWallet = Wallet({address: receiver});
				// save the user
				newWallet.save(function(err) {
				  if (err) throw err;
				  configureWeb3(config, function(err, web3) {
						configureWeb3Response(err, web3, receiver, response);
					});
				});
		  }
		  else if (user && user.createAt <= (Date.now() - (7*24*60*60*1000))) {
		  	configureWeb3(config, function(err, web3) {
					configureWeb3Response(err, web3, receiver, response);
				});
		  }
		  else {
		  	return generateErrorResponse(response, {code: 500, title: "Error", message: "7days for each address, please back later."});
		  }
		});

	}

	function validateWalletResponse(err, out, receiver, response) {
		if (!out) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid captcha"});
		if (!out.success) return generateErrorResponse(response, {code: 500, title: "Error", message: "Invalid captcha"});

		configureWeb3(config, function(err, web3) {
			configureWeb3Response(err, web3, receiver, response);
		});
	}

	function configureWeb3Response(err, web3, receiver, response) {
		if (err) return generateErrorResponse(response, err);

		var senderPrivateKey = config.Ethereum[config.environment].privateKey;
		const privateKeyHex = Buffer.from(senderPrivateKey, 'hex')
		if (!web3.isAddress(receiver)) return generateErrorResponse(response, {code: 500, title: "Error", message: "invalid address"});

		var gasPrice = parseInt(web3.eth.gasPrice);
		var gasPriceHex = web3.toHex(gasPrice);
		var amount = parseInt(web3.toWei(config.Ethereum.etherToTransfer, "ether"));
		var nonce = web3.eth.getTransactionCount(config.Ethereum[config.environment].account);
		var nonceHex = web3.toHex(nonce);
		const rawTx = {
		  nonce: nonceHex,
		  gasPrice: gasPriceHex,
		  gasLimit: config.Ethereum.gasLimit,
		  to: receiver,
		  value: web3.toHex(amount),
		  data: '0x00',
		  chainId: web3.toHex(web3.version.network)
		};

		var tx = new EthereumTx(rawTx);
		tx.sign(privateKeyHex);

		var serializedTx = tx.serialize();
		var tran_txt = "0x" + serializedTx.toString('hex');
		web3.eth.sendRawTransaction(tran_txt, function(err, hash) {
			sendRawTransactionResponse(err, hash, response);
		});
	}

	function sendRawTransactionResponse(err, hash, response) {
		if (err) return generateErrorResponse(response, err);

		var successResponse = {
			code: 200,
			title: "Success",
			message: "Tx is posted to blockchain",
			txHash: hash
		};

	  response.send({ success: successResponse });
	}
}
