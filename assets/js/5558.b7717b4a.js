(self.webpackChunk=self.webpackChunk||[]).push([[5558],{5558:(e,t,n)=>{"use strict";n.d(t,{Z:()=>w});var o=n(7462),r=n(7294),s=n(6010);const a={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var l={Prism:n(7410).Z,theme:a};function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i.apply(this,arguments)}var p=/\r\n|\r|\n/,u=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},y=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},d=function(e,t){var n=e.plain,o=Object.create(null),r=e.styles.reduce((function(e,n){var o=n.languages,r=n.style;return o&&!o.includes(t)||n.types.forEach((function(t){var n=i({},e[t],r);e[t]=n})),e}),o);return r.root=n,r.plain=i({},n,{backgroundColor:null}),r};function h(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}const g=function(e){function t(){for(var t=this,n=[],o=arguments.length;o--;)n[o]=arguments[o];e.apply(this,n),c(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?d(e.theme,e.language):void 0;return t.themeDict=n})),c(this,"getLineProps",(function(e){var n=e.key,o=e.className,r=e.style,s=i({},h(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),a=t.getThemeDict(t.props);return void 0!==a&&(s.style=a.plain),void 0!==r&&(s.style=void 0!==s.style?i({},s.style,r):r),void 0!==n&&(s.key=n),o&&(s.className+=" "+o),s})),c(this,"getStyleForToken",(function(e){var n=e.types,o=e.empty,r=n.length,s=t.getThemeDict(t.props);if(void 0!==s){if(1===r&&"plain"===n[0])return o?{display:"inline-block"}:void 0;if(1===r&&!o)return s[n[0]];var a=o?{display:"inline-block"}:{},l=n.map((function(e){return s[e]}));return Object.assign.apply(Object,[a].concat(l))}})),c(this,"getTokenProps",(function(e){var n=e.key,o=e.className,r=e.style,s=e.token,a=i({},h(e,["key","className","style","token"]),{className:"token "+s.types.join(" "),children:s.content,style:t.getStyleForToken(s),key:void 0});return void 0!==r&&(a.style=void 0!==a.style?i({},a.style,r):r),void 0!==n&&(a.key=n),o&&(a.className+=" "+o),a})),c(this,"tokenize",(function(e,t,n,o){var r={code:t,grammar:n,language:o,tokens:[]};e.hooks.run("before-tokenize",r);var s=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),s}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,o=e.code,r=e.children,s=this.getThemeDict(this.props),a=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],o=[0],r=[e.length],s=0,a=0,l=[],c=[l];a>-1;){for(;(s=o[a]++)<r[a];){var i=void 0,d=t[a],h=n[a][s];if("string"==typeof h?(d=a>0?d:["plain"],i=h):(d=y(d,h.type),h.alias&&(d=y(d,h.alias)),i=h.content),"string"==typeof i){var g=i.split(p),m=g.length;l.push({types:d,content:g[0]});for(var f=1;f<m;f++)u(l),c.push(l=[]),l.push({types:d,content:g[f]})}else a++,t.push(d),n.push(i),o.push(0),r.push(i.length)}a--,t.pop(),n.pop(),o.pop(),r.pop()}return u(l),c}(void 0!==a?this.tokenize(t,o,a,n):[o]),className:"prism-code language-"+n,style:void 0!==s?s.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(r.Component);var m=n(7594),f=n.n(m);const v={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]};var k=n(5350),b=n(6700);const j=function(){var e=(0,b.LU)().prism,t=(0,k.Z)().isDarkTheme,n=e.theme||v,o=e.darkTheme||n;return t?o:n};var x=n(4973);const T="codeBlockContainer_J+bg",C="codeBlockContent_csEI",E="codeBlockTitle_oQzk",N="codeBlock_rtdJ",B="codeBlockWithTitle_ZT05",Z="copyButton_M3SB",L="codeBlockLines_1zSZ";var S=/{([\d,-]+)}/,P=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},n=["highlight-next-line","highlight-start","highlight-end"].join("|"),o=e.map((function(e){return"(?:"+t[e].start+"\\s*("+n+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+o+")\\s*$")};function w(e){var t=e.children,n=e.className,a=e.metastring,c=e.title,i=(0,b.LU)().prism,p=(0,r.useState)(!1),u=p[0],y=p[1],d=(0,r.useState)(!1),h=d[0],m=d[1];(0,r.useEffect)((function(){m(!0)}),[]);var v=(0,b.bc)(a)||c,k=(0,r.useRef)(null),w=[],O=j(),_=Array.isArray(t)?t.join(""):t;if(a&&S.test(a)){var D=a.match(S)[1];w=f()(D).filter((function(e){return e>0}))}var z=n&&n.replace(/language-/,"");!z&&i.defaultLanguage&&(z=i.defaultLanguage);var A=_.replace(/\n$/,"");if(0===w.length&&void 0!==z){for(var I,R="",$=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return P(["js","jsBlock"]);case"jsx":case"tsx":return P(["js","jsBlock","jsx"]);case"html":return P(["js","jsBlock","html"]);case"python":case"py":return P(["python"]);default:return P()}}(z),F=_.replace(/\n$/,"").split("\n"),J=0;J<F.length;){var U=J+1,W=F[J].match($);if(null!==W){switch(W.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":R+=U+",";break;case"highlight-start":I=U;break;case"highlight-end":R+=I+"-"+(U-1)+","}F.splice(J,1)}else J+=1}w=f()(R),A=F.join("\n")}var M=function(){!function(e,{target:t=document.body}={}){const n=document.createElement("textarea"),o=document.activeElement;n.value=e,n.setAttribute("readonly",""),n.style.contain="strict",n.style.position="absolute",n.style.left="-9999px",n.style.fontSize="12pt";const r=document.getSelection();let s=!1;r.rangeCount>0&&(s=r.getRangeAt(0)),t.append(n),n.select(),n.selectionStart=0,n.selectionEnd=e.length;let a=!1;try{a=document.execCommand("copy")}catch{}n.remove(),s&&(r.removeAllRanges(),r.addRange(s)),o&&o.focus()}(A),y(!0),setTimeout((function(){return y(!1)}),2e3)};return r.createElement(g,(0,o.Z)({},l,{key:String(h),theme:O,code:A,language:z}),(function(e){var t,n=e.className,a=e.style,l=e.tokens,c=e.getLineProps,i=e.getTokenProps;return r.createElement("div",{className:T},v&&r.createElement("div",{style:a,className:E},v),r.createElement("div",{className:(0,s.Z)(C,z)},r.createElement("div",{tabIndex:0,className:(0,s.Z)(n,N,"thin-scrollbar",(t={},t[B]=v,t))},r.createElement("div",{className:L,style:a},l.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var n=c({line:e,key:t});return w.includes(t+1)&&(n.className=n.className+" docusaurus-highlight-code-line"),r.createElement("div",(0,o.Z)({key:t},n),e.map((function(e,t){return r.createElement("span",(0,o.Z)({key:t},i({token:e,key:t})))})))})))),r.createElement("button",{ref:k,type:"button","aria-label":(0,x.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,s.Z)(Z),onClick:M},u?r.createElement(x.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):r.createElement(x.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},2924:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});const o=n(7294).createContext(void 0)},5350:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var o=n(7294),r=n(2924);const s=function(){var e=(0,o.useContext)(r.Z);if(null==e)throw new Error("`useThemeContext` is used outside of `Layout` Component. See https://docusaurus.io/docs/api/themes/configuration#usethemecontext.");return e}},7594:(e,t)=>{function n(e){let t,n=[];for(let o of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(o))n.push(parseInt(o,10));else if(t=o.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,o,r,s]=t;if(o&&s){o=parseInt(o),s=parseInt(s);const e=o<s?1:-1;"-"!==r&&".."!==r&&"\u2025"!==r||(s+=e);for(let t=o;t!==s;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);