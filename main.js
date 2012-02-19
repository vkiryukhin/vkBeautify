
$(document).ready(function()
{
	$('#leftpanel').hide();
	$('#rightpanel').empty().load('html/overview.html');
});

function beatify() {
	var ta = document.getElementById('ta');
	if($('#mode').html() == 'XML') {
		ta.value =  vkbeautify.xml(ta.value);
	} else 
	if($('#mode').html() == 'JSON') {
		ta.value =  vkbeautify.json(ta.value);
	} else 
	if($('#mode').html() == 'CSS') {
		ta.value =  vkbeautify.css(ta.value);
	} 
	countChars();
}

function minify() {
	var ta = document.getElementById('ta');
	var preservecomm = document.getElementById('preservews').checked;
	if($('#mode').html() == 'XML') {
		ta.value = preservecomm ? vkbeautify.xmlmin(ta.value,true) : vkbeautify.xmlmin(ta.value);
	} else 
	if($('#mode').html() == 'JSON') {
		ta.value =  preservecomm ? vkbeautify.jsonmin(ta.value) : vkbeautify.jsonmin(ta.value);
	} else 
	if($('#mode').html() == 'CSS') {
		ta.value =  preservecomm ? vkbeautify.cssmin(ta.value,true) : vkbeautify.cssmin(ta.value);
	} 
	countChars();
}

function countChars(){
	document.getElementById('count').value = document.getElementById('ta').value.length;
}

function getWebService(url) {
	$.ajax( { 
		url: 'php/proxy.php?url='+url,
		type: 'GET',
		dataType: "text",
		success: function(data) { 
			document.getElementById('ta').value = data;
			countChars();
		}
	});

}

function loadTemplate(name)
{
	var cntx = {};
	cntx.country = 'USA';

	switch(name) {

		case 'overview':
			//$('#leftpanel').empty().load('tmpl/overview.tmpl');
			$('#leftpanel').hide();
			$('#rightpanel').empty().load('html/overview.html');
			break;
		
		case 'doc':
			$('#leftpanel').hide();
			//document.getElementById('leftpanel')
			$('#rightpanel').load('html/doc.html');
			break;
	
		case 'basic':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '<?xml version="1.0" encoding="UTF-8" ?>'
												+ '<!DOCTYPE foo SYSTEM "Foo.dtd"><a><b>bbb</b><c/>'
												+ '<d><!-- comment --></d><e><![CDATA[ <z></z> ]]>'
												+ '</e><f><g>   </g></f></a>';
			$('#rightpanel').empty().load('html/alltogether.html');
			$('#mode').html('XML');
			countChars();
			break;
		case 'yahoorss':
			$('#ta').width(800);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'Loading Yahoo RSS . . . ';
			getWebService('http://weather.yahooapis.com/forecastrss?w=2459115')
			$('#rightpanel').empty();
			$('#mode').html('XML');
			break;
		case 'googlenewsxml':
			$('#ta').width(800);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'Loading Google News . . . ';
			getWebService('http://news.google.com/news?ned=us&topic=h&output=rss');
			$('#rightpanel').empty();
			$('#mode').html('XML');
			countChars();
			break;
			
			
		case 'basicjson':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '{"menu":{"id": "file","value": [1,2,3],"popup":{"menuitem":[{"value":["one","two"],'
													+'"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';
			$('#rightpanel').empty().load('html/basic.html');
			$('#mode').html('JSON');
			countChars();
			break;

		case 'yahoojson':
			$('#ta').width(800);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'Loading Yahoo JSON . . . ';
			getWebService('http://weather.yahooapis.com/forecastjson?w=2459115')
			$('#rightpanel').empty();
			$('#mode').html('JSON');
			break;
		case 'googlenewsjson':
			$('#ta').width(800);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'Loading Google News JSON. . . ';
			getWebService('http://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=obama');
			$('#rightpanel').empty();
			$('#mode').html('JSON');
			break;			
			
		case 'basiccss':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '.headbg{margin:0 8px /*display:none*/ } a:link,a:focus{   color:#00c } a:active{   color:red }';
			$('#rightpanel').empty().load('html/basic.html');
			$('#mode').html('CSS');
			countChars();
			break;
			
		case 'yahoocss':
			$('#ta').width(800);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'Loading Google CSS . . . ';
			getWebService('http://ssl.gstatic.com/codesite/ph/3604335043632762799/css/core.css');
			$('#rightpanel').empty();
			$('#mode').html('CSS');
			break;
	}

}
