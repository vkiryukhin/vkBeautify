/**
* vkBeautify - javascript plugin
*  
* Version - 0.93.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautifyxml/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*	vkbeautify(text, 'xml'|'json'|'css' [,preserveWS ]) 
*
* PARAMETERS:
*
*	@text  			- String, text to beautify;
*	@format 		- String, 'xml' or 'json' or 'css'
* 	@preserveWS		- Bool (optional);
*					  flag, which instruct application don't 
*   				  remove extra white spaces within @text; 
*
*	Return - String
*	
* USAGE:
*	
*	vkbeautify(text, 'xml'); 
*	vkbeautify(text, 'xml', true); 
*	vkbeautify(text, 'json'); 
*	vkbeautify(text, 'json', true); 
*	vkbeautify(text, 'css'); 
*	vkbeautify(text, 'css', true); 
*
*/

(function() {

window.vkbeautify = function(text, format, preserveWS) {

	var shift = ['\n'], // array of shifts
	    deep = 0,
		str = '',
		jsonStr = '',
		step = '  ', // 2 spaces
		inComment = false,
		maxdeep = 100, // nesting level
		ix = 0,
		ar,
		len = 0;
	
	/* initialize array with shifts */
	for(ix=0;ix<maxdeep;ix++){
		shift.push(shift[ix]+step); 
	}
	
	if(format == 'xml') {
	
		ar = preserveWS ? text.replace(/</g,"~#~<").split('~#~') 
						: text.replace(/>\s{0,}</g,"><").replace(/</g,"~#~<").split('~#~');
		len = ar.length;

		for(ix=0;ix<len;ix++) {
			/* start comment or <![CDATA[...]]> or <!DOCTYPE*/
			if(ar[ix].search(/<!/) > -1) { 
				str += shift[deep]+ar[ix];
				inComment = true; 
				/* end comment  or <![CDATA[...]]> */
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
					inComment = false; 
				}
			} else 
			/* end comment  or <![CDATA[...]]> */
			if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
				str += ar[ix];
				inComment = false; 
			} else 
			/* <elm></elm> */
			if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
				/^<\w+/.exec(ar[ix-1]) == /^<\/\w+/.exec(ar[ix])[0].replace('/','')) { 
				str += ar[ix];
				if(!inComment) deep--;
			} else
			 /* <elm> */
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
				str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
			} else 
			 /* <elm>...</elm> */
			if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			/* </elm> */
			if(ar[ix].search(/<\//) > -1) { 
				str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
			} else 
			/* <elm/> */
			if(ar[ix].search(/\/>/) > -1 ) { 
				str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
			} else 
			/* <? xml ... ?> */
			if(ar[ix].search(/<\?/) > -1) { 
				str += shift[deep]+ar[ix];
			} else {
				str += ar[ix];
			}
		}
		
		return  (str[0] == '\n') ? str.slice(1) : str;
		
	}  else 
	
	if(format == 'json') {
	
		jsonStr = preserveWS ? text : jsonStr = text.replace(/\s{1,}/g,' ') 
		
		ar = jsonStr.replace(/\{/g,"~#~{~#~")
					.replace(/\[$/g,"[~#~")
					.replace(/\}/g,"~#~}")
					.replace(/\]/g,"~#~]")
					.replace(/\,/g,",~#~")
					.split('~#~');
					
		len = ar.length;
		
		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			} else 
			if( /\[/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			}  else 
			if( /\]/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			}  else 
			if( /\}/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			} else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
	}
	
	if(format == 'css') {
	
		jsonStr = preserveWS ? text : jsonStr = text.replace(/\s{1,}/g,' ') 
		
		ar = jsonStr.replace(/\{/g,"{~#~")
					.replace(/\}/g,"~#~}~#~")
					.replace(/\;/g,";~#~")
					.split('~#~');
					
		len = ar.length;
		
		for(ix=0;ix<len;ix++) {

			if( /\{/.exec(ar[ix]))  { 
				str += shift[deep++]+ar[ix];
			} else 

			if( /\}/.exec(ar[ix]))  { 
				str += shift[--deep]+ar[ix];
			} else {
				str += shift[deep]+ar[ix];
			}
		}
		return str.replace(/^\n{1,}/,'');
	}
}

})();

