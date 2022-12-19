"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7555],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,h=c["".concat(o,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[c]="string"==typeof e?e:r,l[1]=p;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9690:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c,frontMatter:()=>p,metadata:()=>o,toc:()=>s});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],p={id:"introduction",title:"Introduction to T-Regx"},o={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction to T-Regx",description:"Documentation for version: 0.39.0",source:"@site/../docs/introduction.mdx",sourceDirName:".",slug:"/introduction",permalink:"/docs/introduction",version:"current",lastUpdatedAt:1671448734,formattedLastUpdatedAt:"12/19/2022",frontMatter:{id:"introduction",title:"Introduction to T-Regx"},sidebar:"docs",previous:{title:"Installation",permalink:"/docs/installation"},next:{title:"Summary of preg methods",permalink:"/docs/introduction-preg"}},s=[{value:"Entry points",id:"entry-points",children:[{value:"Standard pattern",id:"standard-pattern",children:[]},{value:"T-Regx prepared patterns",id:"t-regx-prepared-patterns",children:[]},{value:"Pattern lists in T-Regx",id:"pattern-lists-in-t-regx",children:[]}]},{value:"Deliberate delimiters",id:"deliberate-delimiters",children:[{value:"Compatibility patterns",id:"compatibility-patterns",children:[]}]}],d={toc:s};function c(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Documentation for version: 0.39.0"),(0,i.kt)("p",null,"T-Regx provides clean API for regular expressions, as well as solving more complicated\nissues with PHP regex (like eliminating false positives, validating groups) and including\nfeatures utterly missing in PHP: Prepared patterns, pattern lists, built-in alteration\nand more, as well as removing uncertainty with false negatives and false positives."),(0,i.kt)("h2",{id:"entry-points"},"Entry points"),(0,i.kt)("p",null,"We have multiple entry methods to create ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),", each with its own use case:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Standard pattern - ",(0,i.kt)("inlineCode",{parentName:"li"},"Pattern::of('\\d+')")),(0,i.kt)("li",{parentName:"ul"},"Prepared patterns - to safely use user input in patterns (see ",(0,i.kt)("a",{parentName:"li",href:"/docs/prepared-patterns"},"Prepared Patterns"),")"),(0,i.kt)("li",{parentName:"ul"},"Pattern lists - ",(0,i.kt)("inlineCode",{parentName:"li"},"Pattern::list(['\\d+', '[a-z]+'])")," to use many patterns at once"),(0,i.kt)("li",{parentName:"ul"},"Literal string value - ",(0,i.kt)("inlineCode",{parentName:"li"},"Pattern::literal('[]?')")," (identical to ",(0,i.kt)("inlineCode",{parentName:"li"},"Pattern::of('\\[\\]\\?')"),")")),(0,i.kt)("p",null,"Additionally, compatibility API remains available, which accepts delimiters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Compatibility legacy - ",(0,i.kt)("inlineCode",{parentName:"li"},"PcrePattern::of('/\\d+/m')")," to use vanilla patterns")),(0,i.kt)("p",null,"Additionally, helper ",(0,i.kt)("inlineCode",{parentName:"p"},"pattern()")," is available as a shorthand for ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::of()"),"."),(0,i.kt)("h3",{id:"standard-pattern"},"Standard pattern"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\CleanRegex\\Pattern;\n \nPattern::of('[A-Z][a-z]+')->test($subject);\n")),(0,i.kt)("p",null,"Additionally, as a convenience method, ",(0,i.kt)("inlineCode",{parentName:"p"},"pattern()")," global function is just an alias for ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::of()"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"pattern('/[A-Z]#[a-z]+')->test($subject);\n")),(0,i.kt)("h3",{id:"t-regx-prepared-patterns"},"T-Regx prepared patterns"),(0,i.kt)("p",null,"With ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::inject()"),", placeholder ",(0,i.kt)("inlineCode",{parentName:"p"},"@")," is being bound the figures passed as the second argument of ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::inject()"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\CleanRegex\\Pattern;\n\n/**\n * Example of prepared patterns\n */\n$pattern = Pattern::inject('^\\d+:@$', [$_GET['user']]);\n\n/**\n * Test your pattern against subject \"14:mark\"\n */\n$pattern->test('14:mark'); // true, if $_GET['user'] == 'mark'\n")),(0,i.kt)("p",null,"You can learn more about prepared patterns in ",(0,i.kt)("a",{parentName:"p",href:"/docs/prepared-patterns"},"Prepared Patterns"),"."),(0,i.kt)("h3",{id:"pattern-lists-in-t-regx"},"Pattern lists in T-Regx"),(0,i.kt)("p",null,"Using ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::list()")," results an instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"PatternList"),", which contains the list of the patterns.\n",(0,i.kt)("inlineCode",{parentName:"p"},"PatternList")," exposes multiple methods which act on the list of patterns. It is preferable to call\n",(0,i.kt)("inlineCode",{parentName:"p"},"PatternList.testAny()")," instead of calling ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern.test()")," in a loop, since ",(0,i.kt)("inlineCode",{parentName:"p"},"PatterList")," will use\nperformance optimisations."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"<?php\n\n/**\n * @var PatternList $patternList\n */\n$patternList = Pattern::list([\n    '\\d+',\n    '[a-z]+'\n]);\n\n/**\n * Check if any of the pattern matches the subject\n */\n$patternList->testAny($_GET['input']);\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Pattern:list()")," also accepts instances of ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),". Any T-Regx method that instantiates ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),"\ncan be used with ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::list()"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"<?php\n\n/**\n * @var PatternList $patternList\n */\n$patternList = Pattern::list([\n    '\\d+',\n    Pattern::of('\\d+'),\n    Pattern::inject(':?@', ['value']),\n    PcrePattern::of('/[a-z]+/')\n]);\n")),(0,i.kt)("p",null,"Passing ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," into ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::list()")," is the same as passing that very same string in ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::of()")," before\nadding it to the list."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"PatternList")," cannot contain other instances of ",(0,i.kt)("inlineCode",{parentName:"p"},"PatternList"),"."),(0,i.kt)("p",null,"You can learn more about ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::list()")," in ",(0,i.kt)("a",{parentName:"p",href:"/docs/pattern-list"},"Multiple patterns"),"."),(0,i.kt)("h2",{id:"deliberate-delimiters"},"Deliberate delimiters"),(0,i.kt)("p",null,"If ",(0,i.kt)("inlineCode",{parentName:"p"},"pattern()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::of()")," is used with a delimited pattern, then characters ",(0,i.kt)("inlineCode",{parentName:"p"},'"/"')," will simply be treated literally"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},'<?php\npattern(\'/[A-Z]/\'); // matches characters "/", a letter and "/"\n')),(0,i.kt)("h3",{id:"compatibility-patterns"},"Compatibility patterns"),(0,i.kt)("p",null,"Delimited patterns are still supported for completeness with flags, with ",(0,i.kt)("inlineCode",{parentName:"p"},"PcrePattern::of()"),". Both versions are equal with each other."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"$pattern = Pattern::of('[A-Z]+', 'im');\n$pattern = PcrePattern::of('/[A-Z]+/im');\n\n$pattern->test($subject)\n")),(0,i.kt)("p",null,"They are particularly useful when T-Regx is used with other libraries, which return delimited regular expressions.\nIf the ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern")," is instantiated with ",(0,i.kt)("inlineCode",{parentName:"p"},"PcrePattern"),", then it behaves exactly as the input regular expression would.\nThere are certain fixed that T-Regx performs on the input, but they are kept to a minimal proportion."),(0,i.kt)("p",null,"An example of such change could be token ",(0,i.kt)("inlineCode",{parentName:"p"},"\\c\\"),", which works fine with ",(0,i.kt)("inlineCode",{parentName:"p"},"PcrePattern"),"/",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern"),", but fails with ",(0,i.kt)("inlineCode",{parentName:"p"},"preg_match()"),"."))}c.isMDXComponent=!0}}]);