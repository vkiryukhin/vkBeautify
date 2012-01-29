
$(document).ready(function()
{
	//$('#leftpanel').empty().load('tmpl/overview.tmpl');
	//document.getElementById('collapsews').checked = true;
	$('#leftpanel').hide();
	$('#rightpanel').empty().load('html/overview.html');


});

function beatify() {
	var ta = document.getElementById('ta');
	var preservws = document.getElementById('preservews').checked;
	if($('#mode').html() == 'XML') {
		ta.value =  preservws ? vkbeautify(ta.value, 'xml', true) : vkbeautify(ta.value, 'xml');
	} else 
	if($('#mode').html() == 'JSON') {
		ta.value =  preservws ? vkbeautify(ta.value, 'json', true) : vkbeautify(ta.value, 'json');
	} else 
	if($('#mode').html() == 'CSS') {
		ta.value =  preservws ? vkbeautify(ta.value, 'css', true) : vkbeautify(ta.value, 'css');
	} 
}

function getWebService(url) {
	$.ajax( { 
		url: 'php/proxy.php?url='+url,
		type: 'GET',
		dataType: "text",
		success: function(data) { 
			document.getElementById('ta').value = data;
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
			document.getElementById('ta').value = '<a><b><c>ccc</c><d/></b></a>';
			$('#rightpanel').empty().load('html/basic.html');
			$('#mode').html('XML');
			break;
		case 'comment':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '<a><!-- comment > <> /> --><![CDATA[ > <> /> ]]></a>';
			$('#rightpanel').empty().load('html/comment.html');
			$('#mode').html('XML');
			break;
		case 'alltogether':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '<?xml version="1.0" encoding="UTF-8" ?>'
												+ '<!DOCTYPE foo SYSTEM "Foo.dtd"><a>aaa<b>bbb</b><c/>'
												+ '<d><!-- comment --></d><e><![CDATA[ <z></z> ]]>'
												+ '</e><f><g>   </g></f></a>';
			$('#rightpanel').empty().load('html/alltogether.html');
			$('#mode').html('XML');
			break;
		case 'preservews':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '<a><b>     </b></a>';
			$('#rightpanel').empty().load('html/collapsews.html');
			$('#mode').html('XML');
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
			break;
			
			
		case 'basicjson':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '{"menu":{"id": "file","value": "File","popup":{"menuitem":[{"value":"New",'
													+'"onclick":"CreateNewDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';
			$('#rightpanel').empty().load('html/basic.html');
			$('#mode').html('JSON');
			break;
		case 'preservewsjson':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = '{    "value":"foo          bar"   }';
			$('#rightpanel').empty().load('html/collapsews.html');
			$('#mode').html('JSON');
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
			document.getElementById('ta').value = '.headbg{margin:0 8px } a:link,a:focus{   color:#00c } a:active{   color:red }';
			$('#rightpanel').empty().load('html/basic.html');
			$('#mode').html('CSS');
			break;
		case 'preservewscss':
			$('#ta').width(400);
			$('#leftpanel').show();
			document.getElementById('ta').value = 'a:link,       a:focus{   color:    #00c } a:active{   color:red }';
			$('#rightpanel').empty().load('html/collapsews.html');
			$('#mode').html('CSS');
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
