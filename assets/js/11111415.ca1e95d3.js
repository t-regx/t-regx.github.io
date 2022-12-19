"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2655],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(r),d=a,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||i;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2375:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>s});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={title:"Templates and builders",author:"Daniel Wilkowski"},p={permalink:"/blog/2021/05/11/release-0.11.0",source:"@site/blog/2021-05-11-release-0.11.0.md",title:"Templates and builders",description:"Rawwrrrr!",date:"2021-05-11T00:00:00.000Z",formattedDate:"May 11, 2021",tags:[],readingTime:.705,truncated:!1,prevItem:{title:"Announcement - Prepared patterns simplification",permalink:"/blog/2021/07/10/simplification-of-prepared-patterns"},nextItem:{title:"Implicit all() in replace()",permalink:"/blog/2021/03/06/release-0.10.2"}},s=[],c={toc:s};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Rawwrrrr!"),(0,i.kt)("p",null,"We've release T-Regx ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/releases/tag/v0.11.0"},"0.11.0"),"."),(0,i.kt)("p",null,"This is more of a maintenance release, most of our development time is hovering around ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/issues/91"},"inject #91"),"\nissue, and that's quite a heavy feature, requiring us to in fact rewrite our Prepared Patterns completely, and use our dedicated\nregular expressions parser. None of the parsers available on the internet matched our needs. It will probably be released as T-Regx 1.0,\nbecause it introduces too much breaking changes. ",(0,i.kt)("em",{parentName:"p"},"(Actually it was realeased as ",(0,i.kt)("a",{parentName:"em",href:"https://github.com/T-Regx/T-Regx/releases/tag/v0.12.0"},"0.12.0"),")")),(0,i.kt)("p",null,"Another time-consuming thing is ",(0,i.kt)("a",{parentName:"p",href:"https://t-regx.com/"},"t-regx.com")," website being rewritten from scratch, you can expect it in a few months."),(0,i.kt)("p",null,"In this release, we simplified ",(0,i.kt)("inlineCode",{parentName:"p"},"PatternBuilder")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),", simplified ",(0,i.kt)("inlineCode",{parentName:"p"},"template()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"mask()")," methods, unified\n",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"PatternImpl"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"PatternInterface")," into one being, and we added ",(0,i.kt)("inlineCode",{parentName:"p"},"Pcre")," version helper."),(0,i.kt)("p",null,"As of the release, as always, everything is described in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/blob/develop/ChangeLog.md"},"ChangeLog.md")," on github."))}m.isMDXComponent=!0}}]);