const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * WalletSchema
 */
const WalletSchema = new Schema({
  address: { type : String, default : '', trim : true },
  coins: { type : Number, default : 0},
  createdAt  : { type : Date, default : Date.now }
});
var Wallet = mongoose.model('wallet', WalletSchema);
module.exports = Wallet;
