var stock={
	getStockInfo:function(name){
		if (name &&name!=""){
			loading(true);
			console.log("calling stock cloud");
			$fh.act({
				act : 'getStockInfo',
				secure : false,
				req : {
					name:name
				}
			}, function(res) {
				loading(false);
				console.log("in stock client: ",res.stockInfo);
		 		console.log("in stock res: ",res.stockSymbol);
				if (res.stockInfo){
					var stockInfoXmlStr=res.stockInfo;
					var stockSymbol=res.stockSymbol;
					$("#stockSymbol").text("Stock:"+stockSymbol);
					$("#stockInfo").text("stock quote"+stockInfoXmlStr);
				}
			},
				function(code,errorprops,params) {
					console.log("in stock err");
					console.log("errorprops "+JSON.stringify(errorprops));
					console.log("params "+JSON.stringify(params));
					loading(false);
					alert("Error happened. Please try again.");
			});
		}
	}
}