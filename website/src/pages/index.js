import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import AutomaticSplashLogo from "../components/AutomaticSplashLogo";
import SponsorButton from "../components/Github/SponsorButton";
import BadgesSection from "../components/BadgesSection";
import DisqusThread from "../components/DisqusThread/DisqusThread";
import phpQuestions from "../components/QuizPhp/questions";
import MountingQuiz from "../components/MountingQuiz/MountingQuiz";
import StarButton from "../components/Github/StarButton";
import GridBlock from "../components/GridBlock/GridBlock";
import Markdown from "../components/Markdown/Markdown";

import sections from '../config/sections';
import {fiddleUrl} from "../../consts";

import styles from './styles.module.scss';

export default function Index() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return <Layout>
    <HomeSplash
      title={siteConfig.title}
      tagline={siteConfig.tagline}/>
    <div className="mainContainer" style={{overflow: 'hidden'}}>
      <GridBlock darkBackground scrollableBackground>
        <QuizOpeningSlide/>
      </GridBlock>
      <GridBlock columns={sections.installation} center layout="threeColumn">
        <BadgesSection/>
      </GridBlock>
      <GridBlock columns={sections.test} lightBackground/>
      <GridBlock columns={sections.matchDetails} lightBackground/>
      <GridBlock columns={sections.replaceDetails} lightBackground/>
      <GridBlock columns={sections.preparedPatterns}/>
      <GridBlock columns={sections.replaceByGroupMap} darkBackground scrollableBackground/>
      <GridBlock columns={sections.tryOnline}/>
      <GridBlock columns={sections.features} layout="fourColumn" lightBackground/>
      <div className="container">
        <DisqusThread
          title='Questions about T-Regx'
          identifier='46dff8e37535ddb3571510672d1af48683bad013'/>
      </div>
    </div>
  </Layout>;
}

const HomeSplash = ({title, tagline}) => (
  <SplashContainer>
    <AutomaticSplashLogo/>
    <ProjectTitle title={title} tagline={tagline}/>
    <StarButton/>
    <PromoSection>
      <HeaderButton to="docs/installation">Installation</HeaderButton>
      <HeaderButton to="docs/introduction-safe">See Docs</HeaderButton>
      <HeaderButton href={fiddleUrl}>T-Regx fiddle - Try in your browser!</HeaderButton>
      <div style={{marginTop: '2px'}}>
        <SponsorButton/>
      </div>
    </PromoSection>
  </SplashContainer>
);

const QuizOpeningSlide = () => {
  return <MountingQuiz
    questions={phpQuestions}
    openingSlide={startQuiz =>
      <ColumnGrid>
        <OpeningQuizSplash onStartQuiz={startQuiz}/>
        <SafeRegexSplash/>
      </ColumnGrid>
    }
    finishSlide={() =>
      <ColumnGrid>
        <ClosingQuizSplash/>
        <SafeRegexSplash/>
      </ColumnGrid>
    }
  />;
};

const OpeningQuizSplash = ({onStartQuiz}) =>
  <div>
    <h1>Quiz about Vanilla-PHP regular expressions</h1>
    <p>
      Super easy, see for yourself how well you know Vanilla-PHP regular expressions.
      Maybe it turns out you don't need T-Regx, after all :)
    </p>
    {onStartQuiz && <Button onClick={onStartQuiz}>Start quiz</Button>}
  </div>;

const ClosingQuizSplash = () =>
  <div>
    <h1>Congratulations! Quiz completed!</h1>
    <p>
      You've finished the quiz! Feel free to see your result,
      or see the explanations of the answers. You can go back to
      previous answers and verify them.
    </p>
  </div>;

const SafeRegexSplash = () =>
  <div>
    <h1>SafeRegex converts warnings to exceptions</h1>
    <p>
      <Markdown>
        SafeRegex watches for warnings, analyzes `preg_()` methods return values and looks up
        `preg_last_error()` to validate a call. If it fails, an exception is thrown.
      </Markdown>
    </p>
  </div>;

const SplashContainer = props => (
  <div className="hero">
    <div className="container">
      <div className="text--center">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = ({title, tagline}) => (
  <h2 className={styles.projectTitle}>
    {title}
    <p className={styles.projectSubtitle}>{tagline}</p>
    <ul className={styles.iconList}>
      <li>Lightweight</li>
      <li>Reliable</li>
      <li>Secure</li>
      <li>Based on exceptions</li>
    </ul>
  </h2>
);

const PromoSection = props => (
  <div className={styles.promoSection}>
    <div className={styles.headerButtons}>{props.children}</div>
  </div>
);

const HeaderButton = ({to, href, children}) => (
  <Link
    className={'button button--outline button--primary button--md'} to={href || useBaseUrl(to)}
    style={{paddingTop: '4px', paddingBottom: '5px'}} /** this is just to match the height of Sponsor button */
  >
    {children}
  </Link>
);

const Button = ({children, onClick}) => (
  <Link className={'button button--outline button--primary button--md'} onClick={onClick}>
    {children}
  </Link>
);

const ColumnGrid = props => <div className="container">
  <div className="row">
    {props.children.map((child, index) => <div key={index} className="col">{child}</div>)}
  </div>
</div>;
