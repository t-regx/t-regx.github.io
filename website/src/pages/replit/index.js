import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import {fiddleUrl} from "../../../consts";
import DisqusThread from '../../components/DisqusThread';
import example from "../../../static/img/docs/replit.example.png";
import login from "../../../static/img/docs/replit.login.png";

export default function () {
  return <Layout>
    <div className="container margin-vert--xl">
      <h1>Try T-Regx on repl.it</h1>
      <br/>
      <p>
        You can try T-Regx online, right in your browser using <Repl/>.
      </p>

      <Repl>
        <img src={example} alt="Repl.it T-Regx example"/>
      </Repl>
      <br/>
      <p>
        You can log in to <Repl/> with Github account, Google account, Facebook account or regular credentials.
      </p>

      <Repl>
        <img src={login} alt="Repl.it login example"/>
      </Repl>
      <br/><br/>

      <h3>Continue learning T-Regx</h3>

      <p>
        To learn more about T-Regx, try:
      </p>
      <ul>
        <li><Link href="/docs/installation">Installation</Link></li>
        <li><Link href="/docs/match">Matching</Link></li>
        <li><Link href="/docs/replace">Replacing</Link></li>
        <li><Link href="/docs/handling-user-input">Prepared Patterns</Link></li>
      </ul>

      <br/><br/>
      <br/><br/>

      <DisqusThread
        title={'T-Regx on repl.it'}
        identifier={'d500d2ce3d82db02628108e219c0d055'}/>
    </div>
  </Layout>;
}

function Repl({children}) {
  return <Link href={fiddleUrl}>{children ? children : 'repl.it'}</Link>;
}
