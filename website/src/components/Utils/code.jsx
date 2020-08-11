import React from "react";
import CodeBlock from '@theme/CodeBlock';
import MarkdownToJsx from "markdown-to-jsx";

export function joinToString(children) {
  return Array.isArray(children) ? children.join("") : children;
}

export const Markdown = ({children}) => <MarkdownToJsx options={{overrides: {pre: CustomCodeBlock}}}>
  {joinToString(children)}
</MarkdownToJsx>;

const CustomCodeBlock = ({children}) => <CodeBlock {...children.props}  />;
