import React from 'react';
import TextSuperposition from "../../components/TextSuperposition/TextSuperposition";

import {pregDocs} from "../../config/links";
import Link from "../../components/Link/Link";

import {wide, wider, narrow} from "./styles.module.scss";

export default function () {
  const pregMethods = [
    <code className={wide}>preg_match()</code>,
    <code className={narrow}>preg_match_all()</code>,
    <code >preg_replace()</code>,
    <code className={wide}>preg_split()</code>,
    <code className={wider}>preg_grep()</code>,
    <code>preg_filter()</code>,
  ];

  return <Link to={pregDocs} title="Each preg_ method in PHP (so preg_match, preg_replace, etc.)">
    <TextSuperposition texts={pregMethods}/>
  </Link>;
}
