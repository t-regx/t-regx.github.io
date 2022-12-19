"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[394],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=c(r),f=a,d=s["".concat(p,".").concat(f)]||s[f]||m[f]||o;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9714:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],l={title:"Support for PHP 5.3",author:"Daniel Wilkowski",authorFBID:0x5af34da0d14b},p={permalink:"/blog/2018/03/03/php-5.3-support",source:"@site/blog/2018-03-03-php-5.3-support.md",title:"Support for PHP 5.3",description:"Hello there! Another update, this time there's more to it - much has changed.",date:"2018-03-03T00:00:00.000Z",formattedDate:"March 3, 2018",tags:[],readingTime:1.04,truncated:!0,prevItem:{title:"Capturing groups update",permalink:"/blog/2018/09/01/groups"},nextItem:{title:"What's new, new, new!",permalink:"/blog/2017/12/30/delimiters"}},c=[],u={toc:c};function s(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Hello there! Another update, this time there's more to it - much has changed."),(0,o.kt)("p",null,"Here's a quick list:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"ReadMe.md is now more throughout"),(0,o.kt)("li",{parentName:"ul"},"CleanRegex runs on ",(0,o.kt)("a",{parentName:"li",href:"https://travis-ci.org/T-Regx/T-Regx"},"Travis")," and ",(0,o.kt)("a",{parentName:"li",href:"https://coveralls.io/github/T-Regx/T-Regx?branch=master"},"Coveralls")),(0,o.kt)("li",{parentName:"ul"},"The library can now be required using ",(0,o.kt)("a",{href:"https://packagist.org/packages/rawr/t-regx",target:"_blank"},"Composer")),(0,o.kt)("li",{parentName:"ul"},"CleanRegex supports ",(0,o.kt)("inlineCode",{parentName:"li"},"PHP 5.3")),(0,o.kt)("li",{parentName:"ul"},"Handling compile pattern exceptions and runtime pattern exceptions"),(0,o.kt)("li",{parentName:"ul"},"Passing callbacks with detailed object parameters (",(0,o.kt)("inlineCode",{parentName:"li"},"Match")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"ReplaceMatch"),")."),(0,o.kt)("li",{parentName:"ul"},"Add a facade ",(0,o.kt)("inlineCode",{parentName:"li"},"Pattern::of()"))),(0,o.kt)("p",null,"In addition, I'd like to give a quick thanks to Bartek - my friend currently working at Thulium - for a nice suggestion :)"))}s.isMDXComponent=!0}}]);