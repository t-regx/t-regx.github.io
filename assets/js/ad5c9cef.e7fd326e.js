"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2566],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>h});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),c=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=c(r),d=n,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||o;return r?a.createElement(h,i(i({ref:t},s),{},{components:r})):a.createElement(h,i({ref:t},s))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[m]="string"==typeof e?e:n,i[1]=p;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},92:(e,t,r)=>{r.d(t,{x:()=>l});var a=r(7294),n=r(5558);const o="code_JkvM",i=function(e){var t=e.children,r=e.language;return a.createElement("div",{className:o},a.createElement(n.Z,{className:"language-"+(r||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const p="result_6Tn1",l=function(e){var t=e.text,r=e.children;return a.createElement("div",{className:p},a.createElement(i,{language:t?"text":"php"},r))}},3904:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d,frontMatter:()=>l,metadata:()=>c,toc:()=>s});var a=r(7462),n=r(3366),o=(r(7294),r(3905)),i=r(92),p=["components"],l={id:"match-iterator",title:"Iterator"},c={unversionedId:"match-iterator",id:"match-iterator",isDocsHomePage:!1,title:"Iterator",description:"T-Regx uses vanilla PHP [\\Iterator] with standard methods:",source:"@site/../docs/match-iterator.mdx",sourceDirName:".",slug:"/match-iterator",permalink:"/docs/match-iterator",version:"current",lastUpdatedAt:1676220528,formattedLastUpdatedAt:"2/12/2023",frontMatter:{id:"match-iterator",title:"Iterator"},sidebar:"docs",previous:{title:"Filtering an array",permalink:"/docs/filter"},next:{title:"Exception structure",permalink:"/docs/exception-structure"}},s=[{value:"Iterator to array",id:"iterator-to-array",children:[]}],m={toc:s},u="wrapper";function d(e){var t=e.components,r=(0,n.Z)(e,p);return(0,o.kt)(u,(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"T-Regx uses vanilla PHP ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.iterator.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\Iterator"))," with standard methods:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"current()")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"key(): scalar")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"next(): void")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"rewind(): void")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"valid(): bool"))),(0,o.kt)("h2",{id:"iterator-to-array"},"Iterator to array"),(0,o.kt)("p",null,"Method ",(0,o.kt)("inlineCode",{parentName:"p"},"match()->getIterator()")," returns an implementation of PHP ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.iterator.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\Iterator"))," which you can be used with other ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.iterator.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\Iterator")),"\nmethods or within your own code, for example PHP methods ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.iterator-to-array.php"},(0,o.kt)("inlineCode",{parentName:"a"},"iterator_to_array()"))," and ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/function.iterator-count.php"},(0,o.kt)("inlineCode",{parentName:"a"},"iterator_count()")),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"$matcher = pattern('\\w+')->match('Apples are cool');\n$iterator = $matcher->getIterator();\n\n/**\n * @var Detail $detail\n */\n$detail = $iterator->current();\n\nreturn $detail->text();\n")),(0,o.kt)(i.x,{mdxType:"Result"},"'Apples'"),(0,o.kt)("p",null,"It is useful with methods that only accept ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.iterator.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\Iterator")),", and when an explicit iterator is needed. Using ",(0,o.kt)("inlineCode",{parentName:"p"},"match()->getIterator()"),"\nfor methods that accept ",(0,o.kt)("inlineCode",{parentName:"p"},"array")," is redundant :)"),(0,o.kt)("p",null,"Also, please keep in mind that ",(0,o.kt)("a",{parentName:"p",href:"/docs/match"},(0,o.kt)("inlineCode",{parentName:"a"},"match()"))," and other entities (such as ",(0,o.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,o.kt)("inlineCode",{parentName:"a"},"match()->group(string|int)"))," or ",(0,o.kt)("a",{parentName:"p",href:"/docs/match-as-int"},(0,o.kt)("inlineCode",{parentName:"a"},"match()->asInt()")),")\nare also ",(0,o.kt)("a",{parentName:"p",href:"/docs/match-for-each#vanilla-php-foreach"},"iterable with ",(0,o.kt)("inlineCode",{parentName:"a"},"foreach")),", making explicit usage of ",(0,o.kt)("inlineCode",{parentName:"p"},"getIterator()")," even less likely."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"$pattern = pattern('\\w+');\n\n/**\n * @var Detail $match\n */\nforeach ($pattern->match('Apples are cool') as $match) {\n    $text = $match->text();\n}\n")))}d.isMDXComponent=!0}}]);