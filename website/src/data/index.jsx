import React from "react";
import {PhpCode} from "../components/Quiz/components/cosmethics";
import matchDetails from "./matchDetails.php";
import functionalProgramming from "./functionalProgramming.php";
import preparedPatterns from "./preparedPatterns.php";
import {Markdown} from "../components/Utils/code";
import login from "../../static/img/docs/replit.login.png";
import example from "../../static/img/docs/replit.example.png";
import phpstormTooltip from "../../static/img/pages/phpstorm.tooltip.png";

const tryItOnline = "https://repl.it/github/T-Regx/fiddle";
import weLoveStatic from "../../static/img/t.regx.static.png";

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
  matchDetails: [
    {
      body: <PhpCode>{matchDetails}</PhpCode>,
    },
    {
      title: 'Match details',
      body: <>
        <p>
          <Markdown>
            With [`pattern()->match()`](docs/match) and [`pattern()->replace()`](docs/replace), it's trivial to
            retrieve, iterate, map and filter matches with callbacks and a detailed
            [`Match` object](docs/match-details).
          </Markdown>
        </p>
        <p>
          <Markdown>
            Checkout the documentation about [`Match` object](docs/match-details) with all
            [`Match`](docs/match-details) methods. You can also [try it online]({tryItOnline}) in 10 seconds -
            there are examples as well as [sandbox]({tryItOnline}) for your own tries.
          </Markdown>
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
  functionalProgramming: [
    {body: <PhpCode>{functionalProgramming}</PhpCode>},
    {
      title: 'Functional programming',
      body: <>
        <p>
          <Markdown>
            You can use either `pattern()` or `Pattern::of()`, whatever you prefer.
          </Markdown>
        </p>
        <p>
          <Markdown>
            T-Regx utilizes chainable, functional programming with methods like `filter()`, [`map()`](docs/match-map),
            [`flatMap()`](docs/match-map#flatmap), [`first()`](docs/match-first)/[`findFirst()`](docs/match-find-first),
            etc.
          </Markdown>
        </p>
        <p>
          <Markdown>
            Apart from standard functional methods, T-Regx provides dedicated methods, suited more for working with
            `string`s and capturing groups from T-Regx, like `map()`, `mapIfExists()`, `mapAndCallback()`, etc.
          </Markdown>
        </p>
      </>
    },
  ],
  preparedPatterns: [
    {
      title: 'Prepared patterns',
      body: <>
        <p>
          <Markdown>
            With [PreparedPatterns](docs/handling-user-input) you can safely build your regular expressions,
            without worrying about it becoming malformed or dangerous.
          </Markdown>
        </p>
        <p>
          <Markdown>
            T-Regx provides a wide variety of prepared patterns, for different needs:
            `Pattern::prepare()`, `Pattern::inject()`, `Pattern::bind()`, `Pattern::compose()`,
            `Pattern::format()` and `Pattern::template()`.
          </Markdown>
        </p>
        <p>
          <Markdown>
            For constant patterns use `Pattern::of()` or simply `pattern()`.
          </Markdown>
        </p>
      </>
    },
    {body: <PhpCode>{preparedPatterns}</PhpCode>},
  ],
  tryOnline: [
    {
      title: 'Try T-Regx online',
      body: <>
        <p>Before you install, you can try T-Regx online, right in your browser.</p>
        <p>
          You can use repl.it using your GitHub account, Facebook account or Google account -
          <a href={tryItOnline}>T-Regx on repl.it</a>
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
