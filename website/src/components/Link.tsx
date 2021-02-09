import React from "react";

import Link from "@docusaurus/Link";

import {tryItOnline} from '../data/links';

export default ({to, children}: LinkProperties) => {
  if (to) {
    return <Link to={to}><code>{children}</code></Link>
  }
  if (codeLinks.hasOwnProperty(children)) {
    return <Link to={codeLinks[children]}><code>{children}</code></Link>
  }
  if (textLinks.hasOwnProperty(children)) {
    return <Link to={textLinks[children]}>{children}</Link>
  }
  console.log(`No default link for '${children}'`);
  return <code>{children}</code>;
};

interface LinkProperties {
  to?: string,
  children: string
}

const codeLinks = {
  'pattern()': 'docs/introduction-clean#entry-points',
  'Pattern::of()': 'docs/introduction-clean#entry-points',
  'Pattern::pcre()': 'docs/introduction-clean#entry-points',
  'Pattern::inject()': 'docs/handling-user-input',
  'Pattern::bind()': 'docs/handling-user-input',

  'Detail': 'docs/match-details',
  'pattern()->match()': 'docs/match',
  'pattern()->replace()': 'docs/replace',
};

const textLinks = {
  'try it online': tryItOnline,
  'sandbox': tryItOnline,
  'T-Regx on repl.it': tryItOnline,
  'prepared patterns': 'docs/handling-user-input',
  'Prepared Patterns': 'docs/handling-user-input',
};
