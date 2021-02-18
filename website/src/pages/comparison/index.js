import React from 'react';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';

import SafeRegexSuperposition from "../../components/SafeRegexSuperposition/SafeRegexSuperposition";
import PregSuperposition from "../../components/PregSuperposition/PregSuperposition";
import DisqusThread from '../../components/DisqusThread/DisqusThread';
import RotatedTable from "../../ui/RotatedTable/RotatedTable";
import Heading from "../../components/Heading/Heading";
import Link from "../../components/Link/Link";

import {cleanRegexVsPhp, safeRegexVsPhp} from '../../data/comparison';
import {tRegx, TRegx} from "../../config/nbhp";

import styles from "./styles.module.scss";

export default () => {
  return <Layout
    title="Comparison of T-Regx and PHP methods"
    description={`Comparison of standard PHP regex methods (preg_match(), preg_replace()...) and ${tRegx} functions (preg::match(), preg::replace()...) and as well as pattern() function.`}>
    <div className={`container margin-vert--xl ${styles.comparison}`}>
      <div className="row">
        <div className="col">
          <div className="text--center1 margin-bottom--xl">
            <Heading id="overview">Comparison table of plain PHP and <TRegx/></Heading>
            <p>
              Here's a little table of some of the differences between the behaviour
              of plain PHP <PregSuperposition/> methods and <TRegx/> API. This table intentionally
              shows the corner-cases and edge-cases, because that's the best way to illustrate
              differences between <TRegx/> and vanilla-PHP.
            </p>
          </div>

          <Heading h2 id="safe-regex">SafeRegex compared to PHP</Heading>
          <p>
            Table presents the most important differences in error handling and general maturity
            between <TRegx/> <SafeRegexSuperposition/> methods and PHP <PregSuperposition/> methods.
          </p>
          <RotatedTable rows={safeRegexVsPhp}/>

          <Heading h2 id="clean-regex">CleanRegex compared PHP</Heading>
          <p>
            This table shows difference between higher-level CleanRegex API <Link>pattern()</Link> and
            SafeRegex <SafeRegexSuperposition/> methods (which share the same interface as <PregSuperposition/>).
          </p>
          <RotatedTable rows={cleanRegexVsPhp}/>

          <DisqusThread title='Questions about T-Regx Comparison' identifier='7eb37bee54d5e7315fd19ebdc4c56cf7'/>
        </div>
        <div className="col col--3">
          <TOC toc={[
            {value: 'Comparison table overview', id: 'overview', children: []},
            {value: 'preg::method() vs. preg_method()', id: 'safe-regex', children: []},
            {value: 'pattern() vs. preg_method()', id: 'clean-regex', children: []},
          ]}/>
        </div>
      </div>
    </div>
  </Layout>;
};
