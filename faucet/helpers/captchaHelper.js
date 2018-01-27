module.exports = function(app) {
	let config = app.config;
	let generateErrorResponse = app.generateErrorResponse;
	let debug = app.debug;
	let querystring = app.querystring;
	let https = app.https;

	app.validateCaptcha = validateCaptcha;

	function validateCaptcha(captchaResponse, cb) {
	    let secret = config.Captcha.secret;
	    let post_data_json = {
	      'secret': secret,
	      'response': captchaResponse,
	    };

	    let post_data = querystring.stringify(post_data_json);

	    debug(post_data_json);
	    debug(post_data);

	    // An object of options to indicate where to post to
	    let post_options = {
	        host: 'www.google.com',
	        port: '443',
	        path: '/recaptcha/api/siteverify',
	        method: 'POST',
	        headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
	    };

	    debug(post_options);

	    let post_req = https.request(post_options, function(res) {
	        res.setEncoding('utf8');
	        let output = '';
	        res.on('data', function(chunk) {
	          output += chunk;
	        });

	        res.on('end', function() {
	            debug('##############');
	            debug('Output from validateCaptcha: ');
	            debug(output);
	            debug('##############');
	            if (output) {
	              debug(JSON.parse(output));
	              cb(null, JSON.parse(output));
	            } else {
	              cb();
	            }
	        });
	    });

	    post_req.on('error', function(err) {
	        debug(err);
	        cb(err);
	    });
	    // post the data
	    post_req.write(post_data, 'binary', function(e) {
	      if (e) debug(e);
	    });
	    post_req.end();
	};
};
