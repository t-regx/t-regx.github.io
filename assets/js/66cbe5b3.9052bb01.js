"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1619],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),o=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=o(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=o(a),m=r,k=u["".concat(c,".").concat(m)]||u[m]||d[m]||l;return a?n.createElement(k,i(i({ref:t},s),{},{components:a})):n.createElement(k,i({ref:t},s))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:r,i[1]=p;for(var o=2;o<l;o++)i[o]=a[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},92:(e,t,a)=>{a.d(t,{x:()=>c});var n=a(7294),r=a(5558);const l="code_JkvM",i=function(e){var t=e.children,a=e.language;return n.createElement("div",{className:l},n.createElement(r.Z,{className:"language-"+(a||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const p="result_6Tn1",c=function(e){var t=e.text,a=e.children;return n.createElement("div",{className:p},n.createElement(i,{language:t?"text":"php"},a))}},2142:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m,frontMatter:()=>c,metadata:()=>o,toc:()=>s});var n=a(7462),r=a(3366),l=(a(7294),a(3905)),i=a(92),p=["components"],c={id:"replace-callback",title:"Replace with callback"},o={unversionedId:"replace-callback",id:"replace-callback",isDocsHomePage:!1,title:"Replace with callback",description:"After replace(), you need to explicitly use one of first()/all()/only(int) methods, to express how many",source:"@site/../docs/replace-callback.mdx",sourceDirName:".",slug:"/replace-callback",permalink:"/docs/replace-callback",version:"current",lastUpdatedAt:1676220528,formattedLastUpdatedAt:"2/12/2023",frontMatter:{id:"replace-callback",title:"Replace with callback"},sidebar:"docs",previous:{title:"Replace with a constant value",permalink:"/docs/replace-with"},next:{title:"Prepared Patterns - Introduction",permalink:"/docs/prepared-patterns"}},s=[{value:"Replace first",id:"replace-first",children:[]},{value:"Replace multiple",id:"replace-multiple",children:[{value:"<code>all()</code>",id:"all",children:[]},{value:"<code>only()</code>",id:"only",children:[]}]},{value:"Return types",id:"return-types",children:[{value:"Explicit string",id:"explicit-string",children:[]}]},{value:"Variable callbacks",id:"variable-callbacks",children:[]}],u={toc:s},d="wrapper";function m(e){var t=e.components,a=(0,r.Z)(e,p);return(0,l.kt)(d,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"After ",(0,l.kt)("inlineCode",{parentName:"p"},"replace()"),", you need to explicitly use one of ",(0,l.kt)("inlineCode",{parentName:"p"},"first()"),"/",(0,l.kt)("inlineCode",{parentName:"p"},"all()"),"/",(0,l.kt)("inlineCode",{parentName:"p"},"only(int)")," methods, to express how many\nreplacements should be done."),(0,l.kt)("p",null,"Callback passed to ",(0,l.kt)("inlineCode",{parentName:"p"},"replace()->callback()")," will only be invoked:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"for ",(0,l.kt)("inlineCode",{parentName:"li"},"all()")," - as many times as there are occurrences matched in the subject."),(0,l.kt)("li",{parentName:"ul"},"for ",(0,l.kt)("inlineCode",{parentName:"li"},"only(int)")," - the same as ",(0,l.kt)("inlineCode",{parentName:"li"},"all()"),", but up to an ",(0,l.kt)("inlineCode",{parentName:"li"},"int")," limit."),(0,l.kt)("li",{parentName:"ul"},"for ",(0,l.kt)("inlineCode",{parentName:"li"},"first()")," - once if an occurrence is matched; or not at all if it's not.")),(0,l.kt)("h2",{id:"replace-first"},"Replace first"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\npattern('[A-Z][a-z]+')->replace($subject)->first()->callback(function (Detail $detail) {\n    return strtoupper($detail->text());\n});\n")),(0,l.kt)(i.x,{mdxType:"Result"},"'I like scandinavia: SWEDEN, Norway and Denmark'"),(0,l.kt)("h2",{id:"replace-multiple"},"Replace multiple"),(0,l.kt)("h3",{id:"all"},(0,l.kt)("inlineCode",{parentName:"h3"},"all()")),(0,l.kt)("p",null,"Replacing all matched occurrences is the most common use-case:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\npattern('[A-Z][a-z]+')->replace($subject)->all()->callback(function (Detail $m) {\n    return strToUpper($m->text());\n});\n")),(0,l.kt)(i.x,{mdxType:"Result"},"'I like scandinavia: SWEDEN, NORWAY and DENMARK'"),(0,l.kt)("h3",{id:"only"},(0,l.kt)("inlineCode",{parentName:"h3"},"only()")),(0,l.kt)("p",null,"You can also limit the amount of replacements done with ",(0,l.kt)("inlineCode",{parentName:"p"},"only()"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"$subject = 'I like scandinavia: Sweden, Norway and Denmark';\n// In T-Regx, Detail can be cast to string, returning the whole match\npattern('[A-Z][a-z]+')->replace($subject)->only(2)->callback('strToUpper');\n")),(0,l.kt)(i.x,{mdxType:"Result"},"'I like scandinavia: SWEDEN, NORWAY and Denmark'"),(0,l.kt)("h2",{id:"return-types"},"Return types"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"replace()->callback()")," only accepts ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,l.kt)("inlineCode",{parentName:"a"},"Detail"))," or ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-groups"},(0,l.kt)("inlineCode",{parentName:"a"},"MatchGroup"))," as its return type."),(0,l.kt)("p",null,"We believe that returning anything, that's not a string, ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,l.kt)("inlineCode",{parentName:"a"},"Detail"))," or a group can ",(0,l.kt)("strong",{parentName:"p"},"be a sign of a bug"),'!\nMoreover, converting them silently would break our "Explicity rule".'),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->replace(\"Apples are cool\")->first()->callback(function (Detail $detail) {\n    return 2;       // <- throws InvalidReturnValueException\n    return true;    // <- throws InvalidReturnValueException\n    return null;    // <- throws InvalidReturnValueException\n});\n")),(0,l.kt)("p",null,"Only ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,l.kt)("inlineCode",{parentName:"a"},"Detail"))," or ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-groups"},(0,l.kt)("inlineCode",{parentName:"a"},"MatchGroup"))," are allowed."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('([A-Z])\\w+')->replace(\"Apples are cool\")->first()->callback(function (Detail $detail) {\n    return 'orange';         // string\n    return $detail;           // match\n    return $detail->group(1); // group\n});\n")),(0,l.kt)("h3",{id:"explicit-string"},"Explicit string"),(0,l.kt)("p",null,"If you'd like to replace an occurrence with a numeric value (for example ",(0,l.kt)("inlineCode",{parentName:"p"},"'12'"),"), an empty string or ",(0,l.kt)("inlineCode",{parentName:"p"},"'true'"),"/",(0,l.kt)("inlineCode",{parentName:"p"},"'false'"),"\nliterals - just return them as ",(0,l.kt)("inlineCode",{parentName:"p"},"string")," ",(0,l.kt)("strong",{parentName:"p"},"explicitly"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->replace(\"Apples are cool\")->first()->callback(function (Detail $detail) {\n    return strval(2);                          // ok\n    return true ? 'true' : 'false';            // ok\n    return null ? '' : $something;             // ok\n\n    return $detail->text();                     // ok\n    return (string) $detail;                    // ok\n    return $detail->group('captured')->text();  // ok, if group exists and was matched\n\n    return $detail;                             // ok\n    return $detail->group('captured');          // ok, if group exists and was matched\n});\n")),(0,l.kt)("h2",{id:"variable-callbacks"},"Variable callbacks"),(0,l.kt)("p",null,"You can call ",(0,l.kt)("inlineCode",{parentName:"p"},"replace()->callback()")," for any valid PHP ",(0,l.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/language.types.callable.php"},(0,l.kt)("inlineCode",{parentName:"a"},"callable"))," which accepts one string parameter (or no parameters)\nand returns ",(0,l.kt)("inlineCode",{parentName:"p"},"string"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->replace('Apples are cool')->first()->callback('strToUpper');\n")),(0,l.kt)(i.x,{mdxType:"Result"},"'APPLES are cool'"),(0,l.kt)("p",null,"In this example, ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details"},(0,l.kt)("inlineCode",{parentName:"a"},"Detail"))," will be cast to string, which is the same as calling ",(0,l.kt)("inlineCode",{parentName:"p"},"Detail.text()")," method."))}m.isMDXComponent=!0}}]);