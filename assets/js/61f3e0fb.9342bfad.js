"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3498],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},h="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=p(a),u=r,d=h["".concat(s,".").concat(u)]||h[u]||m[u]||i;return a?n.createElement(d,o(o({ref:t},c),{},{components:a})):n.createElement(d,o({ref:t},c))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[h]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},417:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),o=["components"],l={title:"Release 0.9.7 - Match as vanilla array!",author:"Daniel Wilkowski",authorFBID:0x5af34da0d14b},s={permalink:"/blog/2020/04/08/release-0.9.7",source:"@site/blog/2020-04-08-release-0.9.7.md",title:"Release 0.9.7 - Match as vanilla array!",description:"There was a lot of changes in the code, so I reckon we could release twice in the same week, because why not :)",date:"2020-04-08T00:00:00.000Z",formattedDate:"April 8, 2020",tags:[],readingTime:1.755,truncated:!1,prevItem:{title:"Release 0.9.8 - foreach baby, foreach!",permalink:"/blog/2020/04/13/release-0.9.8"},nextItem:{title:"Release 0.9.6 - First/all changes!",permalink:"/blog/2020/04/02/release-0.9.6"}},p=[{value:"The concept",id:"the-concept",children:[]},{value:"The idea",id:"the-idea",children:[]},{value:"The solution",id:"the-solution",children:[]}],c={toc:p};function h(e){var t=e.components,a=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"There was a lot of changes in the code, so I reckon we could release twice in the same week, because why not :)"),(0,i.kt)("p",null,"So what are the changes?"),(0,i.kt)("p",null,"Bare with me."),(0,i.kt)("h3",{id:"the-concept"},"The concept"),(0,i.kt)("p",null,"Capturing groups in T-Regx have a really rich API (probably the richest out there), with a lot of variables.\nMost importantly T-Regx handles:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Invalid groups")," (e.g. negative index ",(0,i.kt)("inlineCode",{parentName:"li"},"-1")," or malformed group ",(0,i.kt)("inlineCode",{parentName:"li"},"!@#$"),"), which always throw exception"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Missing groups")," (e.g. group ",(0,i.kt)("inlineCode",{parentName:"li"},"4")," used in pattern, that only has 2 groups; same for named) which conditionally throws exceptions"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Optional groups")," (e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},"(origin/)?master"),"), which is really tricky to distinguish with PCRE"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Matched groups")," (which can be tricky, if the matched group is an empty string ",(0,i.kt)("inlineCode",{parentName:"li"},'""'),")")),(0,i.kt)("p",null,"Because of that, syntax of groups is not the shortest:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pattern('(origin/)?master')->match('master')->first(function (Match $match) {\n    $match->group(1)->text(); // for example\n});\n")),(0,i.kt)("p",null,"But we know that T-Regx users mostly care about the last group, ",(0,i.kt)("strong",{parentName:"p"},"Matched groups"),", so they would like to use them\nwith as simple syntax as possible. That makes sense."),(0,i.kt)("h3",{id:"the-idea"},"The idea"),(0,i.kt)("p",null,"At first, there was an idea of ",(0,i.kt)("a",{parentName:"p",href:"/docs/match"},(0,i.kt)("inlineCode",{parentName:"a"},"Match"))," details implementing ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.arrayaccess.php"},(0,i.kt)("inlineCode",{parentName:"a"},"\\ArrayAccess")),", so this syntax would be possible:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pattern('(origin/)?master')->match('master')->first(function (Match $match) {\n    $match[1]; // same as above\n});\n")),(0,i.kt)("p",null,"Well, that syntax does look good, at first, but it comes at a price. A high price."),(0,i.kt)("p",null,"Why we ditched the ",(0,i.kt)("inlineCode",{parentName:"p"},"\\ArrayAccess")," idea:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Unnecessary ",(0,i.kt)("inlineCode",{parentName:"li"},"set")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"unset")," methods"),(0,i.kt)("li",{parentName:"ul"},"Methods that work for arrays (",(0,i.kt)("inlineCode",{parentName:"li"},"array_key_exist()"),") won't work with ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/class.arrayaccess.php"},(0,i.kt)("inlineCode",{parentName:"a"},"\\ArrayAccess"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"empty($match[1])")," returns ",(0,i.kt)("inlineCode",{parentName:"li"},"true"),", even if the group ",(0,i.kt)("inlineCode",{parentName:"li"},"1")," was matched (",(0,i.kt)("inlineCode",{parentName:"li"},'""')," and ",(0,i.kt)("inlineCode",{parentName:"li"},'"0"')," ",(0,i.kt)("strong",{parentName:"li"},"yes")," is falsy)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"isset($match[-2])")," couldn't throw an exception for a malformed group"),(0,i.kt)("li",{parentName:"ul"},"There's a bug in PHP, that causes ",(0,i.kt)("inlineCode",{parentName:"li"},"$match['100']")," to be treated as ",(0,i.kt)("inlineCode",{parentName:"li"},"$match[100]")," (cast to ",(0,i.kt)("inlineCode",{parentName:"li"},"int")," any numeric value).")),(0,i.kt)("h3",{id:"the-solution"},"The solution"),(0,i.kt)("p",null,"So, instead, we got an idea: What if ",(0,i.kt)("inlineCode",{parentName:"p"},"$match")," was a real PHP ",(0,i.kt)("inlineCode",{parentName:"p"},"array"),". Every method or notation that works\nfor arrays, will also work."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pattern('(origin/)?master')->match('master')->asArray()->first(function (array $match) {\n    $match[1]; // same as above\n});\n")),(0,i.kt)("p",null,"The structure of the array is perfectly identical to what ",(0,i.kt)("inlineCode",{parentName:"p"},"preg_match()")," would return :)"))}h.isMDXComponent=!0}}]);