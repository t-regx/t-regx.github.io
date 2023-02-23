"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7323],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(r),f=i,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(m,l(l({ref:t},s),{},{components:r})):n.createElement(m,l({ref:t},s))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[u]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},92:(e,t,r)=>{r.d(t,{x:()=>c});var n=r(7294),i=r(5558);const a="code_JkvM",l=function(e){var t=e.children,r=e.language;return n.createElement("div",{className:a},n.createElement(i.Z,{className:"language-"+(r||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const o="result_6Tn1",c=function(e){var t=e.text,r=e.children;return n.createElement("div",{className:o},n.createElement(l,{language:t?"text":"php"},r))}},1882:(e,t,r)=>{r.r(t),r.d(t,{default:()=>f,frontMatter:()=>c,metadata:()=>p,toc:()=>s});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),l=r(92),o=["components"],c={id:"split",title:"Split a string",hide_table_of_contents:!0},p={unversionedId:"split",id:"split",isDocsHomePage:!1,title:"Split a string",description:"T-Regx also allows to split a string by regular expression.",source:"@site/../docs/split.mdx",sourceDirName:".",slug:"/split",permalink:"/docs/split",version:"current",lastUpdatedAt:1677178025,formattedLastUpdatedAt:"2/23/2023",frontMatter:{id:"split",title:"Split a string",hide_table_of_contents:!0},sidebar:"docs",previous:{title:"Delimited patterns",permalink:"/docs/delimiters"},next:{title:"Filtering an array",permalink:"/docs/filter"}},s=[{value:"Including the delimiter",id:"including-the-delimiter",children:[]}],u={toc:s},d="wrapper";function f(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)(d,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"T-Regx also allows to split a string by regular expression."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"pattern('[ ,]{2}')->split('Joffrey, Cersei, Ilyn Payne, The Hound');\n")),(0,a.kt)(l.x,{mdxType:"Result"},"['Joffrey', 'Cersei', 'Ilyn Payne', 'The Hound']"),(0,a.kt)("h2",{id:"including-the-delimiter"},"Including the delimiter"),(0,a.kt)("p",null,"To include a delimiter in the results, enclose it with a capturing group."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"pattern('([ ,]{2})')->split('Joffrey, Cersei, Ilyn Payne');\n")),(0,a.kt)(l.x,{mdxType:"Result"},"['Joffrey', ', ', 'Cersei', ', ', 'Ilyn Payne']"))}f.isMDXComponent=!0}}]);