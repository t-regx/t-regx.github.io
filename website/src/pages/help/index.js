import React from 'react';
import classnames from 'classnames';
import Markdown from 'markdown-to-jsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { DisqusThread } from '@site/src/components';
import supportLinks from '@site/src/data/help.js';
const issueLink = 'https://github.com/T-Regx/T-Regx/issues/new/choose';

function Help() {
  return (
    <Layout>
      <div className="container margin-vert--xl">
        <div>
          <h1>Need help?</h1>
          <p>
            This project is maintained by a dedicated group of people. If you
            have experienced any bugs or problems, you're welcome to submit an{' '}
            <a href={issueLink}>issue on github!</a> :) It never takes us more
            than 24h to respond!
          </p>

          <div className="row">
            {supportLinks.map(({ title, content }, idx) => (
              <div
                key={idx}
                className={classnames('col margin-vert--md', {
                  'col--4': idx <= 2,
                  'col-6': idx > 2,
                })}
              >
                <h2>{title}</h2>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>

          <DisqusThread />
        </div>
      </div>
    </Layout>
  );
}

export default Help;
