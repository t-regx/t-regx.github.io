"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2546],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=c(n),u=r,h=m["".concat(p,".").concat(u)]||m[u]||d[u]||i;return n?a.createElement(h,l(l({ref:t},s),{},{components:n})):a.createElement(h,l({ref:t},s))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},92:(e,t,n)=>{n.d(t,{x:()=>p});var a=n(7294),r=n(5558);const i="code_JkvM",l=function(e){var t=e.children,n=e.language;return a.createElement("div",{className:i},a.createElement(r.Z,{className:"language-"+(n||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const o="result_6Tn1",p=function(e){var t=e.text,n=e.children;return a.createElement("div",{className:o},a.createElement(l,{language:t?"text":"php"},n))}},1208:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m,frontMatter:()=>p,metadata:()=>c,toc:()=>s});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=n(92),o=["components"],p={id:"replace-with",title:"Replace with a constant value"},c={unversionedId:"replace-with",id:"replace-with",isDocsHomePage:!1,title:"Replace with a constant value",description:"After replace(), you need to explicitly use one of [first()]/[all()]/[only(int)] methods, to express how many",source:"@site/../docs/replace-with.mdx",sourceDirName:".",slug:"/replace-with",permalink:"/docs/replace-with",version:"current",lastUpdatedAt:1667301196,formattedLastUpdatedAt:"11/1/2022",frontMatter:{id:"replace-with",title:"Replace with a constant value"},sidebar:"docs",previous:{title:"Replacing a string",permalink:"/docs/replace"},next:{title:"Replace with callback",permalink:"/docs/replace-callback"}},s=[{value:"Limits",id:"limits",children:[{value:"First occurrence - first()",id:"first-occurrence---first",children:[]},{value:"All occurrences - <code>all()</code>",id:"all-occurrences---all",children:[]},{value:"Limited occurrences - <code>only()</code>",id:"limited-occurrences---only",children:[]}]},{value:"Regular expression references",id:"regular-expression-references",children:[]},{value:"PHP-style intentional references",id:"php-style-intentional-references",children:[]},{value:"Remove occurrence",id:"remove-occurrence",children:[]}],d={toc:s};function m(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"After ",(0,i.kt)("inlineCode",{parentName:"p"},"replace()"),", you need to explicitly use one of ",(0,i.kt)("a",{parentName:"p",href:"/docs/match-first"},(0,i.kt)("inlineCode",{parentName:"a"},"first()")),"/",(0,i.kt)("a",{parentName:"p",href:"/docs/match#many"},(0,i.kt)("inlineCode",{parentName:"a"},"all()")),"/",(0,i.kt)("a",{parentName:"p",href:"/docs/match#many"},(0,i.kt)("inlineCode",{parentName:"a"},"only(int)"))," methods, to express how many\nreplacements should be done."),(0,i.kt)("p",null,"Specifying limits is done to relieve you from ",(0,i.kt)("a",{parentName:"p",href:"/docs/overview#brain-strain"},(0,i.kt)("strong",{parentName:"a"},"brain strain"))," - so you can immediately\nrecognize author's intentions."),(0,i.kt)("h2",{id:"limits"},"Limits"),(0,i.kt)("p",null,"Using ",(0,i.kt)("a",{parentName:"p",href:"/docs/match-first"},(0,i.kt)("inlineCode",{parentName:"a"},"first()")),"/",(0,i.kt)("a",{parentName:"p",href:"/docs/match#many"},(0,i.kt)("inlineCode",{parentName:"a"},"all()")),"/",(0,i.kt)("a",{parentName:"p",href:"/docs/match#many"},(0,i.kt)("inlineCode",{parentName:"a"},"only(int)"))," is semantically identical to passing ",(0,i.kt)("inlineCode",{parentName:"p"},"$limit")," argument to\n",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()")),"/",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace-callback.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace_callback()")),"."),(0,i.kt)("h3",{id:"first-occurrence---first"},"First occurrence - ",(0,i.kt)("a",{parentName:"h3",href:"/docs/match-first"},(0,i.kt)("inlineCode",{parentName:"a"},"first()"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\npattern('[A-Z][a-z]+')->replace($subject)->first()->with('___');\n")),(0,i.kt)(l.x,{mdxType:"Result"},"'I like scandinavia: ___, Norway and Denmark'"),(0,i.kt)("h3",{id:"all-occurrences---all"},"All occurrences - ",(0,i.kt)("inlineCode",{parentName:"h3"},"all()")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\npattern('[A-Z][a-z]+')->replace($subject)->all()->with('___');\n")),(0,i.kt)(l.x,{mdxType:"Result"},"'I like scandinavia: ___, ___ and ___'"),(0,i.kt)("h3",{id:"limited-occurrences---only"},"Limited occurrences - ",(0,i.kt)("inlineCode",{parentName:"h3"},"only()")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\npattern('[A-Z][a-z]+')->replace($subject)->only(2)->with('___');\n")),(0,i.kt)(l.x,{mdxType:"Result"},"'I like scandinavia: ___, ___ and Denmark'"),(0,i.kt)("p",null,"Read on, to learn more about replacing with ",(0,i.kt)("a",{parentName:"p",href:"/docs/replace-callback"},"a callback"),"."),(0,i.kt)("h2",{id:"regular-expression-references"},"Regular expression references"),(0,i.kt)("p",null,"Normally, had you passed a replacement to ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()")),", that contains a backslash or a dollar sign followed by a\nnumber (eg. ",(0,i.kt)("inlineCode",{parentName:"p"},"\\1")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"$2"),") - that reference would be replaced by a corresponding capturing group (or by an empty string,\nif the group wasn't matched)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"preg::replace('/(\\d+)cm/', '<$1>', 'I have 15cm and 192cm');\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"I have <15> and <192>\n")),(0,i.kt)("p",null,"Resolving such references won't happen using ",(0,i.kt)("inlineCode",{parentName:"p"},"with()"),"."),(0,i.kt)("p",null,"This is done to relieve you from the ",(0,i.kt)("a",{parentName:"p",href:"/docs/overview#brain-strain"},(0,i.kt)("strong",{parentName:"a"},"brain strain")),". A programmer should be able to merely\nreplace a string with a constant value without ",(0,i.kt)("a",{parentName:"p",href:"/docs/overview#brain-strain"},"cognitive load")," about possible ",(0,i.kt)("inlineCode",{parentName:"p"},"\\")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"$")," hiding somewhere."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"pattern('(\\d+)cm')->replace('I have 15cm and 192cm')->all()->with('<$1>');\n")),(0,i.kt)(l.x,{text:!0,mdxType:"Result"},"I have <$1> and <$1>"),(0,i.kt)("p",null,"You can be sure, what's put into ",(0,i.kt)("inlineCode",{parentName:"p"},"with()")," will certainly be present unchanged in your final result."),(0,i.kt)("p",null,"Some replacement strings containing a backslash or a dollar sign (like file system paths, URL addresses or even user input)\nmight interfere with logic and cause bugs that are very hard to find."),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Neither of types of references are resolved: ",(0,i.kt)("inlineCode",{parentName:"p"},"$12"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"\\12")," nor ",(0,i.kt)("inlineCode",{parentName:"p"},"${12}"),"."))),(0,i.kt)("h2",{id:"php-style-intentional-references"},"PHP-style intentional references"),(0,i.kt)("p",null,"If you, however, would like to intentionally use regular expression references and have validated your input\nagainst ",(0,i.kt)("em",{parentName:"p"},"an unexpected")," ",(0,i.kt)("inlineCode",{parentName:"p"},"\\")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"$")," - feel free to use ",(0,i.kt)("inlineCode",{parentName:"p"},"withReferences()")," which ",(0,i.kt)("strong",{parentName:"p"},"will")," resolve replacement references."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"pattern('(\\d+)cm')->replace('I have 15cm and 192cm')->all()->withReferences('<$1>');\n")),(0,i.kt)(l.x,{text:!0,mdxType:"Result"},"I have <15> and <192>"),(0,i.kt)("p",null,"However, this is not recommended. For that, try using ",(0,i.kt)("a",{parentName:"p",href:"/docs/replace-callback"},(0,i.kt)("inlineCode",{parentName:"a"},"replace()->callback()")),"."),(0,i.kt)("p",null,"The only valid use-cases for ",(0,i.kt)("inlineCode",{parentName:"p"},"withReferences()")," is:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Performance (since ",(0,i.kt)("inlineCode",{parentName:"li"},"withReferences()")," uses ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()")),", and not ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace-callback.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace_callback()")),")"),(0,i.kt)("li",{parentName:"ul"},"Migration from ",(0,i.kt)("inlineCode",{parentName:"li"},"preg_replace()")," used in legacy codebase")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Using ",(0,i.kt)("inlineCode",{parentName:"p"},"withReferences()")," is not recommended, since it exposes part of PHP regexps API, and\nisn't actually part of T-Regx. Instead, try using ",(0,i.kt)("inlineCode",{parentName:"p"},"with()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"callback()"),"."),(0,i.kt)("p",{parentName:"div"},"We don't encourage its usage, but we're keeping it nonetheless, to allow users to decide for\nthemselves whether they want to use T-Regx API, or stay with PHP replace style."))),(0,i.kt)("h2",{id:"remove-occurrence"},"Remove occurrence"),(0,i.kt)("p",null,"There are times when you'd like to simply remove the occurrence of a pattern from your subject. To do that,\nuse ",(0,i.kt)("inlineCode",{parentName:"p"},"pattern()->prune()")," instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"pattern()->replace()"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"pattern('[cm]m')->prune('I have 15cm and 192cm');\n")),(0,i.kt)(l.x,{text:!0,mdxType:"Result"},"I have 15 and 192"),(0,i.kt)("p",null,"It's actually identical to calling ",(0,i.kt)("inlineCode",{parentName:"p"},"replace()->with('')")," under the hood, but it's a bit shorter and more expressive."))}m.isMDXComponent=!0}}]);