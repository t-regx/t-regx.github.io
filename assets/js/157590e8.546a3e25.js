"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4967],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),m=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),c=m(n),d=r,k=c["".concat(o,".").concat(d)]||c[d]||u[d]||i;return n?a.createElement(k,l(l({ref:t},s),{},{components:n})):a.createElement(k,l({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var m=2;m<i;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5974:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u,frontMatter:()=>p,metadata:()=>o,toc:()=>m});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"overview",title:"What's T-Regx?"},o={unversionedId:"overview",id:"overview",isDocsHomePage:!1,title:"What's T-Regx?",description:"T-Regx (T-Rex and RegExp) is a lightweight, high-level Regular Expressions library.",source:"@site/../docs/overview.mdx",sourceDirName:".",slug:"/overview",permalink:"/docs/overview",version:"current",lastUpdatedAt:1665421163,formattedLastUpdatedAt:"10/10/2022",frontMatter:{id:"overview",title:"What's T-Regx?"},sidebar:"docs",next:{title:"Installation",permalink:"/docs/installation"}},m=[{value:"PHP&#39;s magic values",id:"phps-magic-values",children:[]}],s={toc:m};function u(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"T-Regx (",(0,i.kt)("em",{parentName:"p"},"T-Rex and RegExp"),") is a lightweight, high-level Regular Expressions library."),(0,i.kt)("p",null,"Its main features are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Standard")," or ",(0,i.kt)("strong",{parentName:"p"},"new")," functions:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"You can stay with known ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_match()")),", ",(0,i.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()"))," functions (but safe)"),(0,i.kt)("li",{parentName:"ul"},"You can use the new ",(0,i.kt)("a",{parentName:"li",href:"/docs/introduction-clean#entry-points"},(0,i.kt)("inlineCode",{parentName:"a"},"pattern()"))," function"),(0,i.kt)("li",{parentName:"ul"},"You can use either; you can use both; you can interchange them"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"API:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/delimiters"},"Automatic delimiters")," for your patterns"),(0,i.kt)("li",{parentName:"ul"},"UTF-8 support out of the box"),(0,i.kt)("li",{parentName:"ul"},"Unifying differences between matching, replacing, splitting into one interface: ",(0,i.kt)("a",{parentName:"li",href:"/docs/match"},(0,i.kt)("inlineCode",{parentName:"a"},"Detail"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/prepared-patterns"},"Prepared Patterns")," handling unsafe characters (e.g. user input)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Removing headaches of PHP:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"You only use ",(0,i.kt)("inlineCode",{parentName:"p"},"try"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"catch"),"."),(0,i.kt)("p",{parentName:"li"},"T-Regx is doing all the complex ",(0,i.kt)("inlineCode",{parentName:"p"},"if"),"ology around ",(0,i.kt)("inlineCode",{parentName:"p"},"preg")," under the hood, to unify all PHP corner-cases and map them to\nexceptions (see ",(0,i.kt)("a",{parentName:"p",href:"/comparison"},'"Comparison"'),").")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"All ",(0,i.kt)("strong",{parentName:"p"},"false positives")," and ",(0,i.kt)("strong",{parentName:"p"},"false negatives")," are handled")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If anything - Exceptions!:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Magic values (like ",(0,i.kt)("inlineCode",{parentName:"li"},"null"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"false"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"''"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"[]"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"-1"),") aren't used -> Exceptions"),(0,i.kt)("li",{parentName:"ul"},"Handles every ",(0,i.kt)("inlineCode",{parentName:"li"},"warning"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"error"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"fatal error"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"notice")," -> Exception"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"preg_last_error()")," isn't required to verify errors -> Exception"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"errors"),"/bugs/",(0,i.kt)("inlineCode",{parentName:"li"},"gotcha's")," aren't silently ignored -> Exception"),(0,i.kt)("li",{parentName:"ul"},"supplied invalid arguments aren't silently ignored -> Exception"),(0,i.kt)("li",{parentName:"ul"},"returned invalid values aren't silently ignored -> Exception")))),(0,i.kt)("p",null,"Additionally:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Each function obeys SRP"),(0,i.kt)("li",{parentName:"ul"},"Functionalities are represented with ",(0,i.kt)("inlineCode",{parentName:"li"},"methods()")," (not ",(0,i.kt)("inlineCode",{parentName:"li"},"FLAGS")," or arguments)"),(0,i.kt)("li",{parentName:"ul"},"No default ",(0,i.kt)("inlineCode",{parentName:"li"},"parameters=null")),(0,i.kt)("li",{parentName:"ul"},"No ",(0,i.kt)("inlineCode",{parentName:"li"},"PREG_FLAGS, 1")),(0,i.kt)("li",{parentName:"ul"},"No ",(0,i.kt)("inlineCode",{parentName:"li"},"varargs..."))),(0,i.kt)("h2",{id:"phps-magic-values"},"PHP's magic values"),(0,i.kt)("p",null,"In vanilla PHP, different methods (",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_match()")),", ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()")),", ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-split.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_split()")),", etc.) return different types and\nvalues, that are ",(0,i.kt)("em",{parentName:"p"},"symbolic"),". For some it's ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," or ",(0,i.kt)("inlineCode",{parentName:"p"},'""'),", for other ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," for others it's ",(0,i.kt)("inlineCode",{parentName:"p"},"-1"),' - they\'re all\nsupposed to mean "error". For example, ',(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-match.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_match()"))," returns ",(0,i.kt)("inlineCode",{parentName:"p"},"false")," on error, but ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.preg-replace.php"},(0,i.kt)("inlineCode",{parentName:"a"},"preg_replace()"))," returns ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," on error."),(0,i.kt)("p",null,"Of course, you have to remember which is ",(0,i.kt)("inlineCode",{parentName:"p"},"=== false")," and which ",(0,i.kt)("inlineCode",{parentName:"p"},"=== null"),"."),(0,i.kt)("p",null,"T-Regx will ",(0,i.kt)("strong",{parentName:"p"},"never")," return ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"false")," an empty array or other ",(0,i.kt)("em",{parentName:"p"},"magic")," value. ",(0,i.kt)("inlineCode",{parentName:"p"},"MalformedPatternException")," is thrown if ",(0,i.kt)("inlineCode",{parentName:"p"},"$pattern")," is malformed."),(0,i.kt)("p",null,"And it's not just the return values, ",(0,i.kt)("inlineCode",{parentName:"p"},"$match")," results also contain magic values like ",(0,i.kt)("inlineCode",{parentName:"p"},'""')," which can either mean\nthe group wasn't matched, or it matched an empty string in PHP. In SafeRegex the false negative is left as it is, we don't change\nthe API to allow simple migration of ",(0,i.kt)("inlineCode",{parentName:"p"},"preg_match()")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"preg::match()"),"."),(0,i.kt)("p",null,"In CleanRegex this is handled, so you don't have to worry about it - ",(0,i.kt)("inlineCode",{parentName:"p"},'""')," always means an empty string."))}u.isMDXComponent=!0}}]);