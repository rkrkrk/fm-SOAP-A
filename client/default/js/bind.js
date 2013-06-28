/**
 * bind.js
 * bind dom events to handler
 */

function bindEvents(){

	$("#submitQuery").bind("click",function(){
		var companyName=$("#companyName").val();
		stock.getStockInfo(companyName);
	});
	$("#maygurney").addClass("active");


}


$(document).ready(bindEvents);