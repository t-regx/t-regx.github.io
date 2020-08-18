import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Code from '../Code';

export default ({tregx, php}) => {
  const values = [
    tregx ? {label: 'T-Regx', value: 't-regx'} : {},
    php ? {label: 'PHP', value: 'php'} : {},
  ].filter(obj => obj.value)

  return <Tabs defaultValue="t-regx" values={values} groupId="language">
    {tregx && <TabItem value="t-regx"><Code>{tregx}</Code></TabItem>}
    {php && <TabItem value="php"><Code>{php}</Code></TabItem>}
  </Tabs>;
}
