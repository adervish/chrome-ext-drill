
if ( document.URL.indexOf("security_detail.aspx") != -1)
{
	var images = document.getElementsByTagName('img');
	var re = /http:\/\/chart.yahoo.com\/c\/1y\/.*\/(.*)\.gif/;
	for (var i = 0, l = images.length; i < l; i++) {
		var myArray = images[i].src.match(re);
		console.log(images[i].src);
	
		if( myArray != null && myArray[1].indexOf(".") == -1 && myArray[1].indexOf(" ") == -1)
		{
			// http://stockcharts.com/c-sc/sc?s=NFLX&p=D&yr=2&mn=0&dy=0&i=t62538121274&r=1476818820554
			images[i].src = 'http://stockcharts.com/c-sc/sc?s=' + myArray[1] + '&p=D&yr=2&mn=0&dy=0&i=t62538121274&r=1476818820554'; //'&p=D&yr=2&mn=0&dy=0&i=t53265630090&r=1476801805335';
		}
		//console.log(myArray);
	}
}
else 
{
		var graph = document.getElementById('Summaries_mmGraph');
		console.log( graph );
		paths = graph.getElementsByTagName("path");
		console.log( paths );
}
//var newURL = 'http://stockcharts.com/c-sc/sc?s=NFLX&p=D&yr=2&mn=0&dy=0&i=t53265630090&r=1476801805335 '


// 