import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Code from '../Code/Code';

export default ({tregx, php}: CodeTabsProperties) => {
  return <Tabs defaultValue="t-regx" values={tabs(tregx, php)}>
    {tregx && <TabItem value="t-regx"><Code>{tregx}</Code></TabItem>}
    {php && <TabItem value="php"><Code>{php}</Code></TabItem>}
  </Tabs>;
}

function tabs(tregx: string, php: string) {
  const values = [
    tregx ? {label: 'T-Regx', value: 't-regx'} : {},
    php ? {label: 'PHP', value: 'php'} : {},
  ];
  return values.filter(obj => obj.value);
}

interface CodeTabsProperties {
  tregx: string,
  php: string,
}
