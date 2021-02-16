import React, {FunctionComponent, ReactNode} from "react";
import CodeBlock from '@theme/CodeBlock';

export function stripPhp(code: string | string[]): string {
  if (Array.isArray(code)) {
    return code.map(stripPhp).join("\n");
  }
  return code.replace(/^<\?php\s+(use\s+[\w\\]+;\s+)*/, '').trim();
}

export const letter = (index: number): string => String.fromCharCode(index + 65);

interface CodeProperties {
  children: ReactNode
}

export const Code: FunctionComponent<CodeProperties> = ({children}: CodeProperties) =>
  <CodeBlock>{joinToString(children)}</CodeBlock>;

interface PhpProperties {
  children: string
}

export const PhpCode: FunctionComponent<PhpProperties> = ({children}: PhpProperties) =>
  <Code>{stripPhp(children)}</Code>;

function joinToString(code) {
  if (Array.isArray(code)) {
    return code.join("");
  }
  if (typeof code === "string") {
    return code;
  }
  console.error("code is not a string", code);
  throw "code in not a string";
}
