import React, {ReactNode} from "react";
import CodeBlock from '@theme/CodeBlock';

import style from './styles.module.css';

export default ({children, language}: CodeProperties) => (
  <div className={style.code}>
    <CodeBlock className={`language-${language || 'php'}`}>
      {code(children)}
    </CodeBlock>
  </div>
);

function code(children) {
  if (typeof children === 'string') {
    return children;
  }
  if (!Array.isArray(children)) {
    console.log(this.props.children);
    throw "Unexpected child of <Code>";
  }
  if (children.every(child => typeof child === 'string')) {
    return children.join('');
  }
}

interface CodeProperties {
  language?: string,
  children: ReactNode
}
