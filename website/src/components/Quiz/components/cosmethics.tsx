import React, {FunctionComponent} from "react";
import CodeBlock from '@theme/CodeBlock';
import {joinToString} from "../../Utils/code";

export function stripPhp(code: string | string[]): string {
  if (Array.isArray(code)) {
    return code.map(stripPhp).join("\n");
  }
  return code.replace(/^<\?php\s+(use\s+[\w\\]+;\s+)*/, '').trim();
}

export function letter(index: number): string {
  return String.fromCharCode(index + 65);
}

interface CodeProperties {
  children: React.ReactNode
}

export const Code: FunctionComponent<CodeProperties> = ({children}: CodeProperties) =>
  <CodeBlock>{joinToString(children)}</CodeBlock>;

interface PhpProperties {
  children: string
}

export const PhpCode: FunctionComponent<PhpProperties> = ({children}: PhpProperties) =>
  <Code>{stripPhp(children)}</Code>;
