"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2243],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(r),f=o,d=m["".concat(c,".").concat(f)]||m[f]||s[f]||a;return r?n.createElement(d,l(l({ref:t},u),{},{components:r})):n.createElement(d,l({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8886:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),l=["components"],i={title:"Dark mode",author:"Daniel Wilkowski"},c={permalink:"/blog/2021/01/24/dark-mode",source:"@site/blog/2021-01-24-dark-mode.md",title:"Dark mode",description:"Heey!",date:"2021-01-24T00:00:00.000Z",formattedDate:"January 24, 2021",tags:[],readingTime:.26,truncated:!1,prevItem:{title:"Formats and expectations!",permalink:"/blog/2021/01/27/release-0.9.14"},nextItem:{title:"Release 0.9.13",permalink:"/blog/2020/12/08/release-0.9.13"}},p=[],u={toc:p};function s(e){var t=e.components,r=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Heey!"),(0,a.kt)("p",null,"We added dark mode to the documentation page, which we know is sexy right now."),(0,a.kt)("p",null,"We also updated a bunch of documentation pages, and there's more on the way."),(0,a.kt)("p",null,"We'll try to make the documentation as rich as possible, before we split the releases\nof T-Regx into PHP7 and PHP8 versions."))}s.isMDXComponent=!0}}]);