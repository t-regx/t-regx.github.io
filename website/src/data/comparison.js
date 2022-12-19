import React from 'react';

import PregSuperposition from "../components/PregSuperposition/PregSuperposition";
import Link from "../components/Link/Link";

const actuallyTriesToGetTheGroup = <>
  Actually tries to get the group
  <sup>Depending on PHP settings, either returns <code>null</code> and/or issues a warning</sup>
</>;

const pregLastErrorReturnsSuccess = <li>
  <Link>preg_last_error()</Link> returns <b>success</b> code
  <sup>(returns <Link>PREG_NO_ERROR</Link>)</sup>
</li>;

const pregMethodsReturnDifferentErrorCodes = <li>
  Methods <PregSuperposition/> return different error values
  <sup>(some return <code>false</code>, others <code>null</code> or <code>[]</code>)</sup>
</li>;

const pregLastErrorReturnsError = <li><Link>preg_last_error()</Link> returns error code</li>;
const phpIssuesWarning = <li>PHP issues a warning<sup>(depending on the setting of <Link>"display_errors"</Link> and <Link>error_reporting()</Link></sup></li>;
const phpIssuesNothing = <li>PHP doesn't issue any other warning or error</li>;

export const safeRegexVsPhp = [
  {
    title: <>Using na invalid pattern<sup>(eg. <code>/unclosed[A-/</code>)</sup></>,
    php: <ul>
      {pregMethodsReturnDifferentErrorCodes}
      {pregLastErrorReturnsSuccess}
      {phpIssuesWarning}
    </ul>,
    tRegx: <>T-Regx throws <code>MalformedPatternException</code><sup>with descriptive message</sup></>,
  },
  {
    title: <>Corrupted subject<sup>(eg. malformed utf-8 sequence)</sup></>,
    php: <ul>
      {pregMethodsReturnDifferentErrorCodes}
      {pregLastErrorReturnsError}
      {phpIssuesNothing}
    </ul>,
    tRegx: <>T-Regx throws <code>SubjectEncodingException</code> <sup>with descriptive message</sup></>,
  },
  {
    title: <>Using an overly complex pattern<sup>(eg. containing <code>?R</code>)</sup></>,
    php: <ul>
      {pregMethodsReturnDifferentErrorCodes}
      {pregLastErrorReturnsError}
      {phpIssuesNothing}
    </ul>,
    tRegx: <>T-Regx throws <code>RecursionException</code> <sup>with descriptive message</sup></>,
  },
  {
    title: 'Returning an invalid replacement value',
    php: <ul>
      {pregLastErrorReturnsSuccess}
      <li>
        Depending on the value, PHP:
        <ul>
          <li>
            Silently converts the value to string
            <sup>(for example for <code>int</code> or <code>"1"</code>/<code>"0"</code> for <code>bool</code>)</sup>
          </li>
          <li>Raises a warning <sup>(for example for <code>array</code>)</sup></li>
          <li>
            Throws a fatal error, terminating the application
            <sup>(for example for <Link>stdClass</Link> or objects without <Link>__toString()</Link>)</sup>`
          </li>
        </ul>
      </li>
    </ul>,
    tRegx: <>T-Regx throws <code>InvalidReplacementException</code> <sup>with descriptive message</sup></>,
  },
];

export const cleanRegexVsPhp = [
  {
    title: <>Using an invalid capturing group name<sup>(eg. name <code>"!@#$"</code> or index <code>-2</code>)</sup></>,
    php: actuallyTriesToGetTheGroup,
    tRegx: <>T-Regx throws <Link>\InvalidArgumentException</Link> <sup>with descriptive message</sup></>,
  },
  {
    title: <>Using a nonexistent group<sup>(group name typo, group deleted)</sup></>,
    php: actuallyTriesToGetTheGroup,
    tRegx: <>T-Regx throws <code>NonexistentGroupException</code> <sup>with descriptive message</sup></>,
  },
  {
    title: <>Using an unmatched optional group<sup>(conditional group, unmatched by subject)</sup></>,
    php: actuallyTriesToGetTheGroup,
    tRegx: <>T-Regx throws <code>GroupNotMatchedException</code> <sup>with descriptive message</sup></>,
  },
  {
    title: <>Offsets in UTF-8, for example for <code>"18€"</code></>,
    php: <>5 bytes<sup>PHP offsets are in bytes</sup></>,
    tRegx: <ul>
      <li>3 characters<sup>With method <code>offset()</code></sup></li>
      <li>5 bytes<sup>With method <code>byteOffset()</code></sup></li>
    </ul>
  },
  {
    title: `Worst case complexity`,
    php: <>
      <p><code>(string|int|null)[][][]</code></p>
      array of arrays of arrays of <code>string</code>/<code>null</code> and <code>int</code>
      <sup>
        <Link>preg_match_all()</Link> with <Link>PREG_OFFSET_CAPTURE</Link>
      </sup>
    </>,
    tRegx: <><code>string[]</code><sup>array of strings</sup></>,
  },
  {
    title: 'Possible outcomes when testing a subject',
    php: <ul>
      <li><code>1</code>/<code>0</code> - matches or differs</li>
      <li><code>false</code> - for certain errors</li>
      <li>issues a warning - for other errors</li>
      <li>silenced - for yet other errors</li>
    </ul>,
    tRegx: <ul>
      <li><code>true</code>/<code>false</code> - matches or differs</li>
      <li><code>MalformedPatternException</code> - malformed pattern</li>
    </ul>
  }
];
