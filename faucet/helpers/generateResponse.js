module.exports = function(app) {
	app.generateErrorResponse = generateErrorResponse;

	function generateErrorResponse( response, err ) {
	    let out = {
	      error: {
	        code: err.code,
	        title: err.title,
	        message: err.message,
	      },
	    };
	    console.log(err);
	    response.send(out);
	}
};
