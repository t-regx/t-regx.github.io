export default {
  automaticDelimiters: [
    {
      title: 'Automatic delimiters',
      content:
        "You no longer need to delimiter your patterns. [T-Regx' smart delimiterer](docs/delimiters) will add one of many" +
        " delimiters for you, if they're not already present.",
    },
    {
      video: 'mp4/delimiters.mp4',
    },
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
    {
      title: '',
    },
  ],
  matchDetails: [
    {
      title: 'Match details',
      content:
        "With [`pattern()->match()`](docs/match) and [`pattern()->replace()`](docs/replace), it's trivial to retrieve, iterate, map and filter matches with callbacks and a detailed [`Match` object](docs/match-details).",
    },
    {
      video: 'mp4/match-details.mp4',
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
      content:
        'If any error occurs while using regexp (invalid pattern, malformed UTF8, backtrack limit, nonexistent group, anything!) T-Regx throws an exception.',
    },
  ],
  warningsToExceptions: [
    {
      video: 'mp4/safe.regex.mp4',
    },
    {
      title: 'SafeRegex | Converts warnings to exceptions',
      content:
        'SafeRegex watches for warnings, analyzes `preg_()` methods return values and looks up `preg_last_error()` to validate a call. If it fails, an exception is thrown.',
    },
  ],
  functionalProgramming: [
    {
      video: 'mp4/functional.mp4',
    },
    {
      title: 'Functional programming',
      content:
        'T-Regx utilizes chainable, functional programming with methods like `filter()`, [`map()`](docs/match-map), ' +
        '[`flatMap()`](docs/match-map#flatmap), [`first()`](docs/match-first)/[`forFirst()`](docs/match-for-first), etc.',
    },
  ],
};
