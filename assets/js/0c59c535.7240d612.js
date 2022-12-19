"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6068],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=c(n),m=i,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(h,r(r({ref:t},s),{},{components:n})):a.createElement(h,r({ref:t},s))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[d]="string"==typeof e?e:i,r[1]=p;for(var c=2;c<o;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9673:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>c});var a=n(7462),i=n(3366),o=(n(7294),n(3905)),r=["components"],p={id:"exception-structure",title:"Exception structure",sidebar_label:"Exceptions overview"},l={unversionedId:"exception-structure",id:"exception-structure",isDocsHomePage:!1,title:"Exception structure",description:"T-Regx uses a variety of exceptions to provide proper flow control.",source:"@site/../docs/exception-structure.md",sourceDirName:".",slug:"/exception-structure",permalink:"/docs/exception-structure",version:"current",lastUpdatedAt:1671448734,formattedLastUpdatedAt:"12/19/2022",sidebar_label:"Exceptions overview",frontMatter:{id:"exception-structure",title:"Exception structure",sidebar_label:"Exceptions overview"},sidebar:"docs",previous:{title:"Iterator",permalink:"/docs/match-iterator"},next:{title:"Capturing groups - in depth",permalink:"/docs/match-groups-in-depth"}},c=[{value:"Don&#39;t live with the animals",id:"dont-live-with-the-animals",children:[]},{value:"Invalid arguments",id:"invalid-arguments",children:[]},{value:"SafeRegex exceptions vs. CleanRegex",id:"saferegex-exceptions-vs-cleanregex",children:[{value:"About SafeRegex exceptions",id:"about-saferegex-exceptions",children:[]},{value:"About CleanRegex exceptions",id:"about-cleanregex-exceptions",children:[]},{value:"Summary",id:"summary",children:[]}]},{value:"Malformed patterns",id:"malformed-patterns",children:[]}],s={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"T-Regx uses a variety of exceptions to provide proper flow control."),(0,o.kt)("p",null,"Additionally, T-Regx is composed of two sub-systems:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/introduction-preg"},"SafeRegex")," (which handles low-level PHP/PCRE integration, while keeping the API intact)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/introduction"},"CleanRegex")," (high-level API, which provides modern approach and eliminates false positives and false negatives, being consequence of\nPCRE).")),(0,o.kt)("h2",{id:"dont-live-with-the-animals"},"Don't live with the animals"),(0,o.kt)("p",null,"Above everything else, we wanted to avoid a situation where T-Regx users would catch ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/language.exceptions.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\Exception"))," to silence everything that comes out of\nT-Regx."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use Exception;\n\ntry {\n  pattern('Foo')->test('Foo');\n// highlight-next-line\n} catch (Exception $ignore) { // not smart\n}\n")),(0,o.kt)("p",null,"This is potentially dangerous since, while doing that, it's possible to unknowingly silence/ignore other exceptions thrown near T-Regx call."),(0,o.kt)("p",null,"That's why every T-Regx exception extends a common interface exception: ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException"),", which you can use to shut T-Regx up :)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\RegexException;\n\ntry {\n  pattern('Foo')->test('Foo');\n// highlight-next-line\n} catch (RegexException $ignore) { // smart\n}\n")),(0,o.kt)("h2",{id:"invalid-arguments"},"Invalid arguments"),(0,o.kt)("p",null,"Apart from ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException"),", for certain arguments and methods ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException"))," is thrown, when arguments of invalid types or\narguments that are semantically inappropriate are used."),(0,o.kt)("p",null,"For example, when ",(0,o.kt)("inlineCode",{parentName:"p"},"only()")," is used with negative index:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use InvalidArgumentException;\n\ntry {\n  pattern('Foo')->match('Foo')->only(-1);\n// highlight-next-line\n} catch (InvalidArgumentException $exception) {\n}\n")),(0,o.kt)("p",null,"So to really catch ",(0,o.kt)("strong",{parentName:"p"},"every"),", ",(0,o.kt)("em",{parentName:"p"},"single")," possible exception, you would need to catch both ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException")," and\n",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException")),". Nothing else could slip by."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use InvalidArgumentException;\nuse TRegx\\Exception\\RegexException;\n\ntry {\n  // any T-Regx code\n// highlight-next-line\n} catch (RegexException | InvalidArgumentException $ignore) {\n}\n")),(0,o.kt)("p",null,"We decided to separate ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException")," and ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException"))," because we understand that sometimes, regular expression\nexceptions are wanted. For example, you might expect to use them against data which is unsafe. In that case, catching ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException"),"\nis a proper control of that case."),(0,o.kt)("p",null,"However, we don't really believe passing ",(0,o.kt)("inlineCode",{parentName:"p"},"-1")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"only()")," is ever a good idea, even when it comes from an unsafe place. Methods\nlike ",(0,o.kt)("inlineCode",{parentName:"p"},"only()")," should never be called with arguments like ",(0,o.kt)("inlineCode",{parentName:"p"},"-1"),", that's why this exception is not ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException"),", and it won't fall into the\nproper handling. It's most likely a mistake that shouldn't happen, and the developer should handle it in other way (for example, never\nlet ",(0,o.kt)("inlineCode",{parentName:"p"},"only()")," be called with ",(0,o.kt)("inlineCode",{parentName:"p"},"-1"),"\nin the first place)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use InvalidArgumentException;\nuse TRegx\\Exception\\RegexException;\n\ntry {\n  pattern($config['pattern'])->match($subject)->only($index);\n} catch (RegexException $exception) {\n// highlight-next-line\n  // probably config is not good\n} catch (InvalidArgumentException $exception) {\n// highlight-next-line\n  // you messed up, don't catch me\n}\n")),(0,o.kt)("h2",{id:"saferegex-exceptions-vs-cleanregex"},"SafeRegex exceptions vs. CleanRegex"),(0,o.kt)("p",null,"By this time, we're sure you must be aware that ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," (so ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"pattern()")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::of()")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::inject()")),")\nis built on top of ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," (providing ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg#about-saferegex"},(0,o.kt)("inlineCode",{parentName:"a"},"preg::match()")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg#about-saferegex"},(0,o.kt)("inlineCode",{parentName:"a"},"preg::replace()")),", etc.)."),(0,o.kt)("p",null,"We tried really hard to design an exception structure in such a way, so it makes sense to the users, and so it resembles the real\ninteraction of these two systems. Here's what we came up with."),(0,o.kt)("h3",{id:"about-saferegex-exceptions"},"About SafeRegex exceptions"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," methods can throw ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException")," and ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException")),". ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException")," implements ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException")," so you can use\neither to catch ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/ref.pcre.php"},"preg functions")," exceptions."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\RegexException;\nuse TRegx\\SafeRegex\\Exception\\PregException;\nuse TRegx\\SafeRegex\\preg;\n\ntry {\n    preg::match('/foo/', 'foo');\n// highlight-next-line\n} catch (PregException $exception) {\n    $exception instanceof RegexException; // true\n}\n")),(0,o.kt)("p",null,"We don't encourage it (since ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException")," unifies a broad family of exceptions), but should you wish to silence ",(0,o.kt)("inlineCode",{parentName:"p"},"preg::")," methods, that's\nthe way to do it."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PregException")," actually represents a family of exceptions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"CatastrophicBacktrackingPregException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"SubjectEncodingPregException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"Utf8OffsetPregException"),"; which T-Regx throws when\n",(0,o.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/function.preg-last-error.php"},(0,o.kt)("inlineCode",{parentName:"a"},"preg_last_error()"))," says so"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"CompilePregException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"MalformedPatternException"),"; which T-Regx throws on warnings/errors emitted by PHP"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"SubjectEncodingPregException")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"Utf8OffsetPregException"),"; which T-Regx throws for invalid subject encoding or invalid unicode offset"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"InvalidReturnValueException")," which T-Regx throws for invalid value type returned from ",(0,o.kt)("inlineCode",{parentName:"li"},"preg::replace_callback()")," callback"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"SuspectedReturnPregException")," which T-Regx throws when ",(0,o.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/ref.pcre.php"},"preg functions")," return values indicating error, but nature of the error couldn't\nbe determined by other means")),(0,o.kt)("h3",{id:"about-cleanregex-exceptions"},"About CleanRegex exceptions"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," methods can throw ",(0,o.kt)("inlineCode",{parentName:"p"},"PatternException")," and ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException")),". "),(0,o.kt)("p",null,"Additionally, because ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," is built on top of ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex"),", any ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," exceptions can also be thrown with ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," methods.\nFor example, it's possible to induce catastrophic backtracking with ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"pattern()")),", in that case ",(0,o.kt)("inlineCode",{parentName:"p"},"CatastrophicBacktrackingPregException"),"\n(which is ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException"),") will be thrown."),(0,o.kt)("p",null,"It doesn't work the other way, so ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," will never throw ",(0,o.kt)("inlineCode",{parentName:"p"},"PatternException"),"."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PatternException")," implements ",(0,o.kt)("inlineCode",{parentName:"p"},"RegexException")," (just like ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException"),"), so you can use either to catch exceptions thrown from\n",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"pattern()")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::of()"))," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::inject()")),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\RegexException;\nuse TRegx\\CleanRegex\\Exception\\PatternException;\nuse TRegx\\SafeRegex\\Exception\\PregException;\n\ntry {\n    pattern('foo')->test('foo');\n// highlight-next-line\n} catch (PatternException | PregException $exception) {\n    $exception instanceof RegexException; // true\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\RegexException;\n\ntry {\n    pattern('foo')->test('foo');\n// highlight-next-line\n} catch (RegexException $exception) {\n    // good as well\n}\n")),(0,o.kt)("p",null,"Similarly to how ",(0,o.kt)("inlineCode",{parentName:"p"},"PregException")," unifies exceptions thrown from ",(0,o.kt)("a",{parentName:"p",href:"https://www.php.net/manual/en/ref.pcre.php"},"preg functions"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"PatternException")," unifies exceptions thrown from\n",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"pattern()")),", ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::of()"))," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"Pattern::inject()")),". Because of that, we don't recommend catching ",(0,o.kt)("inlineCode",{parentName:"p"},"PatternException"),", unless you\nactually need to handle every exception thrown from those methods."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PatternException")," represents:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Inappropriately constructed pattern being used: ",(0,o.kt)("inlineCode",{parentName:"li"},"MalformedPatternException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"ExplicitDelimiterRequiredException"),",\n",(0,o.kt)("inlineCode",{parentName:"li"},"FormatMalformedPatternException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"DuplicateFlagsException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"FlagNotAllowedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"TemplateFormatException")),(0,o.kt)("li",{parentName:"ul"},"Match expectations weren't met: ",(0,o.kt)("inlineCode",{parentName:"li"},"SubjectNotMatchedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"NoSuchNthElementException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"NoSuchElementFluentException")),(0,o.kt)("li",{parentName:"ul"},"Improper replacement attempted, or replacement expectations weren't met: ",(0,o.kt)("inlineCode",{parentName:"li"},"NotReplacedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"InvalidReplacementException"),"\n, ",(0,o.kt)("inlineCode",{parentName:"li"},"InvalidReturnValueException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"MissingReplacementKeyException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"ReplacementExpectationFailedException")),(0,o.kt)("li",{parentName:"ul"},"Capturing groups being used inappropriately: ",(0,o.kt)("inlineCode",{parentName:"li"},"FocusGroupNotMatchedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"GroupNotMatchedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"NonexistentGroupException")),(0,o.kt)("li",{parentName:"ul"},"Optionals being resolved to exception: ",(0,o.kt)("inlineCode",{parentName:"li"},"ClassExpectedException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"NoSuitableConstructorException")),(0,o.kt)("li",{parentName:"ul"},"Non-integer string being used as integer: ",(0,o.kt)("inlineCode",{parentName:"li"},"IntegerFormatException"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"FluentMatchPatternException"))),(0,o.kt)("p",null,"We don't encourage you to catch ",(0,o.kt)("inlineCode",{parentName:"p"},"PatternException")," because of its broad usages, so please only do so when you wish to silence absolutely\nevery exception thrown from ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction#entry-points"},(0,o.kt)("inlineCode",{parentName:"a"},"pattern()"))," and other CleanRegex methods."),(0,o.kt)("h3",{id:"summary"},"Summary"),(0,o.kt)("p",null,"To summarize everything so far:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.php.net/manual/en/class.invalidargumentexception.php"},(0,o.kt)("inlineCode",{parentName:"a"},"\\InvalidArgumentException"))," is being thrown for obvious illegal arguments"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"PregException")," is thrown by ",(0,o.kt)("a",{parentName:"li",href:"/docs/introduction-preg"},"SafeRegex")," and ",(0,o.kt)("a",{parentName:"li",href:"/docs/introduction"},"CleanRegex"),", regarding low-level operations"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"PatternException")," is thrown by ",(0,o.kt)("a",{parentName:"li",href:"/docs/introduction"},"CleanRegex")," regarding higher-API operations"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"RegexException")," is ",(0,o.kt)("inlineCode",{parentName:"li"},"PregException | PatternException"))),(0,o.kt)("h2",{id:"malformed-patterns"},"Malformed patterns"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"MalformedPatternException")," should be used to handle pattern being malformed from every ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," entry point:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/docs/introduction-preg"},"SafeRegex")," methods:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\MalformedPatternException;\nuse TRegx\\SafeRegex\\preg;\n\ntry {\n    preg::match('/(foo/', 'foo');\n// highlight-next-line\n} catch (MalformedPatternException $exception) {\n    // handle '/(foo/'\n}\n")),(0,o.kt)("p",null,"...and ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," methods:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\Exception\\MalformedPatternException;\n\ntry {\n    pattern('(foo')->test('foo');\n// highlight-next-line\n} catch (MalformedPatternException $exception) {\n    // handle '(foo'\n}\n")),(0,o.kt)("p",null,"as well as ",(0,o.kt)("a",{parentName:"p",href:"/docs/introduction"},"CleanRegex")," API for ",(0,o.kt)("a",{parentName:"p",href:"/docs/prepared-patterns"},"Prepared Patterns"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-php"},"use TRegx\\CleanRegex\\Pattern;\nuse TRegx\\Exception\\MalformedPatternException;\n\ntry {\n    Pattern::inject('(foo:@', [$value])->test('foo:bar');\n// highlight-next-line\n} catch (MalformedPatternException $exception) {\n    // handle '(foo'\n}\n")))}d.isMDXComponent=!0}}]);