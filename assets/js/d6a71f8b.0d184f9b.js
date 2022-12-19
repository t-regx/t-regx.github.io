"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3972],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),m=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=m(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=m(n),u=r,k=c["".concat(p,".").concat(u)]||c[u]||d[u]||i;return n?a.createElement(k,l(l({ref:t},s),{},{components:n})):a.createElement(k,l({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var m=2;m<i;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5224:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c,frontMatter:()=>o,metadata:()=>p,toc:()=>m});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),l=["components"],o={title:"Release 0.9.11",author:"Daniel Wilkowski"},p={permalink:"/blog/2020/11/03/release-0.9.11",source:"@site/blog/2020-11-03-release-0.9.11.md",title:"Release 0.9.11",description:"Heey, there!",date:"2020-11-03T00:00:00.000Z",formattedDate:"November 3, 2020",tags:[],readingTime:1.585,truncated:!1,prevItem:{title:"Release 0.9.12 Oopsie",permalink:"/blog/2020/11/04/release-0.9.12-oopsie"},nextItem:{title:"Release 0.9.10",permalink:"/blog/2020/09/22/release-0.9.10"}},m=[],s={toc:m};function c(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Heey, there!"),(0,i.kt)("p",null,"Quick summary of changes in this release:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Every exception extending ",(0,i.kt)("inlineCode",{parentName:"p"},"PregException")," (so ",(0,i.kt)("inlineCode",{parentName:"p"},"MalformedPatternException"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"CatastrophicBacktrackingPregException"),", etc.)\nhave received new method ",(0,i.kt)("inlineCode",{parentName:"p"},"getPregPattern()"),":"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-php"},"try {\n    pattern('foo')->...\n} catch (\\TRegx\\SafeRegex\\Exception\\PregException $exception) {\n    $exception->getPregPattern(); // '/foo/'\n}\n")),(0,i.kt)("p",{parentName:"li"},"Some methods still throw ",(0,i.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,i.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException")),", and of course that exception is unchanged.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"We brought back ",(0,i.kt)("inlineCode",{parentName:"p"},"Pattern::prepare()")," (see ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/blob/develop/ChangeLog.md"},"ChangeLog.md"),")")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"We added ",(0,i.kt)("inlineCode",{parentName:"p"},"Match.tail()")," method, which works like ",(0,i.kt)("inlineCode",{parentName:"p"},"offset()")," but returns the position of the ",(0,i.kt)("em",{parentName:"p"},"end")," of the occurrence\nin the subject (not the start like ",(0,i.kt)("inlineCode",{parentName:"p"},"offset()"),").")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"tail()")," also works for ",(0,i.kt)("inlineCode",{parentName:"p"},"MatchGroup")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ReplaceMatch"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"There's also ",(0,i.kt)("inlineCode",{parentName:"p"},"byteTail()"),", which returns the position in bytes, instead of characters (like ",(0,i.kt)("inlineCode",{parentName:"p"},"byteOffset()"),").")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Fixed inconsistencies"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Duplicated pattern exception message changes offset after PHP 7.3. Since now,\nthe messages will be identical on every PHP version."))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Added ",(0,i.kt)("inlineCode",{parentName:"p"},"null"),"-safety to some replace methods. Returning ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," from any of those methods:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"replace()->callback()")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"replace()->otherwise()")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"replace()->by()->group()->orElse()"))),(0,i.kt)("p",{parentName:"li"},"throws ",(0,i.kt)("inlineCode",{parentName:"p"},"InvalidReturnValueException"),".")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Renamed some ",(0,i.kt)("inlineCode",{parentName:"p"},"or")," methods. Previously, what was used to handle the missing first value (result of ",(0,i.kt)("inlineCode",{parentName:"p"},"findFirst()"),'),\nwas also used to specify the replacement of an optional, unmatched group. Sorry to say that, we made\na bad decision unifying this interface, since it turns out they\'re not even remotely connected. What fooled\nus, was we referred to each as "optional" (even tough one was "optional first match", and the second was\n"replacement of an optional group).'),(0,i.kt)("p",{parentName:"li"},"In this release, we separate the interfaces, and assign new, better names for the specification of unmatched,\noptional groups: "),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"pattern()->replace()->by()->group()")," methods:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orThrow(string)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseThrow(string)"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orIgnore()")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseIgnore()"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orEmpty()")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseEmpty()"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orReturn(string)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseWith(string)"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orElse(callable)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseCalling(callable)"),"."))),(0,i.kt)("li",{parentName:"ul"},"Renamed and added ",(0,i.kt)("inlineCode",{parentName:"li"},"pattern()->replace()->by()->group()->map()")," methods:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orThrow(string)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseThrow(string)"),"."),(0,i.kt)("li",{parentName:"ul"},"Added ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseIgnore()"),"."),(0,i.kt)("li",{parentName:"ul"},"Added ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseEmpty()"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orReturn(string)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseWith(string)"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed ",(0,i.kt)("inlineCode",{parentName:"li"},"orElse(callable)")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"orElseCalling(callable)"),".")))))),(0,i.kt)("p",null,"As always, everything is described in ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/T-Regx/T-Regx/blob/develop/ChangeLog.md"},"ChangeLog.md")," on github."))}c.isMDXComponent=!0}}]);