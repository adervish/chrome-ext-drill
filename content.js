var images = document.getElementsByTagName('img');
var re = /http:\/\/chart.yahoo.com\/c\/1y\/.*\/(.*)\.gif/;

for (var i = 0, l = images.length; i < l; i++) {
	var myArray = images[i].src.match(re);
	//console.log(images[i].src);
	
	if( myArray != null && myArray[1].indexOf(".") == -1 )
	{
		images[i].src = 'http://stockcharts.com/c-sc/sc?s=' + myArray[1] + '&p=D&yr=2&mn=0&dy=0&i=t53265630090&r=1476801805335';
	}
	//console.log(myArray);
}

//var newURL = 'http://stockcharts.com/c-sc/sc?s=NFLX&p=D&yr=2&mn=0&dy=0&i=t53265630090&r=1476801805335 '


