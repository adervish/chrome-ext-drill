
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

function drawBasic(myData) {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
	  
      data.addColumn('number', 'ACD');

	  if ( myData == null )
		  myData = [
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ];

      data.addRows(myData);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Performance'
        }
      };


    };
	
	addGraphDataString = `function addGraphData()
	{
		var mmID = document.getElementById("ddlMoneyManagers").options[document.getElementById("ddlMoneyManagers").selectedIndex].value;
		var graphURL = 'https://drill.gghc.com/extras/performance/performance_graph_JSON.aspx?mm_id='+mmID+'&accttype_cd=ALL&from_dte=2016-10-10T20:00:00.000Z&_=1477474785832';
	
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	
				//var content = xhttp.responseText;
				myJSONResponse = JSON.parse(this.responseText);
				console.log( myJSONResponse );
			
		      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			  google.charts.load('current', {packages: ['corechart', 'line']});
			  google.charts.setOnLoadCallback(drawBasic);
		      chart.draw(myJSONResponse, options);
			
	    	}
		};
		console.log("requesting " + graphURL );
		//xhttp.responseType = "document";
		//xhttp.withCredentials = true;

		xhttp.open("GET", graphURL, true);
		xhttp.send();
	};`;
	

graphScript = `		google.charts.load('current', {packages: ['corechart', 'line']});
		google.charts.setOnLoadCallback(drawBasic);

		function drawBasic(myData) {

		      var data = new google.visualization.DataTable();
		      data.addColumn('number', 'X');
			  
		      data.addColumn('number', 'ACD');

			  if ( myData == null )
				  myData = [
		        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
		        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
		        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
		        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
		        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
		        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
		        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
		        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
		        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
		        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
		        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
		        [66, 70], [67, 72], [68, 75], [69, 80]
		      ];

		      data.addRows(myData);

		      var options = {
		        hAxis: {
		          title: 'Time'
		        },
		        vAxis: {
		          title: 'Performance'
		        }
		      };


		    };`;


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

		var newDiv = document.createElement("DIV");  
		
		div.style.display = 'none';
		div.parentNode.appendChild(newDiv);

		newDiv.style.height = "250px";
		newDiv.style.width = "400px";
		//newDiv.style.min-width = "400px"
		newDiv.margin = "0px"
		newDiv.id = 'chart_div';

		div.parentNode.appendChild(newDiv);
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
		
				//var se = document.createElement("SCRIPT");
				//var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
				//se.text = this.responseText + " console.log('test'); "+addGraphDataString+" addGraphData();" ;
				//document.getElementsByTagName('head')[0].appendChild(se );
				//console.log( "injected script" );
				//addGraphData()
	    	}
		};
		//xhttp.responseType = "document";
		//xhttp.withCredentials = true;
		xhttp.open("GET", "https://www.gstatic.com/charts/loader.js", false);
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
