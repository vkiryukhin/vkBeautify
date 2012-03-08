# vkBeautify

javascript  plugin to **pretty-print** or **minify**
text in **XML**, **JSON**, **CSS** and **SQL** formats.

**Version** - 0.96.01.beta

**Copyright** (c) 2012 Vadim Kiryukhin ( vkiryukhin @ gmail.com )

**Home page:** [http://www.eslinstructor.net/vkbeautify/](http://www.eslinstructor.net/vkbeautify/) 

**License:** Dual licensed under
the MIT and GPL licenses:

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

[http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

##Description

* `vkbeautify.xml(text )` - pretty print XMLtext; 

* `vkbeautify.json(text)` - pretty print JSON text; 

* `vkbeautify.css(text )` - pretty print CSS text; 

* `vkbeautify.sql(text )` - pretty print SQL text; 

* `vkbeautify.xmlmin(text [, preserveComments] ` - minify XML
text; 

* `vkbeautify.jsonmin(text)` - minify JSON text;

* `vkbeautify.cssmin(text [, preserveComments] )` - minify CSS text; 

* `vkbeautify.sqlmin(text)` - minify SQL text;

**PARAMETERS:**

`@text` - String; XML, JSON or CSS text to beautify; 

`@preserveComments` - 
Bool (optional, used in vkbeautify.minxml and vkbeautify.mincss only); Set this flag
to true to prevent removing comments from @text; 

`@Return` - String;


**USAGE:**

`var xml_pp   = vkbeautify.xml(xml_text); `

`var xml_min  = vkbeautify.xmlmin(xml_text [,true]);` 

`var json_pp  = vkbeautify.json(json_text);` 

`var json_min = vkbeautify.jsonmin(json_text);` 

`var css_pp   = vkbeautify.css(css_text); `

`var css_min  = vkbeautify.cssmin(css\text [, true]);`

`var sql_pp  = vkbeautify.sql(sql_text);` 

`var sql_min = vkbeautify.sqlmin(sql_text);` 

