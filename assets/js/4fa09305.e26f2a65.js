"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[466],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},p=Object.keys(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(n=0;n<p.length;n++)a=p[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),s=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},h=function(e){var t=s(e.components);return n.createElement(o.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,p=e.originalType,o=e.parentName,h=l(e,["components","mdxType","originalType","parentName"]),m=s(a),c=r,d=m["".concat(o,".").concat(c)]||m[c]||u[c]||p;return a?n.createElement(d,i(i({ref:t},h),{},{components:a})):n.createElement(d,i({ref:t},h))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=a.length,i=new Array(p);i[0]=c;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[m]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<p;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},6276:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=a(7462),r=a(3366),p=(a(7294),a(3905)),i=["components"],l={id:"why-php-sucks",title:"Why PHP sucks?"},o={unversionedId:"why-php-sucks",id:"why-php-sucks",isDocsHomePage:!1,title:"Why PHP sucks?",description:"If you'd like to learn the reasons behind certain T-Regx feature, and know how it manages to",source:"@site/../docs/why-php-sucks.md",sourceDirName:".",slug:"/why-php-sucks",permalink:"/docs/why-php-sucks",version:"current",lastUpdatedAt:1676220528,formattedLastUpdatedAt:"2/12/2023",frontMatter:{id:"why-php-sucks",title:"Why PHP sucks?"},sidebar:"docs",previous:{title:"Capturing groups - J modifier",permalink:"/docs/match-groups-j-modifier"}},s=[{value:"What&#39;s wrong with PHP Regular Expressions:",id:"whats-wrong-with-php-regular-expressions",children:[{value:"PHP is Implicit",id:"php-is-implicit",children:[]},{value:"PHP is Unintuitive",id:"php-is-unintuitive",children:[]},{value:"PHP is Messy",id:"php-is-messy",children:[]},{value:"PHP is Inconsistent",id:"php-is-inconsistent",children:[]},{value:"PHP is Deliberately buggy",id:"php-is-deliberately-buggy",children:[]},{value:"PHP silently ignores invalid arguments",id:"php-silently-ignores-invalid-arguments",children:[]}]},{value:"T-Regx showcase",id:"t-regx-showcase",children:[{value:"T-Regx eliminates gotcha&#39;s",id:"t-regx-eliminates-gotchas",children:[]},{value:"T-Regx maps warnings and errors to exceptions",id:"t-regx-maps-warnings-and-errors-to-exceptions",children:[]},{value:"T-Regx is clean and simple",id:"t-regx-is-clean-and-simple",children:[]},{value:"T-Regx unifies the differences between matching and replacing",id:"t-regx-unifies-the-differences-between-matching-and-replacing",children:[]},{value:"T-Regx provides rich API for building patterns",id:"t-regx-provides-rich-api-for-building-patterns",children:[]},{value:"T-Regx is really smart with its exceptions",id:"t-regx-is-really-smart-with-its-exceptions",children:[]}]}],h={toc:s},m="wrapper";function u(e){var t=e.components,a=(0,r.Z)(e,i);return(0,p.kt)(m,(0,n.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("p",null,"If you'd like to learn the reasons behind certain T-Regx feature, and know how it manages to\nsupersede PHP regular expressions, read on."),(0,p.kt)("h2",{id:"whats-wrong-with-php-regular-expressions"},"What's wrong with PHP Regular Expressions:"),(0,p.kt)("p",null,"PHP regular expressions API is far from perfect. Here's only a handful of what's wrong with it:"),(0,p.kt)("h3",{id:"php-is-implicit"},"PHP is Implicit"),(0,p.kt)("p",null,"You are probably a PHP developer. I would like to get ",(0,p.kt)("inlineCode",{parentName:"p"},"'Robert likes apples'"),". Can you tell me which\nis the correct signature for this task?"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"preg_replace('/Bob/', 'Robert', 'Bob likes apples');    // pattern, replacement, subject\n// or\npreg_replace('/Bob/', 'Bob likes apples', 'Robert');    // pattern, subject, replacement\n// ??\n")),(0,p.kt)("h3",{id:"php-is-unintuitive"},"PHP is Unintuitive"),(0,p.kt)("p",null,"Programming languages are ",(0,p.kt)("strong",{parentName:"p"},"tools")," created to solve problems. An experienced programmer ",(0,p.kt)("strong",{parentName:"p"},"should"),"\nbe able to look at the code and tell what it does."),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"Whole set of regular expressions with PHP throws all kinds of notices, warnings, errors and fatal errors, as well as\nsilently ignoring invalid data."),(0,p.kt)("li",{parentName:"ul"},"Matching API has two functions: ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," (first) or ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()")),"."),(0,p.kt)("li",{parentName:"ul"},"Replacing API has four functions: ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace()")),", ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace-callback.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace_callback()")),", ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace-callback-array.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace_callback_array()"))," and ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()")),"."),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace()"))," and other replacing functions have two optional ",(0,p.kt)("inlineCode",{parentName:"li"},"int")," parameters, and I never know\nwhich is ",(0,p.kt)("inlineCode",{parentName:"li"},"$limit")," and which is ",(0,p.kt)("inlineCode",{parentName:"li"},"&$count"),"."),(0,p.kt)("li",{parentName:"ul"},"Function which does ",(0,p.kt)("strong",{parentName:"li"},"replacing")," is named ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()")),"."),(0,p.kt)("li",{parentName:"ul"},"Matching returns an array of arrays, which contain either a ",(0,p.kt)("inlineCode",{parentName:"li"},"string"),", ",(0,p.kt)("inlineCode",{parentName:"li"},"null"),", or an array of ",(0,p.kt)("inlineCode",{parentName:"li"},"null"),"s,\n",(0,p.kt)("inlineCode",{parentName:"li"},"strings")," and ",(0,p.kt)("inlineCode",{parentName:"li"},"int"),"s. What type exactly is returned depends on the runtime subject and the order of the values."),(0,p.kt)("li",{parentName:"ul"},"Functions with 4, 5, 6 parameters (3-4 of which are optional).")),(0,p.kt)("h3",{id:"php-is-messy"},"PHP is Messy"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_OFFSET_CAPTURE")),' is a nightmare! It changes return type from "an array of arrays" to "an array of arrays of arrays".'),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_SET_ORDER"))," / ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_PATTERN_ORDER")),' change return values. It\'s either "groups of matches" or "matches of groups",\ndepending on the flag.')),(0,p.kt)("p",null,"The worst part? You find yourself looking at this code:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"return $match[1][0];\n")),(0,p.kt)("p",null,"having no idea what. it. does. You have to see whether you're using ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," or ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()"))," and\nwhether any of ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_SET_ORDER")),"/",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_PATTERN_ORDER")),"/",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_OFFSET_CAPTURE"))," were used."),(0,p.kt)("p",null,"And to refactor it, later? Replace ",(0,p.kt)("inlineCode",{parentName:"p"},"$match[1]")," with ",(0,p.kt)("inlineCode",{parentName:"p"},"array_map($match, ...)"),". Good luck. With that."),(0,p.kt)("h3",{id:"php-is-inconsistent"},"PHP is Inconsistent"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"Matches returned from ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()")),", ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()"))," and ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace-callback.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace_callback()"))," each have completely\ndifferent structures and each has own magic values and rules. So when you, say, change ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," to\n",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()")),", there's a high chance you'll break something."),(0,p.kt)("p",{parentName:"li"},"For example, ",(0,p.kt)("inlineCode",{parentName:"p"},'""')," for ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()")),' means "maybe matched empty string, maybe unmatched", but for\n',(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()")),' it means "definitely not matched".')),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"Flag ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_UNMATCHED_AS_NULL"))," works for ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()")),"/",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()")),", but not for replacing.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"How do you get results and the count of the results?"),(0,p.kt)("table",{parentName:"li"},(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Value"),(0,p.kt)("th",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"th"},"preg_match()")),(0,p.kt)("th",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"th"},"preg_replace()")))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"Count"),(0,p.kt)("td",{parentName:"tr",align:null},"Return type"),(0,p.kt)("td",{parentName:"tr",align:null},"Argument reference")),(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},"Values"),(0,p.kt)("td",{parentName:"tr",align:null},"Argument reference"),(0,p.kt)("td",{parentName:"tr",align:null},"Return type")))),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-php"},"$replaced = preg_replace($p, $r, $s, $count);\n$count    = preg_match($p, $s, $matched);\n"))),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"If you use ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_OFFSET_CAPTURE"))," and your subject isn't matched with the pattern; these are the results:"),(0,p.kt)("table",{parentName:"li"},(0,p.kt)("thead",{parentName:"table"},(0,p.kt)("tr",{parentName:"thead"},(0,p.kt)("th",{parentName:"tr",align:null},"Success"),(0,p.kt)("th",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"th"},"preg_match()")),(0,p.kt)("th",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"th"},"preg_match_all()")))),(0,p.kt)("tbody",{parentName:"table"},(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"true")),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"['match', 2]")),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"['match', 2']"))),(0,p.kt)("tr",{parentName:"tbody"},(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"false")),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"''")),(0,p.kt)("td",{parentName:"tr",align:null},(0,p.kt)("inlineCode",{parentName:"td"},"[null, -1]")))))),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-quote.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_quote()"))," quotes different characters for different PHP versions.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," signature states it returns ",(0,p.kt)("inlineCode",{parentName:"p"},"int"),", but it returns ",(0,p.kt)("inlineCode",{parentName:"p"},"false")," on error.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"PHP ",(0,p.kt)("a",{parentName:"p",href:"http://php.net/manual/en/function.preg-filter.php"},"documentation")," promises that"),(0,p.kt)("blockquote",{parentName:"li"},(0,p.kt)("p",{parentName:"blockquote"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()"))," is identical to ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace()"))," except it only returns the (possibly transformed) subjects...")),(0,p.kt)("p",{parentName:"li"},"but ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()"))," and ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace()"))," actually return ",(0,p.kt)("em",{parentName:"p"},"completely")," different values for ",(0,p.kt)("strong",{parentName:"p"},"the same")," parameters."))),(0,p.kt)("h3",{id:"php-is-deliberately-buggy"},"PHP is Deliberately buggy"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," and ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match-all.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match_all()"))," return either:"),(0,p.kt)("ul",{parentName:"li"},(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"(int) x")," - a number of matches, if a match is found"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"(int) 0")," - if no matches are found"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"(bool) false")," - if a runtime error occurred")),(0,p.kt)("p",{parentName:"li"},"So if you do just this:"),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-php"},"if (preg_match('//', '')) {\n")),(0,p.kt)("p",{parentName:"li"}," there's no way of knowing whether your pattern is ",(0,p.kt)("em",{parentName:"p"},"incorrect")," or whether it's correct, but your subject isn't\nmatched by your pattern. "),(0,p.kt)("p",{parentName:"li"}," You need to ",(0,p.kt)("strong",{parentName:"p"},"remember")," to add an explicit ",(0,p.kt)("inlineCode",{parentName:"p"},"!== false")," check each time you use it.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"All ",(0,p.kt)("inlineCode",{parentName:"p"},"preg_*")," functions only return ",(0,p.kt)("inlineCode",{parentName:"p"},"false"),"/",(0,p.kt)("inlineCode",{parentName:"p"},"null"),"/",(0,p.kt)("inlineCode",{parentName:"p"},"[]")," on error. You have to remember to call ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-last_error.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_last_error()"))," to get\nsome insight in the nature of your error. Of course, it only returns ",(0,p.kt)("inlineCode",{parentName:"p"},"int"),"! So you have to look up that ",(0,p.kt)("inlineCode",{parentName:"p"},"4"),' is\n"invalid utf8 sequence" and ',(0,p.kt)("inlineCode",{parentName:"p"},"2"),' is "backtrack limit exceeded".')),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"However, ",(0,p.kt)("inlineCode",{parentName:"p"},"false"),"-check and ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-last_error.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_last_error()"))," can only save you from runtime errors. So called compile errors don't\nwork that way and require either setting a custom error handler (bad idea) or read and clear just one of those errors\n(good luck with errors in ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace-callback.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_replace_callback()"))," for example).")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()"))," for arrays returns ",(0,p.kt)("inlineCode",{parentName:"p"},"[]")," if an error occurred; even though ",(0,p.kt)("inlineCode",{parentName:"p"},"[]")," is the perfectly valid result for this\nfunction. For example, it could have filtered out all values or its input was an empty array right from the beginning.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"For certain parameter types, some PCRE methods (e.g. ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-filter.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_filter()")),") raise ",(0,p.kt)("strong",{parentName:"p"},"fatal errors")," terminating the application.")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-quote.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_quote()"))," completely ignores whitespace, which should be quoted when used with ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php"},(0,p.kt)("inlineCode",{parentName:"a"},"x")," flag"),"."))),(0,p.kt)("h3",{id:"php-silently-ignores-invalid-arguments"},"PHP silently ignores invalid arguments"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," called with negative offset is simply ignored."),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," called with offset longer than the subject changes nothing, and ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-last_error.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_last_error()"))," returns ",(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/pcre.constants.php"},(0,p.kt)("inlineCode",{parentName:"a"},"PREG_INTERNAL_ERROR"))," code."),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-quote.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_quote()"))," accepts a single character as the second parameter, and simply ignores any longer string.")),(0,p.kt)("h2",{id:"t-regx-showcase"},"T-Regx showcase"),(0,p.kt)("p",null,"That's why T-Regx happened. It addresses ",(0,p.kt)("strong",{parentName:"p"},"all")," of PHP regular expressions flaws."),(0,p.kt)("h3",{id:"t-regx-eliminates-gotchas"},"T-Regx eliminates gotcha's"),(0,p.kt)("p",null,"PHP PCRE API is full of false negatives and false positives. For example, missing group in ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_match()"))," doesn't\nnecessarily mean the group doesn't exist or wasn't matched. It's just a \"gotcha\" set for you by PHP."),(0,p.kt)("p",null,"T-Regx performs all the necessary ",(0,p.kt)("inlineCode",{parentName:"p"},"if"),"ology and checks to verify that methods that return ",(0,p.kt)("inlineCode",{parentName:"p"},"true")," and ",(0,p.kt)("inlineCode",{parentName:"p"},"false")," are really\ntrue or false. If T-Regx can't eliminate false-negatives or false-negatives, its API simply doesn't include a method to verify that."),(0,p.kt)("p",null,"If, because of reasons, there isn't a way to determine something with absolute certainty (like the index of a group with ",(0,p.kt)("inlineCode",{parentName:"p"},"J")," modifier),\nthen T-Regx API simply doesn't have ",(0,p.kt)("inlineCode",{parentName:"p"},"index()")," method for ",(0,p.kt)("inlineCode",{parentName:"p"},"usingDuplicateName().group()"),"."),(0,p.kt)("h3",{id:"t-regx-maps-warnings-and-errors-to-exceptions"},"T-Regx maps warnings and errors to exceptions"),(0,p.kt)("p",null,"If you try to use an invalid regular expression in Java or JavaScript, you would probably get a ",(0,p.kt)("inlineCode",{parentName:"p"},"SyntaxError"),"\nexception, so you'd be forced to handle it. Such things don't happen in PHP regular expressions."),(0,p.kt)("p",null,"T-Regx always throws an exception and never issues any warnings, fatal errors, errors or notices."),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"try {\n    return pattern('Foo')->match('Bar')->all();\n}\ncatch (PatternException $exception) {\n    // handle the error\n}\n")),(0,p.kt)("p",null,"Furthermore, T-Regx throws different exceptions for different errors:"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"SubjectNotMatchedException"),(0,p.kt)("li",{parentName:"ul"},"MalformedPatternException"),(0,p.kt)("li",{parentName:"ul"},"FlagNotAllowedException"),(0,p.kt)("li",{parentName:"ul"},"GroupNotMatchedException"),(0,p.kt)("li",{parentName:"ul"},"NonexistentGroupException"),(0,p.kt)("li",{parentName:"ul"},"InvalidReplacementException"),(0,p.kt)("li",{parentName:"ul"},"InvalidReturnValueException"),(0,p.kt)("li",{parentName:"ul"},"CatastrophicBacktrackingPregException"),(0,p.kt)("li",{parentName:"ul"},"RecursionLimitPregException"),(0,p.kt)("li",{parentName:"ul"},"Utf8OffsetPregException")),(0,p.kt)("p",null,"They all extend ",(0,p.kt)("inlineCode",{parentName:"p"},"PatternException")," though."),(0,p.kt)("p",null,"Further, furthermore, if you pass an invalid data type to any of the T-Regx methods, ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,p.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException"))," is thrown."),(0,p.kt)("h3",{id:"t-regx-is-clean-and-simple"},"T-Regx is clean and simple"),(0,p.kt)("p",null,"You will not find arrays, of arrays, of arrays in T-Regx API. Each functionality has a dedicated set of methods."),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"pattern($pattern)->match($subject)->first(function (Detail $detail) {\n    $detail->offset();           // offset of a matched occurrence\n    $detail->group(2)->offset(); // offset of a matched capturing group\n    $detail->group(-3);          // throws \\InvalidArgumentException\n});\n")),(0,p.kt)("h3",{id:"t-regx-unifies-the-differences-between-matching-and-replacing"},"T-Regx unifies the differences between matching and replacing"),(0,p.kt)("p",null,"Matching"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"pattern($pattern)->match($subject)->first(function (Detail $detail) {\n    $detail->offset();            // exactly the same interface\n    $detail->group(2)->offset();\n    $detail->group(-3);\n});\n")),(0,p.kt)("p",null,"Replacing:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"pattern($pattern)->replace($subject)->first()->callback(function (Detail $detail) {\n    $detail->offset();            // exactly the same interface\n    $detail->group(2)->offset(); \n    $detail->group(-3);\n});\n")),(0,p.kt)("p",null,"Read more about ",(0,p.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,p.kt)("inlineCode",{parentName:"a"},"Detail")),"."),(0,p.kt)("h3",{id:"t-regx-provides-rich-api-for-building-patterns"},"T-Regx provides rich API for building patterns"),(0,p.kt)("p",null,"Because of ",(0,p.kt)("inlineCode",{parentName:"p"},"Pattern::inject()"),", ",(0,p.kt)("inlineCode",{parentName:"p"},"Pattern::list()"),", ",(0,p.kt)("inlineCode",{parentName:"p"},"Pattern::mask()")," and ",(0,p.kt)("inlineCode",{parentName:"p"},"Pattern::template()"),"\nthere is never a need for using ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-quote.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_quote()"))," yourself."),(0,p.kt)("p",null,"For example to build pattern with un-safe data, instead of building pattern with ",(0,p.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-quote.php"},(0,p.kt)("inlineCode",{parentName:"a"},"preg_quote()")),", simply use:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},'Pattern::inject("(My|Our) (dog|cat) names are @ and @!", [$dog, $cat]);\n')),(0,p.kt)("h3",{id:"t-regx-is-really-smart-with-its-exceptions"},"T-Regx is really smart with its exceptions"),(0,p.kt)("p",null,"We really did put a lot of thoughts to make T-Regx secure, so for example these code snippets aren't a big deal:"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->replace($subject)->all()->callback(function (Detail $detail) {\n    try {\n        return pattern('intentionally (( invalid {{ pattern ')->match('Foo')->first();\n    }\n    catch (MalformedPatternException $ex) {\n        // it's all good and dandy\n        // this exception $ex here, won't interfere with the pattern \"outside\"\n        return $detail;\n    }\n});\n")),(0,p.kt)("p",null,"In other words, warnings and flags raised by the inner ",(0,p.kt)("inlineCode",{parentName:"p"},"pattern()->match()")," invalid call will be represented as\n",(0,p.kt)("inlineCode",{parentName:"p"},"MalformedPatternException"),", and won't interfere with the outer ",(0,p.kt)("inlineCode",{parentName:"p"},"pattern()->replace()"),"."))}u.isMDXComponent=!0}}]);