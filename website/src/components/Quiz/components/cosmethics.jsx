import React from "react";
import CodeBlock from '@theme/CodeBlock';
import {joinToString} from "../../Utils/code";

export function stripPhp(code) {
  return code.replace(/^<\?php\s+(use\s+[\w\\]+;\s+)*/, '').trim();
}

export function letter(index) {
  return String.fromCharCode(index + 65);
}

export const Code = ({children}) => <CodeBlock>{joinToString(children)}</CodeBlock>;
export const PhpCode = ({children}) => <Code>{stripPhp(children)}</Code>;
