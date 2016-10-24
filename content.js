
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
				images[i].src = 'http://www.google.com/finance/getchart?q='+ myArray[1].toUpperCase() +'&x=' + exMap[ myArray[2] ] + '&p=2Y&i=86400';
		}
	}
}
else 
{
		var graph = document.getElementById('Summaries_mmGraph');
		console.log("graph" +  graph );
		paths = graph.getElementsByTagName("path");
		console.log(paths );
}