import React from 'react';

import Layout from '@theme/Layout';

import DisqusThread from '../../components/DisqusThread/DisqusThread';
import {bugReport, featureRequest, questionIssue} from "../../config/links";
import Link from "../../components/Link/Link";

import discussion from "../../../static/img/t.regx.discussion.png";

export default function () {
  return <Layout>
    <div className="container margin-vert--xl">
      <div>
        <h1>Need help?</h1>
        <p>
          This project is maintained by a dedicated group of people. If you have experienced any bugs or problems,
          you're welcome to submit an <Link issue>issue on github!</Link> :) It never takes us more than
          48h to respond!
        </p>

        <div className="row">
          <SupportLinks/>
        </div>

        <DisqusThread title='T-Regx Help' identifier='5afe7e280900a14e5a8edaae9a618a74'/>
      </div>
    </div>
  </Layout>;
}

const SupportLinks = () => {
  return <>
    <div className="col col--4">
      <h2>Browse Docs</h2>
      <p>Learn more using the <Link to="/docs/introduction-safe">documentation on this site</Link>. Feel free to visit:</p>
      <ul>
        <li><Link to="/docs/match">Matching</Link></li>
        <li><Link to="/docs/match-details">Match details</Link></li>
        <li><Link to="/docs/replace">Replacing</Link></li>
        <li><Link to="/docs/prepared-patterns">Prepared patterns</Link></li>
        <li><Link to="/docs/delimiters">Automatic delimiters</Link></li>
      </ul>
    </div>

    <div className="col col--4">
      <h2>Stay up to date</h2>
      <p>
        Find out what's new with this project on <Link>Blog</Link>. We'll inform about new releases in
        advances and anything that needs to happen sooner than a new version.
      </p>
      <p>Can you find a hidden Matrix reference? :)</p>
    </div>

    <div className="col col--4">
      <h2>Create GitHub issue</h2>
      <p>Issues on <Link issue>github</Link> are more than welcome. Feel free to:</p>
      <ul>
        <li>create a <Link to={featureRequest}>feature request</Link></li>
        <li>report <Link to={bugReport}>a bug</Link></li>
        <li>or simply ask a <Link to={questionIssue}>question</Link></li>
      </ul>
      <p>We'll answer as fast as we can :)</p>
    </div>

    <div className="col col--6">
      <h2>Robust Docs</h2>
      <p>
        Continuous integration tests are being run for each code example in the documentation every new update of the documentation.
        That way, we can be 100% sure the code examples you see in the documentation are compatible with the given T-Regx version.
      </p>
    </div>

    <div className="col col--6">
      <h2>Join the discussion below!</h2>
      <p>Ask as many questions about the documentation and the project as you need We'll try to answer them as fast as we can!</p>
      <img style={{transform: 'scale(0.7)'}} src={discussion} alt="Hey, you! Ask me questions, or join the discussion!"/>
    </div>
  </>;
};
