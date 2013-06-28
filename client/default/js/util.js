/**
 * some utilities
 */

$("#stock").addClass("active");

function loading(isLoading){
	if (isLoading){
		$(".loading").show();
	}else{
		$(".loading").hide();
	}
}
