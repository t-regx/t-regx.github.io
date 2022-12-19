"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9864],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(h,i(i({ref:t},s),{},{components:n})):r.createElement(h,i({ref:t},s))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:a,i[1]=p;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6228:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m,frontMatter:()=>p,metadata:()=>l,toc:()=>c});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],p={title:"Release 0.9.13",author:"Daniel Wilkowski"},l={permalink:"/blog/2020/12/08/release-0.9.13",source:"@site/blog/2020-12-08-release-0.9.13.md",title:"Release 0.9.13",description:"Bueno!",date:"2020-12-08T00:00:00.000Z",formattedDate:"December 8, 2020",tags:[],readingTime:.945,truncated:!1,prevItem:{title:"Dark mode",permalink:"/blog/2021/01/24/dark-mode"},nextItem:{title:"Release 0.9.12 Oopsie",permalink:"/blog/2020/11/04/release-0.9.12-oopsie"}},c=[],s={toc:c};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Bueno!"),(0,o.kt)("p",null,"We're making big steps towards PHP 8!"),(0,o.kt)("p",null,"In this release, apart from some cool features, we're deprecating ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")),", since\nPHP8 brings new ",(0,o.kt)("a",{parentName:"p",href:"https://wiki.php.net/rfc/match_expression_v2"},(0,o.kt)("inlineCode",{parentName:"a"},"match"))," keyword, and\non PHP8 ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match"))," is a parse error. Since now, you whould be using ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Detail"))," instead."),(0,o.kt)("p",null,"We're in a process of rewriting our documentation with the changes and suggestions to use ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Detail"))," now."),(0,o.kt)("p",null,"From now on, the first couple of versions include deprecated ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")),", as well\nas new ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Detail")),", so there's some time to update. We'd wish to keep the deprecation\nforever, to keep backwards compatibility but that's impossible! :/ There's an ugly ultimatum."),(0,o.kt)("p",null,"We can either:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Keep ",(0,o.kt)("a",{parentName:"li",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")),", deprecated or not; only on PHP7"),(0,o.kt)("li",{parentName:"ul"},"Run it on PHP8, but without ",(0,o.kt)("a",{parentName:"li",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")))),(0,o.kt)("p",null,"We can't declare ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match"))," for backwards compatibility, because then we couldn't run it on PHP8. So once\nwe start supporting PHP8, we stop supporting deprecated ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")),". We're sorry there's no other way\naround. "),(0,o.kt)("p",null,"In the future, we'll release version ",(0,o.kt)("inlineCode",{parentName:"p"},"0.10.0"),", and it will support PHP8 fully; but there\nwill no longer be ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Match")),", only ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"Detail")),"."),(0,o.kt)("p",null,"As always, everything is described in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/blob/develop/ChangeLog.md"},"ChangeLog.md")," on GitHub."))}m.isMDXComponent=!0}}]);