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

if (document.URL.indexOf("security_detail.aspx") != -1) {
	var images = document.getElementsByTagName('img');
	var re = /http:\/\/chart.yahoo.com\/c\/1y\/.*\/(.*?)(\.[a-z]+)?\.gif/;
	for (var i = 0, l = images.length; i < l; i++) {
		var myArray = images[i].src.match(re);
		console.log(myArray);
		console.log(images[i].src);


		if (myArray != null) {
			if (myArray[2] == ".hk" && myArray[1].length == 3)
				myArray[1] = "0" + myArray[1];

			if (myArray[2] == null)
				images[i].src = 'http://stockcharts.com/c-sc/sc?s=' + myArray[1] + '&p=D&yr=2&mn=0&dy=0&i=t62538121274&r=1476907012474';
			else {
				console.log("mapping " + myArray[2] + " to " + exMap[myArray[2]]);
				images[i].src = 'http://www.google.com/finance/getchart?q=' + myArray[1].toUpperCase() + '&x=' + exMap[myArray[2]] + '&p=2Y&i=86400';
			}
		}
	}
} else {
	var div = document.getElementById("Summaries_mmGraph");
	console.log(div);

	if (div != null) {
		console.log(div.parentNode);

		div.id = 'sleepnomore';
		div.style.width = "0px";
		div.style.height = "0px";
		//div.innerHTML = "";

		var newDiv = document.createElement("div");

		div.style.display = 'none';
		div.parentNode.appendChild(newDiv);

		//newDiv.style.height = "250px";
		//newDiv.style.width = "400px";
		//newDiv.style.min-width = "400px"
		newDiv.margin = "0px"
		newDiv.id = 'chart_canvas';

		div.parentNode.appendChild(newDiv);

		var mmID = document.getElementById("ddlMoneyManagers").options[document.getElementById("ddlMoneyManagers").selectedIndex].value;
		var mgr = "https://drill.gghc.com/extras/performance/performance_graph_JSON.aspx?mm_id=" + mmID + "&accttype_cd=ALL&from_dte=2016-10-28T09:30:00.000Z";
		var ndx = "https://drill.gghc.com/extras/performance/performance_graph_JSON.aspx?portfolio_name=NDX_INDEX&from_dte=2016-10-14T20:00:00.000Z&_=1477859245973"
		
		var url = ndx;

		var margin = {
				top: 20,
				right: 20,
				bottom: 30,
				left: 50
			},
			width = 600 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;

		var x = techan.scale.financetime()
			.range([0, width])
			.outerPadding(0);

		var y = d3.scaleLinear()
			.range([height, 0]);

		var close = techan.plot.close()
			.xScale(x)
			.yScale(y);

			var xAxis = d3.axisBottom(x);
			var yAxis = d3.axisLeft(y);

			var svg = d3.select("#chart_canvas").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			d3.queue()
				.defer(d3.json, mgr)
				.defer(d3.json, ndx)
				.await(function(error, mgr, ndx) {
					if (error) {
						console.log(error);
					}
					mgr = mgr.map(function(d) {
						return {
							date: new Date(d[0]),
							open: +d[1],
							high: +d[1],
							low: +d[1],
							close: +d[1],
							volume: 0.0
						};
					ndx = ndx.map(function(d) {
						return {
							date: new Date(d[0]),
							open: +d[1],
							high: +d[1],
							low: +d[1],
							close: +d[1],
							volume: 0.0
						};
					console.log(ndx[0]);
				});

		d3.json(url, function(error, data) {
			var accessor = close.accessor();

			}).sort(function(a, b) {
				return d3.ascending(accessor.d(a), accessor.d(b));
			});

			svg.append("g")
				.attr("class", "close");

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")");

			svg.append("g")
				.attr("class", "y axis")
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Price ($)");

			draw(data);
		});
	}
}

function draw(data) {
	x.domain(data.map(close.accessor().d));
	y.domain(techan.scale.plot.ohlc(data, close.accessor()).domain());

	svg.selectAll("g.close").datum(data).call(close);
	svg.selectAll("g.x.axis").call(xAxis);
	svg.selectAll("g.y.axis").call(yAxis);
};






//	var graphs = document.getElementsByClassName("highcharts-series-group");
//	console.log(graphs)
//	console.log(graphs[0])
//	paths = graphs[0].firstChild.getElementsByTagName("path");
//	console.log("PATH");
//	console.log(paths);
//	
//	console.log( paths.firstChild.outerHTML)
