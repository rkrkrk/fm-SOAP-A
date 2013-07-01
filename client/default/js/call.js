var call={
	makeSOAPcall:function(){
			console.log("make that call");
			loading(true);
			console.log("calling cloud SOAP request");
			$fh.act({
				act : 'soapProxy',
				secure : false,
				req: {
					url: "/booking/fetch?temp=22",
					}

			}, function(res) {
				loading(false);
				console.log("work info back: ",JSON.stringify(res));
				console.log("work info back: ",res);
				if (res.maygurney_res){
					var work=res.maygurney_res;
					var client=res.client_res;
					$("#maygurneyWork").text("Call Returned: "+work.mobileWorkOrder.data.ArrayOfdataItem.length+" items");
					var workitems=work.mobileWorkOrder.data.ArrayOfdataItem
					var i=0;
					_.each(workitems, function (item) {
						i++;
	      				$("#maygurneyWork").append("<br/><br/>summary workitem "+i+":<br/>"
	      					+item.WORKORDER[0].M_SUMMARY[0]);
				    });

					$("#maygurneyClient").text("Client request"+client.lastRequest+" ");
				}
			},
				function(code,errorprops,params) {
					console.log("errorprops "+JSON.stringify(errorprops));
					loading(false);
					alert("Error happened. Please try again.");
			});
	}
}