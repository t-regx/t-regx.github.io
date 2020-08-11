import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Code from '../Code';

export default class CodeTabs extends React.Component {
  render() {
    return <Tabs defaultValue="t-regx" values={this.values} groupId="language">
      {this.props.tregx && <TabItem value="t-regx">
        <Code>{this.props.tregx}</Code>
      </TabItem>}
      {this.props.php && <TabItem value="php">
        <Code>{this.props.php}</Code>
      </TabItem>}
    </Tabs>;
  }

  get values() {
    return [
      this.props.tregx ? {label: 'T-Regx', value: 't-regx'} : {},
      this.props.php ? {label: 'PHP', value: 'php'} : {},
    ].filter(obj => obj.value);
  }
}
