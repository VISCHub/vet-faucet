var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var Web3 = require('web3');
var EthereumTx = require('ethereumjs-tx');
var app = express();

app.fs = fs;
app.https = https;
app.querystring = querystring;
app.Web3 = Web3;
app.EthereumTx = EthereumTx;

var config;
var configPath = 'configs/config.json';
var configExists = fs.existsSync(configPath, fs.F_OK);

if (configExists !== true) {
  console.error("Could not find the file " + configPath);
  process.exit(-1);
}

config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
app.config = config;
console.log(config);

var rawIndexHtml = fs.readFileSync(__dirname + '/public/index.tmpl');
rawIndexHtml = rawIndexHtml.toString().replace('CAPTCHA-SITEKEY', config.Captcha.sitekey);
rawIndexHtml = rawIndexHtml.replace('REQUEST_X_ETH', config.Ethereum.etherToTransfer);
// var defaultSiteKey = '6LdATkAUAAAAALjLvLC4fcPESWD4BmLlOmFi_oWJ';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

require('./helpers/debug')(app);
require('./helpers/generateResponse')(app);
require('./helpers/configHelper')(app);
require('./helpers/blockchainHelper')(app);
require('./helpers/captchaHelper')(app);
Wallet = require('./models/wallet');
require('./controllers/index')(app);
require('./controllers/getTxCallBack')(app);

app.get('/', function(request, response) {
  response.send(rawIndexHtml);
});

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
  console.log('Việt Nam Ethereum Testnet Network faucet is running on port', app.get('port'));
});
