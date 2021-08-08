import React from "react";

import Link from "@docusaurus/Link";

import {
  displayErrors,
  errorReporting,
  pregConstants,
  pregLastError,
  tryItOnline,
  stdClass,
  phpToString,
  pregMatchAll,
  invalidArgumentException,
  issueLink
} from '../../config/links';

export default ({issue, to, children, title}: LinkProperties) => {
  if (issue) {
    return <Link href={issueLink}>{children}</Link>
  }
  if (to) {
    return <Link to={to} title={title}>{children}</Link>
  }
  const {link, content} = linkAndText(children);
  if (link) {
    return <Link to={link} title={title} children={content}/>
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
  'pattern()': '/docs/introduction-clean#entry-points',
  'Pattern::of()': '/docs/introduction-clean#entry-points',
  'Pattern::pcre()': '/docs/introduction-clean#entry-points',
  'Pattern::inject()': '/docs/handling-user-input',
  'pattern()->test()': '/docs/match#test-a-subject',

  'Detail': '/docs/match-details',

  'preg_last_error()': pregLastError,
  'preg_match_all()': pregMatchAll,
  'error_reporting()': errorReporting,
  '"display_errors"': displayErrors,
  'PREG_NO_ERROR': pregConstants,
  'PREG_OFFSET_CAPTURE': pregConstants,
  stdClass,
  '__toString()': phpToString,
  '\\InvalidArgumentException': invalidArgumentException,
};

const textLinks = {
  'try it online': tryItOnline,
  'sandbox': tryItOnline,
  'T-Regx on repl.it': tryItOnline,
  'prepared patterns': '/docs/handling-user-input',
  'Prepared Patterns': '/docs/handling-user-input',
  'Blog': 'blog',
};

interface LinkProperties {
  issue: boolean,
  to?: string,
  children: string,
  title?: string,
}
