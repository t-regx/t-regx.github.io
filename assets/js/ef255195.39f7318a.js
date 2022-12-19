"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4825],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[d]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},92:(e,t,n)=>{n.d(t,{x:()=>l});var r=n(7294),a=n(5558);const i="code_JkvM",o=function(e){var t=e.children,n=e.language;return r.createElement("div",{className:i},r.createElement(a.Z,{className:"language-"+(n||"php")},function(e){if("string"==typeof e)return e;if(!Array.isArray(e))throw console.log(this.props.children),"Unexpected child of <Code>";if(e.every((function(e){return"string"==typeof e})))return e.join("")}(t)))};const p="result_6Tn1",l=function(e){var t=e.text,n=e.children;return r.createElement("div",{className:p},r.createElement(o,{language:t?"text":"php"},n))}},1115:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=n(92),p=["components"],l={id:"delimiters",title:"Automatic delimiters"},s={unversionedId:"delimiters",id:"delimiters",isDocsHomePage:!1,title:"Automatic delimiters",description:"Delimited pattern",source:"@site/../docs/delimiters.mdx",sourceDirName:".",slug:"/delimiters",permalink:"/docs/delimiters",version:"current",lastUpdatedAt:1671448734,formattedLastUpdatedAt:"12/19/2022",frontMatter:{id:"delimiters",title:"Automatic delimiters"},sidebar:"docs",previous:{title:"Multiple patterns",permalink:"/docs/pattern-list"},next:{title:"Split a string",permalink:"/docs/split"}},c=[{value:"Delimited pattern",id:"delimited-pattern",children:[]},{value:"PCRE-style patterns",id:"pcre-style-patterns",children:[]},{value:"Modifiers",id:"modifiers",children:[]},{value:"I want to break it",id:"i-want-to-break-it",children:[]}],d={toc:c};function u(e){var t=e.components,n=(0,a.Z)(e,p);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"delimited-pattern"},"Delimited pattern"),(0,i.kt)("p",null,"Calling method ",(0,i.kt)("inlineCode",{parentName:"p"},"delimited()")," on any instance of T-Regx ",(0,i.kt)("inlineCode",{parentName:"p"},"PatternInterface")," returns\na pattern, as it will be used with ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/ref.pcre.php"},"PHP PCRE methods"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"echo pattern('https://github.com#heading')->delimited();\n")),(0,i.kt)(o.x,{text:!0,mdxType:"Result"},"%https://github.com#heading%"),(0,i.kt)("h2",{id:"pcre-style-patterns"},"PCRE-style patterns"),(0,i.kt)("p",null,"If the was constructed with ",(0,i.kt)("a",{parentName:"p",href:"/docs/introduction-preg#entry-points"},(0,i.kt)("inlineCode",{parentName:"a"},"PcrePattern::of()")),", method ",(0,i.kt)("inlineCode",{parentName:"p"},"delimited()")," returns the pattern unchanged."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"PcrePattern::of('#Welcome/Or not#')->delimited();\n")),(0,i.kt)(o.x,{text:!0,mdxType:"Result"},"#Welcome/Or not#"),(0,i.kt)("h2",{id:"modifiers"},"Modifiers"),(0,i.kt)("p",null,"There are two ways of using patterns with PCRE modifiers:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Either pass a second argument to ",(0,i.kt)("a",{parentName:"p",href:"/docs/introduction-preg#entry-points"},(0,i.kt)("inlineCode",{parentName:"a"},"pattern()")),"/",(0,i.kt)("a",{parentName:"p",href:"/docs/introduction-preg#entry-points"},(0,i.kt)("inlineCode",{parentName:"a"},"Pattern::of()")),":"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// global function\npattern('[A-Z][a-z]+', 'i')->match($subject)->first();\n\n// static method\nPattern::of('[A-Z][a-z]+', 'i')->match($subject)->first();\n\n// prepared patterns\nPattern::inject('[A-Z]@', [$_GET['name']], 'i')->search($subject)->first();\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"or use an old-school pattern:"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-php"},"PcrePattern::of('/[A-Z][a-z]+/i')->search($subject)->first();\n")))),(0,i.kt)("h2",{id:"i-want-to-break-it"},"I want to break it"),(0,i.kt)("p",null,"T-Regx has a set of predefined, suitable delimiters (like ",(0,i.kt)("inlineCode",{parentName:"p"},"/"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"#"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"~"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"%"),", etc.) and simply uses the first one, that\ndoesn't occur in your pattern. If you exhaust each of them; if you use every possible, predefined,\nsuitable delimiter - it will throw ",(0,i.kt)("inlineCode",{parentName:"p"},"ExplicitDelimiterRequiredException"),"."),(0,i.kt)("p",null,"In that case, you simply have to use an explicit delimiter with ",(0,i.kt)("a",{parentName:"p",href:"/docs/introduction-preg#entry-points"},(0,i.kt)("inlineCode",{parentName:"a"},"PcrePattern::of()")),"."),(0,i.kt)("p",null,"If you think another automatic delimiter can be used, please create ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/issues/new/choose"},"a github issue"),"."))}u.isMDXComponent=!0}}]);