"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7896],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>f});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},s=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=c(a),d=r,f=u["".concat(o,".").concat(d)]||u[d]||m[d]||l;return a?n.createElement(f,p(p({ref:t},s),{},{components:a})):n.createElement(f,p({ref:t},s))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,p=new Array(l);p[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[u]="string"==typeof e?e:r,p[1]=i;for(var c=2;c<l;c++)p[c]=a[c];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},92:(e,t,a)=>{a.d(t,{x:()=>o});var n=a(7294),r=a(5558);const l="code_JkvM",p=function(e){var t=e.children,a=e.language;return n.createElement("div",{className:l},n.createElement(r.Z,{className:"language-"+(a||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const i="result_6Tn1",o=function(e){var t=e.text,a=e.children;return n.createElement("div",{className:i},n.createElement(p,{language:t?"text":"php"},a))}},8163:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=a(7462),r=a(3366),l=(a(7294),a(3905)),p=a(92),i=["components"],o={id:"match-flat-map",title:"Map with keys (Flat map)"},c={unversionedId:"match-flat-map",id:"match-flat-map",isDocsHomePage:!1,title:"Map with keys (Flat map)",description:"There are cases when you would like to create a single list of all your matches. flatMap() is great for it.",source:"@site/../docs/match-flat-map.mdx",sourceDirName:".",slug:"/match-flat-map",permalink:"/docs/match-flat-map",version:"current",lastUpdatedAt:1682633299,formattedLastUpdatedAt:"4/27/2023",frontMatter:{id:"match-flat-map",title:"Map with keys (Flat map)"},sidebar:"docs",previous:{title:"Map occurrences",permalink:"/docs/match-map"},next:{title:"Counting occurrences",permalink:"/docs/count"}},s=[{value:"Making a flat map",id:"making-a-flat-map",children:[]},{value:"Return types",id:"return-types",children:[]},{value:"Variable callbacks",id:"variable-callbacks",children:[]},{value:"Mapping with keys",id:"mapping-with-keys",children:[]},{value:"Duplicate keys",id:"duplicate-keys",children:[]}],u={toc:s},m="wrapper";function d(e){var t=e.components,a=(0,r.Z)(e,i);return(0,l.kt)(m,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"There are cases when you would like to create a single list of all your matches. ",(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," is great for it.\nIn other words, it allows you to return one, zero or more elements from your mapping function."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"->map(function () {\n    return $value;        // Exactly one element\n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"->flatMap(function () {\n    return [...$values];  // Can be 1, many or even zero elements\n}\n")),(0,l.kt)("h2",{id:"making-a-flat-map"},"Making a flat map"),(0,l.kt)("p",null,"Method ",(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," is basically method ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-map"},(0,l.kt)("inlineCode",{parentName:"a"},"map()")),", from which you can return multiple values."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->match('I have 19 trains')->flatMap(function (Detail $detail) {\n    return [\n        $detail->text(), strLen($detail)\n    ];\n});\n")),(0,l.kt)(p.x,{mdxType:"Result"},"['I', 1, 'have', 4, '19', 2, 'trains', 6]"),(0,l.kt)("h2",{id:"return-types"},"Return types"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," only accepts an ",(0,l.kt)("inlineCode",{parentName:"p"},"array")," as its return type. Returning a single element and implicitly creating a one-element\narray under the hood would be counter-intuitive and error-prone."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->match(\"I like trains\")->flatMap(function (Detail $detail) {\n    return $detail;  // <- throws InvalidReturnValueException\n});\n")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," accepts only ",(0,l.kt)("inlineCode",{parentName:"p"},"array")," as its return type."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->match(\"I like trains\")->flatMap(function (Detail $detail) {\n    return [$detail->text()];  // ok\n});\n")),(0,l.kt)("h2",{id:"variable-callbacks"},"Variable callbacks"),(0,l.kt)("p",null,"You can invoke ",(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," with any valid PHP ",(0,l.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/language.types.callable.php"},(0,l.kt)("inlineCode",{parentName:"a"},"callable")),", which accepts one or zero string parameters and returns ",(0,l.kt)("inlineCode",{parentName:"p"},"array"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern(\"[\\\\w']+\")->match(\"I'm 19 years old\")->flatMap('str_split');\n")),(0,l.kt)(p.x,{mdxType:"Result"},"['I', '\\'', 'm', '1', '9', 'y', 'e', 'a', 'r', 's', 'o', 'l', 'd']"),(0,l.kt)("p",null,"The ",(0,l.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/language.types.callable.php"},(0,l.kt)("inlineCode",{parentName:"a"},"callable"))," passed to ",(0,l.kt)("inlineCode",{parentName:"p"},"flatMap()")," must return an array. ",(0,l.kt)("inlineCode",{parentName:"p"},"InvalidReturnValueException")," is thrown, otherwise."),(0,l.kt)("h2",{id:"mapping-with-keys"},"Mapping with keys"),(0,l.kt)("p",null,"Method ",(0,l.kt)("inlineCode",{parentName:"p"},"toMap()")," can be used to return a dictionary, based on matched occurrences."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->match('Apples are cool')->toMap(function (Detail $detail) {\n    return [$detail->text() => $detail->offset()];\n});\n")),(0,l.kt)(p.x,{mdxType:"Result"},"[\n    'Apples' => 0,\n    'are'    => 7,\n    'cool'   => 11\n]"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Detail.offset()")," returns offset as a ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details#offsets"},"valid UTF-8 sequence"),", whereas ",(0,l.kt)("inlineCode",{parentName:"p"},"preg::match_all()"),"\ncounts them as ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details#offsets"},"bytes"),". To return bytes number with T-Regx as well,\nuse ",(0,l.kt)("a",{parentName:"p",href:"/docs/match-details#offsets"},(0,l.kt)("inlineCode",{parentName:"a"},"byteOffset()")),"."),(0,l.kt)("h2",{id:"duplicate-keys"},"Duplicate keys"),(0,l.kt)("p",null,"Duplicate keys are not allowed in PHP arrays, so they'll only appear once in the results."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"pattern('\\w+')->match(\"Apples are cool\")->toMap(function (Detail $detail) {\n    return [\n        $detail->text() => $detail->offset(),   // offset is UTF-8 safe\n        'subject'       => $detail->subject()\n    ];\n});\n")),(0,l.kt)(p.x,{mdxType:"Result"},"[\n    'Apples'  => 0,\n    'subject' => \"Apples are cool\",\n    'are'     => 7,\n    'cool'    => 11\n]"))}d.isMDXComponent=!0}}]);