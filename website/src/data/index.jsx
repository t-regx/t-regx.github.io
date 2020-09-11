import React from "react";
import {PhpCode} from "../components/Quiz/components/cosmethics";
import matchDetails from "./matchDetails.php";
import functionalProgramming from "./functionalProgramming.php";
import {Markdown} from "../components/Utils/code";

const tryItOnline = "https://repl.it/github/T-Regx/fiddle";

export default {
  automaticDelimiters: [
    {
      title: 'Automatic delimiters',
      content:
        "You no longer need to delimiter your patterns. [T-Regx' smart delimiterer](docs/delimiters) will add one of many" +
        " delimiters for you, if they're not already present.",
    },
    {},
  ],
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
    {
      body: <PhpCode>{matchDetails}</PhpCode>,
    },
  ],
  features: [
    {
      title: 'Written with clean design in mind',
      content:
        '`No Reflection used`, `No (...varargs)`, `No (boolean arguments, true)`, `(No flags, 1)`',
    },
    {
      title: 'Based on exceptions!',
      body: <Markdown>
        If any error occurs while using regexp (invalid pattern, malformed UTF8, backtrack limit, nonexistent group,
        anything!) T-Regx throws an exception, contrary to vanilla-PHP regexp, which use `preg_last_error()` or
        warnings, which can't be `try`/`catch`ed.
      </Markdown>,
    },
  ],
  functionalProgramming: [
    {body: <PhpCode>{functionalProgramming}</PhpCode>},
    {
      title: 'Functional programming',
      body: <>
        <p>
          <Markdown>
            T-Regx utilizes chainable, functional programming with methods like `filter()`, [`map()`](docs/match-map),
            [`flatMap()`](docs/match-map#flatmap), [`first()`](docs/match-first)/[`forFirst()`](docs/match-for-first),
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
  empty: [
    {},
    {},
  ],
};
