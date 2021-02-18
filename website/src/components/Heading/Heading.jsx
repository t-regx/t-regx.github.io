import React from "react";

import Heading from '@theme/Heading';

const H1 = Heading('h1');
const H2 = Heading('h2');
const H3 = Heading('h3');

import {heading} from "./style.module.scss";

export default function ({h2, h3, id, children}) {
  const Tag = h2 ? H2 : h3 ? H3 : H1;
  return <Tag id={id} children={children} className={heading}/>
}
