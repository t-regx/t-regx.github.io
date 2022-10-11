"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7503],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,h=u["".concat(o,".").concat(d)]||u[d]||m[d]||i;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5242:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m,frontMatter:()=>p,metadata:()=>o,toc:()=>s});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"match-details",title:"Match details"},o={unversionedId:"match-details",id:"match-details",isDocsHomePage:!1,title:"Match details",description:"When using [pattern()->match()] and [pattern()->replace->callback()], some methods returns [Detail]",source:"@site/../docs/match-details.md",sourceDirName:".",slug:"/match-details",permalink:"/docs/match-details",version:"current",lastUpdatedAt:1665527810,formattedLastUpdatedAt:"10/11/2022",frontMatter:{id:"match-details",title:"Match details"},sidebar:"docs",previous:{title:"Count occurrences",permalink:"/docs/count"},next:{title:"Capturing groups",permalink:"/docs/match-groups"}},s=[{value:"Overview",id:"overview",children:[]},{value:"Matched text",id:"matched-text",children:[]},{value:"Integers",id:"integers",children:[]},{value:"Subject",id:"subject",children:[]},{value:"Ordinal value (index)",id:"ordinal-value-index",children:[]},{value:"Offsets",id:"offsets",children:[]},{value:"Tail",id:"tail",children:[]},{value:"Other occurrences",id:"other-occurrences",children:[]},{value:"Groups",id:"groups",children:[]}],c={toc:s};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"When using ",(0,i.kt)("a",{parentName:"p",href:"/docs/match"},(0,i.kt)("inlineCode",{parentName:"a"},"pattern()->match()"))," and ",(0,i.kt)("a",{parentName:"p",href:"/docs/replace-callback"},(0,i.kt)("inlineCode",{parentName:"a"},"pattern()->replace->callback()")),", some methods returns ",(0,i.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,i.kt)("inlineCode",{parentName:"a"},"Detail")),"\ndetails object."),(0,i.kt)("p",null,'The details can be used to get concise information about the matched occurrence, such as its value\n(i.e. "the whole match"), capturing groups and their character/byte offsets, indices, other matches as well as the\nused subject (although it could also be pass as a closure parameter) and more.'),(0,i.kt)("p",null,"For example, to read the offset at which the occurrence was matched, use ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.offset()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// Instantiate pattern\n$pattern = pattern('[A-Z][a-z]+');\n\n// match the first occurence \n$detail = $pattern->match('I like Trains')->first();\n\n// read position of the first match\n$detail->offset(); // 2\n")),(0,i.kt)("h2",{id:"overview"},"Overview"),(0,i.kt)("p",null,"Using ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail")," details, you gain access to:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#matched-text"},(0,i.kt)("inlineCode",{parentName:"a"},"text()"))," - value of a matched occurrence"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#integers"},(0,i.kt)("inlineCode",{parentName:"a"},"toInt()")),"/",(0,i.kt)("a",{parentName:"li",href:"#integers"},(0,i.kt)("inlineCode",{parentName:"a"},"isInt()"))," which allow you to handle integers safely"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#subject"},(0,i.kt)("inlineCode",{parentName:"a"},"subject()"))," - subject against which the pattern was matched"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#ordinal-value-index"},(0,i.kt)("inlineCode",{parentName:"a"},"index()"))," - ordinal value of a matched occurrence"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#offsets"},"offsets of matched values")," in the subject (UTF-8 safe):",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#offsets"},(0,i.kt)("inlineCode",{parentName:"a"},"offset()"))," - position of the occurrence in characters"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#matched-text"},(0,i.kt)("inlineCode",{parentName:"a"},"length()"))," - length of the matched occurrence in characters"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#tail"},(0,i.kt)("inlineCode",{parentName:"a"},"tail()"))," - position after the occurrence in characters (tail=offset+length)"))),(0,i.kt)("li",{parentName:"ul"},"byte versions of the methods:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"byteOffset()")," - position of the occurrence in bytes"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"byteLength()")," - length of the matched occurrence in bytes"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"byteTail()")," - position after the occurrence in bytes (tail=offset+length)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"#other-occurrences"},(0,i.kt)("inlineCode",{parentName:"a"},"all()"))," - other matched occurrences"),(0,i.kt)("li",{parentName:"ul"},"details about capturing groups, in the next chapter: ",(0,i.kt)("a",{parentName:"li",href:"/docs/match-groups"},"Capturing groups"))),(0,i.kt)("h2",{id:"matched-text"},"Matched text"),(0,i.kt)("p",null,"There are 6 similar ways to get the value of the matched occurrence."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php",metastring:"{3-4,6-8}","{3-4,6-8}":!0},"$detaill = pattern('[A-Z][a-z]+')->match('I like Trains')->first();\n\n$detail->text();             // using text() method\n$detail->get(0);             // group #0 is the whole match in all regexp engines\n$detail->group(0)->text();   // group #0 is the whole match in all regexp engines\n\n(string) $detail;            // cast it to string\n\"$detail\";                   // enclose it in double quotes\n")),(0,i.kt)("p",null,"or you can just accept ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," in the callback signature."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// Instantiate pattern\n$pattern = Pattern::of('[A-Z][a-z]+');\n\n// map each occurrence\n$pattern->match('I like Trains')->map(function (string $match) {\n    return $match; // string ('Trains')\n});\n")),(0,i.kt)("p",null,"All of them are redundant and equal to each other. Their redundancy comes from the fact the there are a few ways of\ncasting an object to string in PHP, casting ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail")," to string is the same as getting ",(0,i.kt)("inlineCode",{parentName:"p"},"text()")," in T-Regx, and that the\nwhole match is also group ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," in regular expressions."),(0,i.kt)("p",null,"There's also Unicode-safe method ",(0,i.kt)("inlineCode",{parentName:"p"},"length()")," which returns the length of a matched text."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// Instantiate pattern\n$pattern = Pattern::of('[A-Z][a-z]+');\n\n// map each occurrence\n$pattern->match('I like Trains')->map(function (Detail $detail) {\n    return $detail->text();     // string ('Trains')\n    return $detail->length();   // 6\n});\n")),(0,i.kt)("h2",{id:"integers"},"Integers"),(0,i.kt)("p",null,"Method ",(0,i.kt)("inlineCode",{parentName:"p"},"isInt()")," returns ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),' if, and only if, the matched occurrence is numeric. And by "numeric", we mean "real" numeric,\nnot PHP numeric:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"String values considered valid integers: ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"'14'"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"'-14'"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"'000'")," "))),(0,i.kt)("li",{parentName:"ul"},"Strings that aren't treated as valid integers: ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"'+14'"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"' 10'"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"'10 '"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"''"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"' '"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"'0.0'"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"'0,0'"),",")))),(0,i.kt)("p",null,"The string is considered a valid integer if:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"contains only ",(0,i.kt)("inlineCode",{parentName:"li"},"0-9")," characters, and more than 1 of them (so ",(0,i.kt)("inlineCode",{parentName:"li"},"00")," is also a valid integer, but ",(0,i.kt)("inlineCode",{parentName:"li"},"''")," isn't)"),(0,i.kt)("li",{parentName:"ul"},"optionally starts with only one ",(0,i.kt)("inlineCode",{parentName:"li"},"-")," sign"),(0,i.kt)("li",{parentName:"ul"},"its numeric representation is:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"higher or equal ",(0,i.kt)("inlineCode",{parentName:"li"},"PHP_INT_MIN")," (",(0,i.kt)("inlineCode",{parentName:"li"},"-9223372036854775808"),")"),(0,i.kt)("li",{parentName:"ul"},"lower or equal ",(0,i.kt)("inlineCode",{parentName:"li"},"PHP_INT_MAX")," (",(0,i.kt)("inlineCode",{parentName:"li"},"9223372036854775807"),")"))),(0,i.kt)("li",{parentName:"ul"},"doesn't contain any other characters")),(0,i.kt)("h4",{id:"checking-and-parsing"},"Checking and parsing"),(0,i.kt)("p",null,"There are two methods regarding integers: ",(0,i.kt)("inlineCode",{parentName:"p"},"isInt()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"toInt()"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"$detail->isInt()")," returns ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"false")," depending on whether the matched occurrence is numeric. ",(0,i.kt)("inlineCode",{parentName:"p"},"toInt()"),"\nreturns said numeric occurrence as an integer, or throws ",(0,i.kt)("inlineCode",{parentName:"p"},"IntegerFormatException")," instead."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php",metastring:"{3}","{3}":!0},"$matcher = pattern('\\d+')->match('User input was: 4 times');\n$detail = $matcher->first();\n\nif ($detail->isInt()) {\n    for ($i = 0; $i < $detail->toInt(); $i++) {\n        // tasks\n    }\n}\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"It's implemented with ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.filter-var.php"},(0,i.kt)("inlineCode",{parentName:"a"},"filter_var()")),", but you can think of it as ",(0,i.kt)("inlineCode",{parentName:"p"},"/^-?[0-9]+$/")," with max/min values check."))),(0,i.kt)("h2",{id:"subject"},"Subject"),(0,i.kt)("p",null,"To get the subject in your callback, use ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.subject()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"pattern('[A-Z][a-z]+')->match('I like Trains')->map(fn(Detail $detail) => $detail->subject());\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"'I like Trains'\n")),(0,i.kt)("p",null,"This is equivalent to storing the subject in a variable and using it in your closure."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// Instantiate pattern\n$pattern = pattern('[A-Z][a-z]+');\n\n// map each occurrence\n$pattern->match('I like Trains')->map(fn(Detail $detail) => 'I like Trains');\n")),(0,i.kt)("h2",{id:"ordinal-value-index"},"Ordinal value (index)"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Detail.index()")," returns the ordinal number of a matched occurrence."),(0,i.kt)("p",null,"In this example, we'll modify every second word:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php",metastring:"{2}","{2}":!0},"pattern('\\w+')->match('I like Trains, but I also like bikes')->map(function (Detail $detail) {\n    if ($detail->index() % 2 === 0) {\n        return strtolower($detail);\n    }\n    return strtoupper($detail);\n});\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"['i', 'LIKE', 'trains', 'BUT', 'i', 'ALSO', 'like', 'BIKES']\n")),(0,i.kt)("h2",{id:"offsets"},"Offsets"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Detail.offset()")," can be used to get the offset of the matched occurrence in the subject. ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.offset()")," is unicode\ncharacter safe and returns offset in characters, whereas ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.byteOffset()")," returns the offset in bytes."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$pattern = Pattern::of('here');\n\n$detail = $pattern->match('Apples for 0.30\u20ac, here')->first();\n\n$characters = $detail->offset();   // 18\n$byes = $detail->byteOffset();     // 20\n")),(0,i.kt)("p",null,"Here's what the numbers mean:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"Apples for 0.30\u20ac, here\n                  \u2191\n                  offset()\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"A  p   p   l   e   s      f   o   r      0  .  3  0  \u20ac           ,     h   e   r   e\n65 112 112 108 101 115 32 102 111 114 32 48 46 51 48 226 130 172 44 32 104 101 114 101\n                                                                       \u2191\n                                                                       byteOffset()\n")),(0,i.kt)("p",null,"In other words, ",(0,i.kt)("inlineCode",{parentName:"p"},"offset()")," treats bytes ",(0,i.kt)("inlineCode",{parentName:"p"},"[226, 130, 172]")," as one unicode character (euro sign ",(0,i.kt)("inlineCode",{parentName:"p"},"\u20ac"),") and counts them as\none; whereas ",(0,i.kt)("inlineCode",{parentName:"p"},"byteOffset()")," would count them as three."),(0,i.kt)("p",null,"Use:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"offset()")," with functions: ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.mb-substr.php"},(0,i.kt)("inlineCode",{parentName:"a"},"mb_substr()")),", ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.mb-strpos.php"},(0,i.kt)("inlineCode",{parentName:"a"},"mb_strpos()"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"byteOffset()")," with functions: ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.substr.php"},(0,i.kt)("inlineCode",{parentName:"a"},"substr()")),", ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.strpos.php"},(0,i.kt)("inlineCode",{parentName:"a"},"strpos()")))),(0,i.kt)("h2",{id:"tail"},"Tail"),(0,i.kt)("p",null,"Method ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.tail()")," simply returns the position of the last character in a matched occurrence."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$detail = pattern('ipsum')->match('Lorem ipsum')->first();\n\n$start = $detail->offset();   // 6\n$end = $detail->tail();       // 11\n")),(0,i.kt)("p",null,"There's also ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.byteTail()")," which returns the tail in bytes, instead of characters."),(0,i.kt)("h2",{id:"other-occurrences"},"Other occurrences"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Detail")," has access to other matched occurrences:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Detail.all()")," - for whole matches (like ",(0,i.kt)("inlineCode",{parentName:"li"},"Detail.text()"),")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Detail.group().all()")," - for capturing groups (like ",(0,i.kt)("inlineCode",{parentName:"li"},"Detail.group().text()"),")")),(0,i.kt)("p",null,"Even if you use ",(0,i.kt)("inlineCode",{parentName:"p"},"first()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"only(int)")," methods, ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.all()")," always returns unlimited occurrences."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php",metastring:"{4}","{4}":!0},"pattern('\\w+')->match('Apples are cool')->map(function (Detail $detail) {\n    return [\n        'match' => $detail->text(),\n        'all'   => $detail->all()\n    ];\n});\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"[\n  ['match' => 'Apples', 'all' => ['Apples', 'are', 'cool']],\n  ['match' => 'are',    'all' => ['Apples', 'are', 'cool']],\n  ['match' => 'cool',   'all' => ['Apples', 'are', 'cool']]\n]\n")),(0,i.kt)("h2",{id:"groups"},"Groups"),(0,i.kt)("p",null,"With ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail.group(string|int)"),", you can easily retrieve capturing groups."),(0,i.kt)("p",null,"Just like with ",(0,i.kt)("inlineCode",{parentName:"p"},"Detail"),", retrieving matched occurrence value is done with ",(0,i.kt)("inlineCode",{parentName:"p"},"text()")," method or by casting it to ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php",metastring:"{5,7-8}","{5,7-8}":!0},"$pattern = Pattern::of('(?<value>\\d+)(?<unit>cm|mm)');\n$matcher = $pattern->match('192mm and 168cm or 18mm and 12cm');\n\n$detail = $matcher->first();\n$text = $detail->text();                            // '192mm'\n\n$value = (string) $detail->group('value');          // '192'\n$unit  =          $detail->group('unit')->text();   // 'mm'\n\n$value = $detail->get('value');                     // '192'\n$unit  = $detail->get('unit');                      // 'mm'\n\n")),(0,i.kt)("p",null,"More about capturing groups can be found in the next section: ",(0,i.kt)("a",{parentName:"p",href:"/docs/match-groups"},"Capturing groups"),"."))}m.isMDXComponent=!0}}]);