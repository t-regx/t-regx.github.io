import React from "react";
import CodeBlock from '@theme/CodeBlock';

import style from './styles.module.css';

export default class Code extends React.Component {
  render() {
    return <div className={style.code}>
      <CodeBlock className={`language-${this.language}`}>
        {this.code}
      </CodeBlock>
    </div>;
  }

  get language() {
    return this.props.language || 'php';
  }

  get code() {
    const children = this.props.children;
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      if (children.every(child => typeof child === 'string')) {
        return children.join('');
      }
    }
    console.log(this.props.children);
    throw "Unexpected child of <Code>";
  }
};
