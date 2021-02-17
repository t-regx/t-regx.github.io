import React from "react";

import Link from "@docusaurus/Link";

import {tryItOnline} from '../../config/links';

export default ({to, children}: LinkProperties) => {
  if (to) {
    return <Link to={to}>{children}</Link>
  }
  const {link, content} = linkAndText(children);
  if (link) {
    return <Link to={link} children={content}/>
  }
  return content;
};

function linkAndText(key: string): {link?: string, content} {
  if (codeLinks.hasOwnProperty(key)) {
    return {content: <code>{key}</code>, link: codeLinks[key]};
  }
  if (textLinks.hasOwnProperty(key)) {
    return {content: key, link: textLinks[key]};
  }
  if (elementLinks.hasOwnProperty(key)) {
    return elementLinks[key];
  }
  console.log(`No default link for '${key}'`);
  return {content: <code>{key}</code>};
}

const elementLinks: {[key: string]: {content: string, link: string}} = {
  'pattern().match()': {content: 'pattern()->match()', link: 'docs/match'},
  'pattern().replace()': {content: 'pattern()->replace()', link: 'docs/replace'},
};

const codeLinks = {
  'pattern()': 'docs/introduction-clean#entry-points',
  'Pattern::of()': 'docs/introduction-clean#entry-points',
  'Pattern::pcre()': 'docs/introduction-clean#entry-points',
  'Pattern::inject()': 'docs/handling-user-input',
  'Pattern::bind()': 'docs/handling-user-input',

  'Detail': 'docs/match-details',
};

const textLinks = {
  'try it online': tryItOnline,
  'sandbox': tryItOnline,
  'T-Regx on repl.it': tryItOnline,
  'prepared patterns': 'docs/handling-user-input',
  'Prepared Patterns': 'docs/handling-user-input',
  'Blog': 'blog',
};

interface LinkProperties {
  to?: string,
  children: string
}
