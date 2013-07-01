/**
 * bind.js
 * bind dom events to handler
 */

function bindEvents(){

	$("#submitQuery").bind("click",function(){
		call.makeSOAPcall();
	});
	$("#maygurney").addClass("active");


}


$(document).ready(bindEvents);