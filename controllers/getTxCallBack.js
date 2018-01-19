module.exports = function(app) {
	let getTxCallBack = app.getTxCallBack;

	app.post('/getTxCallBack', function(request, response) {
		let txHash = request.body.txHash;
		getTxCallBack(txHash, response);
	});
};
