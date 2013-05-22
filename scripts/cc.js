var curRates = {};
// add/remove currencies from this array as needed; 
var curNames = ["USD", "CAD", "JPY", "EUR", "CDF", "BAM"];
						var text = '';
						for (var x = 0; x < curNames.length; x++) {
							text += '<label for="'+ curNames[x] +'">' + curNames[x] + '</label><input class="currency" id="'+curNames[x]  +'" type="text" value="" /><br />';
						}
document.write('<div id="currencyConverter">' + 
					'<h2>Currency Converter</h2>' + 
					text +
					'<div id="currentRates">' + 
						'<h3>Current Exchange Rates (base: USD)</h3>' + 
							'<pre></pre>' + 
					'</div>' + 
					'<div id="currencyConverterFooter">' + 
						'<p>Currency exchange rates provided by <br />' + 
						'<a href="http://openexchangerates.org/" target="_blank">The Open Exchange Rates API </a>' + 
						'</p>' + 
						'<p>Put this converter on your site! Click <a href="http://jsfiddle.net/UpRC6/12/" target="_blank">here</a> for the code!' + 
						'</p>' + 
					'</div>' + 
				'</div>');

document.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>');


function curConvert () {

			$('#currencyConverter').css({
				'width': '300px',
				'margin': '20px auto',
				'padding': '0px',    
				'overflow': 'hidden',    
				'background-color': '#fafafa',
				'border': '1px solid #000',
				'border-radius': '10px',
				'text-align': 'center',
				'font-size': '12px',
				'font-family': 'Arial, Helvetica, sans-serif'
			});

			$('currencyConverter label').css({
					'display': 'inline-block',
					'width': '50px',
					'text-align': 'right',
					'padding': '0 5px 0 0'
			});

			$('#currencyConverter h2, #currencyConverter h3').css({
				'margin': '0 0 5px 0',
				'font-size': '20px',
				'background-color': '#77e',
				'text-shadow': '-1px 1px 0px #fff',
				'padding': '2px'
			});
			$('#currencyConverter h3').css({
				'font-size': '16px',
				'margin': '5px 0 0 0'
			});

			$('#currencyConverter pre').css({
				'background-color': '#dadada',
				'font-weight': 'bold',
				'text-align': 'left',
				'padding': '5px 0 5px 75px',
				'margin': '0'
			});
			$('#currencyConverterFooter').css({
				'background-color': '#7d7'
			});
			$('#currencyConverterFooter p').css({
				'margin': '0',
				'font-size': '10px',
				'padding': '2px'
			});

			$('#currencyConverterFooter p:last-child').css({
				'background-color': '#000',
				'color': '#fff'
			});
				
		


				
	// get rates from OpenExchangeRates API
	$.ajax({
		type:		"GET",
       	url: 		"http://openexchangerates.org/api/latest.json?app_id=3eb8017dc43343eaa87c63fc6563481d",
		dataType:	"jsonp",
		success:    function(result) {
						$.each(result.rates, function(name, rate){
							// only use selected currencies
							if ( $.inArray(name,curNames) > -1) {
								$("#currentRates pre").append(name + " " + rate + " <br />");
                                curRates[name] = rate;
								$("#" + name).val(rate);
							}
						});
					},
		error: 		function(xhr, ajaxOptions, thrownError) {  
						alert("xhr status: " + xhr.statusText +"\nError thrown: " + thrownError);    
		        	}
	});

	$(".currency").keyup(function () {
		var baseCurID = ($(this).attr("id"));
		var currentInput = $("#" + baseCurID);
		if (currentInput.val() === "" || 
            isNaN(currentInput.val()) || 
            currentInput.val() < 0 ) {
						return;
		}
		var baseCurRate = 1 / curRates[baseCurID]; 
		for (var curID in curRates) {
			if (baseCurID === curID) {continue;}
			var conversionRate = baseCurRate * curRates[curID] * $(this).val();
			$("#" + curID).val(conversionRate.toFixed(2));
		}
	});

}


(function() {
    function onLoad() { curConvert(); } // Code to be run

    if ('jQuery' in window) onLoad();
    else {
        var t = setInterval(function() { // Run poller
            if ('jQuery' in window) {
                onLoad();
                clearInterval(t);        // Stop poller
            }
        }, 50);
    }
})();