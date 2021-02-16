import React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import Layout from '@theme/Layout';

import DisqusThread from '../../components/DisqusThread/DisqusThread';
import supportLinks from '../../config/help';

export default function () {
  return <Layout>
    <div className="container margin-vert--xl">
      <div>
        <h1>Need help?</h1>
        <p>
          This project is maintained by a dedicated group of people. If you have experienced any bugs or problems,
          you're welcome to submit an <IssueLink>issue on github!</IssueLink> :) It never takes us more than
          24h to respond!
        </p>
        <div className="row">
          <SupportLinks/>
        </div>

        <DisqusThread
          title={'T-Regx Help'}
          identifier={'5afe7e280900a14e5a8edaae9a618a74'}/>
      </div>
    </div>
  </Layout>;
}

const IssueLink = ({children}) => {
  const issueLink = 'https://github.com/T-Regx/T-Regx/issues/new/choose';
  return <a href={issueLink}>{children}</a>
};

const SupportLinks = () => {
  return supportLinks.map(({title, content}, idx) => (
    <div key={idx} className={classNames('col margin-vert--md', {
      'col--4': idx <= 2,
      'col-6': idx > 2,
    })}>
      <h2>{title}</h2>
      <Markdown>{content}</Markdown>
    </div>
  ));
};
