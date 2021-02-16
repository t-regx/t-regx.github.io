import React from "react";
import CodeBlock from '@theme/CodeBlock';
import MarkdownToJsx from "markdown-to-jsx";

export default ({children}) => <MarkdownToJsx
  options={{overrides: {pre: CustomCodeBlock}}}
  children={joinToString(children)}/>;

const CustomCodeBlock = ({children}) => <CodeBlock {...children.props}/>;

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
