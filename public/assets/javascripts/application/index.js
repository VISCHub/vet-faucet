$(function() {
	var loader = $(".loading-container");
	//$( "#faucetForm" ).submit(function( e ) {
	$( "#requestTokens" ).click(function( e ) {
		e.preventDefault();
    	$this = $(this);
    var receiver = $("#receiver").val();
		if (receiver == '') {
			swal('Enter Wallet address', 'Enter Wallet address', "error");
			return;
		}
		var captcha =  $("#g-recaptcha-response").val();
		if (captcha == '') {
			swal('Enter captcha', 'Enter captcha', "error");
			return;
		}
		loader.removeClass("hidden");
		$.ajax({
		  	url:"/",
		  	type:"POST",
		  	data: {//$this.serialize(),
		  		receiver: receiver,
		  		captcha: captcha
		  	}
		}).done(function(data) {
			if (!data.success) {
				loader.addClass("hidden");
				if (data.error.title == undefined) {
					swal('Error', data.error.message, "error");
					grecaptcha.reset();
				}
				else {
					swal(data.error.title, data.error.message, "error");
					grecaptcha.reset();
				}
				return;
			}

			getTxCallBack(data.success.txHash, function() {
				$("#receiver").val('');
				loader.addClass("hidden");
				swal("Success",
				  "20.0 ETH is successfully transfered to " + receiver + "</a>",
				  "success"
				);
				grecaptcha.reset();
			});
		}).fail(function(err) {
			console.log(err);
			loader.addClass("hidden");
			grecaptcha.reset();
		});
	});
});
