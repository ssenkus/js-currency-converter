$(document).ready(function() {

	var curRates = {};
	// add/remove currencies from this array as needed; add label + input
	var curNames = ["USD", "CAD", "JPY", "EUR"];
				
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
			if (baseCurID === curID) {
				continue;
			}
			var conversionRate = baseCurRate * curRates[curID] * $(this).val();
			$("#" + curID).val(conversionRate.toFixed(2));
		}
	});
});
