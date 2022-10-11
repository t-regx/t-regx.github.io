import React from 'react';

import TextSuperposition from "../../components/TextSuperposition/TextSuperposition";
import Link from "../../components/Link/Link";

import {wide, wider, narrow} from "./styles.module.scss";

export default function () {
  const methods = [
    <code className={wide}>preg::match()</code>,
    <code className={narrow}>preg::match_all()</code>,
    <code>preg::replace()</code>,
    <code className={wide}>preg::split()</code>,
    <code className={wider}>preg::grep()</code>,
    <code>preg::filter()</code>,
  ];

  return <Link to="/docs/introduction-preg#about-saferegex" title="Each preg::_ method in T-Regx (so preg::match, preg::replace, etc.)">
    <TextSuperposition texts={methods}/>
  </Link>;
}
