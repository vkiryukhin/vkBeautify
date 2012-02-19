/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON and CSS formats.
*  
* Version - 0.95.01.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*	vkbeautify.xml|json|css(text ) - pretty print XML, JSON or CSS text;
*	vkbeautify.xmlmin|jsonmin|cssmin(text, preserveComments ) - minify XML, JSON or CSS text; 
*
* PARAMETERS:
*
*	@text  				- String; text to beautify;
* 	@preserveComments	- Bool (optional, used in minxml and mincss only); 
*						  Set this flag to true to prevent removing comments from @text; 
*	@Return 			- String;
*	
* USAGE:
*	
*	vkbeautify.xml(text); 
*	vkbeautify.json(text); 
*	vkbeautify.css(text); 
*	vkbeautify.xmlmin( text [, true]); 
*	vkbeautify.jsonmin(text); 
*	vkbeautify.cssmin( text [, true]); 
*
*/

(function() {

function vkbeautify(){
	this.shift = ['\n']; // array of shifts
	var step = '  ', // 2 spaces
		maxdeep = 100, // nesting level
		ix = 0;

	// initialize array with shifts //
	for(ix=0;ix<maxdeep;ix++){
		this.shift.push(this.shift[ix]+step); 
	}

};

vkbeautify.prototype.xml = function(text) {

	var ar = text.replace(/>\s{0,}</g,"><").replace(/</g,"~#~<").split('~#~'),
		len = ar.length,
		inComment = false,
		deep = 0,
		str = '',
		ix = 0;

		for(ix=0;ix<len;ix++) {
			// start comment or <![CDATA[...]]> or <!DOCTYPE //
			if(ar[ix].search(/<!/) > -1) { 
				str += this.shift[deep]+ar[ix];
				inComment = true; 
				// end comment  or <![CDATA[...]]> //
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
					inComment = false; 
				}
			} else 
			// end comment  or <![CDATA[...]]> //
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
				str += ar[ix];
				inComment = false; 
			} else 
			// <elm></elm> //
			if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
				/^<\w+/.exec(ar[ix-1]) == /^<\/\w+/.exec(ar[ix])[0].replace('/','')) { 
				str += ar[ix];
				if(!inComment) deep--;
			} else
			 // <elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
				str = !inComment ? str += this.shift[deep++]+ar[ix] : str += ar[ix];
			} else 
			 // <elm>...</elm> //
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
			} else 
			// </elm> //
			if(ar[ix].search(/<\//) > -1) { 
				str = !inComment ? str += this.shift[--deep]+ar[ix] : str += ar[ix];
			} else 
			// <elm/> //
			if(ar[ix].search(/\/>/) > -1 ) { 
				str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
			} else 
			// <? xml ... ?> //
			if(ar[ix].search(/<\?/) > -1) { 
				str += this.shift[deep]+ar[ix];
			} else {
				str += ar[ix];
			}
		}
		
	return  (str[0] == '\n') ? str.slice(1) : str;
}

vkbeautify.prototype.json = function(text) {

	var ar = text.replace(/\s{0,}\{\s{0,}/g,"{")
				.replace(/\s{0,}\[$/g,"[")
				.replace(/\[\s{0,}/g,"[")
		  		.replace(/\s{0,}\}\s{0,}/g,"}")
				.replace(/\s{0,}\]\s{0,}/g,"]")
				.replace(/\"\s{0,}\,/g,'",')
				.replace(/\,\s{0,}\"/g,',"')
				.replace(/\"\s{0,}:/g,'":')
				.replace(/:\s{0,}\"/g,':"')
				.replace(/:\s{0,}\[/g,':[')
				
				.replace(/\{/g,"~#~{~#~")
				.replace(/\[/g,"[~#~")
				.replace(/\}/g,"~#~}")
				.replace(/\]/g,"~#~]")
				.replace(/\"\,/g,'",~#~')
				.replace(/\,\"/g,',~#~"')
				.replace(/~#~\s{0,}~#~/g,"~#~")
				.split('~#~'),
				
		len = ar.length,
		deep = 0,
		str = '',
		ix = 0;

	for(ix=0;ix<len;ix++) {
		if( /\{/.exec(ar[ix]))  { 
			str += this.shift[deep++]+ar[ix];
		} else 
		if( /\[/.exec(ar[ix]))  { 
			str += this.shift[deep++]+ar[ix];
		}  else 
		if( /\]/.exec(ar[ix]))  { 
			str += this.shift[--deep]+ar[ix];
		}  else 
		if( /\}/.exec(ar[ix]))  { 
			str += this.shift[--deep]+ar[ix];
		} else {
			str += this.shift[deep]+ar[ix];
		}
	}
	return str.replace(/^\n{1,}/,'');
}

vkbeautify.prototype.css = function(text) {

	var ar = text.replace(/\s{1,}/g,' ')
				.replace(/\{/g,"{~#~")
				.replace(/\}/g,"~#~}~#~")
				.replace(/\;/g,";~#~")
				.replace(/\/\*/g,"~#~/*")
				.replace(/\*\//g,"*/~#~")
				.replace(/~#~\s{0,}~#~/g,"~#~")
				.split('~#~'),
		len = ar.length,
		deep = 0,
		str = '',
		ix = 0;
		
		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  { 
				str += this.shift[deep++]+ar[ix];
			} else 
			if( /\}/.exec(ar[ix]))  { 
				str += this.shift[--deep]+ar[ix];
			} else
			if( /\*\\/.exec(ar[ix]))  { 
				str += this.shift[deep]+ar[ix];
			}
			else {
				str += this.shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
}

vkbeautify.prototype.xmlmin = function(text, preserveComments) {

	var str = preserveComments ? text
							   : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"");
	return  str.replace(/>\s{0,}</g,"><"); 
}

vkbeautify.prototype.jsonmin = function(text) {
								  
	return  text.replace(/\s{0,}\{\s{0,}/g,"{")
				.replace(/\s{0,}\[$/g,"[")
				.replace(/\[\s{0,}/g,"[")
				.replace(/:\s{0,}\[/g,':[')
		  		.replace(/\s{0,}\}\s{0,}/g,"}")
				.replace(/\s{0,}\]\s{0,}/g,"]")
				.replace(/\"\s{0,}\,/g,'",')
				.replace(/\,\s{0,}\"/g,',"')
				.replace(/\"\s{0,}:/g,'":')
				.replace(/:\s{0,}\"/g,':"');						  
}

vkbeautify.prototype.cssmin = function(text, preserveComments) {
	
	var str = preserveComments ? text
							   : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

	return str.replace(/\s{1,}/g,' ')
			  .replace(/\{\s{1,}/g,"{")
			  .replace(/\}\s{1,}/g,"}")
			  .replace(/\;\s{1,}/g,";")
			  .replace(/\/\*\s{1,}/g,"/*")
			  .replace(/\*\/\s{1,}/g,"*/");
}

window.vkbeautify = new vkbeautify();

})();

