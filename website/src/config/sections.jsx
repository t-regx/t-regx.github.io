import React from "react";

import Link from "../components/Link/Link";
import Markdown from "../components/Markdown/Markdown";
import {PhpCode} from "../components/Quiz/components/cosmethics";

import login from "../../static/img/docs/replit.login.png";
import example from "../../static/img/docs/replit.example.png";
import weLoveStatic from "../../static/img/t.regx.static.png";

import {tryItOnline} from "./links";

import test from "../data/test.php";
import facade from "../data/facade.php";
import matchDetails from "../data/matchDetails.php";
import replaceDetails from "../data/replaceDetails.php";
import phpstormTooltip from "../../static/img/pages/phpstorm.tooltip.png";
import preparedPatterns from "../data/preparedPatterns.php";

const usernamePattern = `^[a-zA-Z][a-zA-Z0-9]{1,15}$`;

export default {
  installation: [
    {
      title: '',
      content: '[![](img/t.regx.installation.png)](docs/installation)',
    },
    {
      title: 'Installation',
      content: `\`\`\`bash
composer require rawr/t-regx
\`\`\`
      `,
    },
    {},
  ],
  test: [
    {body: <PhpCode>{test}</PhpCode>},
    {
      title: 'Match your subject against a pattern',
      body: <>
        <p>Use <Link>pattern()-&gt;test()</Link> to check whether your subject matches a given regular expression.</p>
        <p> In this case whether <code>{usernamePattern}</code> matches <code>$username</code>.</p>
      </>
    },
  ],
  matchDetails: [
    {
      body: <PhpCode>{matchDetails}</PhpCode>,
    },
    {
      title: 'Match details',
      body: <>
        <p>
          With <Link>pattern()-&gt;match()</Link> and <Link>pattern()-&gt;replace()</Link>, it's trivial to
          retrieve, iterate, map and filter matches with callbacks and a detailed <Link>Detail</Link>.
        </p>
        <p>
          It doesn't matter whether the pattern was constructed
          with <Link>Pattern::of()</Link>, <Link>pattern()</Link>, <Link>Pattern::inject()</Link> or <Link>Pattern::template()</Link>.
          The <Link>Detail</Link> is always the same.
        </p>
        <p>
          Checkout the documentation about <Link>Detail</Link>, which describes every <Link>Detail</Link> method.
        </p>
      </>,
    },
  ],
  replaceDetails: [
    {
      body: <PhpCode>{replaceDetails}</PhpCode>,
    },
    {
      title: 'Uniform API for matching and replacing',
      body: <>
        <p>
          <Link>pattern()-&gt;match()</Link> and <Link>pattern()-&gt;replace()</Link> callbacks
          receive the same interface <Link>Detail</Link>.
        </p>
        <p>
          <Link>Detail</Link> used for matching and replacing has exactly the same methods and
          returns the same values for given <code>$pattern</code> and <code>$subject</code>.
        </p>

        <p>
          You can also <Link>try it online</Link> in 10 seconds -
          there are examples in the as <Link>sandbox</Link> for your own tries.
        </p>
      </>,
    },
  ],
  features: [
    {
      title: 'Written with clean design in mind',
      body: <>
        <p>T-Regx utilises well designed interfaces, so your IDE will aid you as you type! We follow real SOLID and OOP.</p>
        <img src={weLoveStatic} style={{width: '75%'}} alt="We love static typing and IDE suggestions"/>
      </>,
      col: 5,
    },
    {
      body: <img src={phpstormTooltip} alt="Written with clean design in mind"/>,
      col: 7
    },
  ],
  preparedPatterns: [
    {
      title: 'Prepared patterns',
      body: <>
        <p>
          With <Link>Prepared Patterns</Link> you can safely build your regular expressions,
          without worrying about it becoming malformed or dangerous.
        </p>
        <p>
          <Markdown>
            T-Regx provides a wide variety of prepared patterns, for different needs:
            `Pattern::inject()`, `Pattern::list()`, `Pattern::mask()` and `Pattern::template()`.
          </Markdown>
        </p>
        <p>For constant patterns use <Link>Pattern::of()</Link> or simply <Link>pattern()</Link>.</p>
      </>
    },
    {body: <PhpCode>{preparedPatterns}</PhpCode>},
  ],
  facade: [
    {body: <PhpCode>{facade}</PhpCode>},
    {
      title: 'Different ways of instantiating Patterns',
      body: <>
        <p>
          <Markdown>
            Regardless of whether you build your pattern using `Pattern::of()`, `pattern()` helper,
            or maybe using prepared patterns like `Pattern::inject()`/`Pattern::alternate()`, the
            interface of `Pattern` is the same.
          </Markdown>
        </p>
        <p>
          <Markdown>
            Additionally, building patterns using `Pattern::mask()` or `Pattern::template()` also
            share the same `Pattern` interface.
          </Markdown>
        </p>
      </>
    },
  ],
  tryOnline: [
    {
      title: 'Try T-Regx online',
      body: <>
        <p>Before you install, you can try T-Regx online, right in your browser.</p>
        <p>
          You can use repl.it using your GitHub account, Facebook account or Google account -
          <Link>T-Regx on repl.it</Link>
        </p>
        <a href={tryItOnline}>
          <div style={{padding: '10px', borderRadius: '15px', backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
            <img src={login} alt="Repl.it login"/>
          </div>
        </a>
      </>
    },
    {
      body: <a href={tryItOnline}>
        <img src={example} alt="T-Regx online on Repl.it"/>
      </a>
    },
  ]
};
