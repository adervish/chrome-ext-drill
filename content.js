
//console.log("running");

//chrome.webRequest.onBeforeRequest.addListener(
//    function(details) {
//        if( details.url.startsWith("https://drill.gghc.com/extras/performance/performance_graph_JSON.aspx") )
//            return {redirectUrl: "bleep.com" };
//    },
//    {urls: ["*://drill.gghc.com/.*"]},
//    ["blocking"]);

//initChart = function initChart() {
//	
//	console.log("init chart");
//}

if ( document.URL.indexOf("security_detail.aspx") != -1)
{
	var images = document.getElementsByTagName('img');
	var re = /http:\/\/chart.yahoo.com\/c\/1y\/.*\/(.*)\.gif/;
	for (var i = 0, l = images.length; i < l; i++) {
		var myArray = images[i].src.match(re);
		console.log(images[i].src);
	
		if( myArray != null && myArray[1].indexOf(".") == -1 && myArray[1].indexOf(" ") == -1)
		{

			images[i].src = 'http://stockcharts.com/c-sc/sc?s=' + myArray[1] + '&p=D&yr=2&mn=0&dy=0&i=t62538121274&r=1476818820554'; //'&p=D&yr=2&mn=0&dy=0&i=t53265630090&r=1476801805335';
		}
	}
}
else 
{
	
	var div = document.getElementById("Summaries_mmGraph");
	console.log(div);
	
	div.id = 'sleepnomore';
	div.innerHTML = "";
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			
			doc = this.responseXML;
			
			var odd = doc.getElementsByClassName("TD_odd");
			var even = doc.getElementsByClassName("TD_even");
			//var order_rows = Array();
			//var order_rows = odd.concat(even);
			for( var i=0, l=even.length; i<l; i++ )
			{
				cols = even[i].getElementsByTagName("td");
				console.log( cols[1].innerHTML);
			}

	    }
	};
	xhttp.responseType = "document";
	xhttp.open("GET", "https://drill.gghc.com/orders_noMaster.aspx", true);
	xhttp.send();
	
//	var graphs = document.getElementsByClassName("highcharts-series-group");
//	console.log(graphs)
//	console.log(graphs[0])
//	paths = graphs[0].firstChild.getElementsByTagName("path");
//	console.log("PATH");
//	console.log(paths);
//	
//	console.log( paths.firstChild.outerHTML)
}
