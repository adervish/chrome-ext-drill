
var exMap = {};
exMap['.jp'] = 'TYO';
exMap['.hk'] = 'HKG';
exMap['.pa'] = 'EPA';
exMap['.to'] = 'TSE';
exMap['.ax'] = 'ASX';
exMap['.as'] = 'EPA';
exMap['.l'] = 'LON';
exMap['.br'] = 'EBR';
exMap['.mi'] = 'BIT';
exMap['.de'] = 'FRA';
//exMap['']
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


console.log("top of extension");

if ( document.URL.indexOf("security_detail.aspx") != -1)
{
	var images = document.getElementsByTagName('img');
	var re = /http:\/\/chart.yahoo.com\/c\/1y\/.*\/(.*?)(\.[a-z]+)?\.gif/;
	for (var i = 0, l = images.length; i < l; i++) {
		var myArray = images[i].src.match(re);
		console.log(myArray);
		console.log(images[i].src);
	
	
		if(  myArray != null )
		{
			if( myArray[2] == ".hk" && myArray[1].length == 3 )
				myArray[1] = "0" + myArray[1];
			
			if( myArray[2] == null )
				images[i].src = 'http://stockcharts.com/c-sc/sc?s=' + myArray[1] + '&p=D&yr=2&mn=0&dy=0&i=t62538121274&r=1476907012474'; 
			else
			{
				console.log("mapping " + myArray[2] + " to " + exMap[ myArray[2] ]);
				images[i].src = 'http://www.google.com/finance/getchart?q='+ myArray[1].toUpperCase() +'&x=' + exMap[ myArray[2] ] + '&p=2Y&i=86400';
			}
		}
	}
}
else 
{
	var div = document.getElementById("Summaries_mmGraph");
	console.log(div);
		
	// https://jsfiddle.net/api/post/library/pure/ 
	
	if( div != null )
	{



		console.log(div.parentNode);



		div.id = 'sleepnomore';
		div.style.width = "0px";
		div.style.height = "0px";
		//div.innerHTML = "";

		var newDiv = document.createElement("canvas");  
		
		div.style.display = 'none';
		div.parentNode.appendChild(newDiv);

		newDiv.style.height = "250px";
		newDiv.style.width = "400px";
		//newDiv.style.min-width = "400px"
		newDiv.margin = "0px"
		newDiv.id = 'chart_canvas';

		div.parentNode.appendChild(newDiv);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
		
				myJSONResponse = JSON.parse(this.responseText);
				var data = [];
				var labels = []
				for (p in myJSONResponse)
				{
					labels.push( p );
					data.push( myJSONResponse[p][1]);
				}
				console.log(data);
				var ctx = document.getElementById('chart_canvas').getContext('2d');
				var myChart = new Chart(ctx, {
				  type: 'line',
				  data: {
				    labels: labels,
				    datasets: [{
				      label: 'acd',
				      data: data,
				      backgroundColor: "rgba(153,255,51,0.4)"
				    }]
				  }
				});
	    	}
		};
		//xhttp.responseType = "document";
		//xhttp.withCredentials = true;
		var mmID = document.getElementById("ddlMoneyManagers").options[document.getElementById("ddlMoneyManagers").selectedIndex].value;
		xhttp.open("GET", "https://drill.gghc.com/extras/performance/performance_graph_JSON.aspx?mm_id="+mmID+"&accttype_cd=ALL&from_dte=2016-10-10T20:00:00.000Z&_=1477474785832", false);
		xhttp.send();

}



	
//	var graphs = document.getElementsByClassName("highcharts-series-group");
//	console.log(graphs)
//	console.log(graphs[0])
//	paths = graphs[0].firstChild.getElementsByTagName("path");
//	console.log("PATH");
//	console.log(paths);
//	
//	console.log( paths.firstChild.outerHTML)
}
