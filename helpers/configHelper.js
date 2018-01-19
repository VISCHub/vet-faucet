module.exports = function(app) {
	let fs = app.fs;

	app.getConfig = getConfig;

  	function getConfig(cb) {
		let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
		cb(config);
	}
};
