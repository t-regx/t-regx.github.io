import React from 'react';
import classNames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import {AutomaticSplashLogo, BadgesSection, DisqusThread} from '../components';
import phpQuestions from "../components/QuizPhp/questions";
import GithubButton from "../components/GithubButton";
import {playgroundUrl} from "../../consts";
import {Markdown} from "../components/Utils/code";
import Quiz from "../components/Quiz/components/Quiz";

import sections from '../data/index.js';
import styles from './styles.module.css';

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
      <Installation/>
      <MatchDetails/>
      <Features/>
      <FunctionalProgramming/>
      <Empty/>
      <CommentsSection/>
    </div>
  </Layout>;
}

const HomeSplash = ({title, tagline}) => (
  <SplashContainer>
    <AutomaticSplashLogo/>
    <ProjectTitle title={title} tagline={tagline}/>
    <GithubButton/>
    <PromoSection>
      <HeaderButton to="docs/installation">Installation</HeaderButton>
      <HeaderButton to="docs/introduction">See Docs</HeaderButton>
      <HeaderButton href={playgroundUrl}>Try online!</HeaderButton>
    </PromoSection>
  </SplashContainer>
);

const QuizOpeningSlide = () => {
  return <Quiz
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

const Installation = () => (
  <GridBlock columns={sections.installation} center layout="threeColumn">
    <BadgesSection/>
  </GridBlock>
);

const MatchDetails = () => <GridBlock columns={sections.matchDetails} lightBackground/>;
const Features = () => <GridBlock columns={sections.features} layout="fourColumn"/>;
const Empty = () => <GridBlock columns={sections.empty}/>;

const FunctionalProgramming = () =>
  <GridBlock darkBackground scrollableBackground columns={sections.functionalProgramming}/>;

const CommentsSection = () => <div className="container">
  <DisqusThread/>
</div>;

const SplashContainer = props => (
  <div className="hero">
    <div className="container">
      <div className="text--center">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = props => (
  <h2 className={styles.projectTitle}>
    {props.title}
    <p className={styles.projectSubtitle}>{props.tagline}</p>
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
  <Link className={classNames('button button--outline button--primary button--md')} to={href || useBaseUrl(to)}>
    {children}
  </Link>
);

const Button = ({children, onClick}) => (
  <Link className={classNames('button button--outline button--primary button--md')} onClick={onClick}>
    {children}
  </Link>
);

const GridBlock = props => (
  <div className={classNames('padding-vert--xl', {
    [styles.scrollBackground]: props.scrollableBackground,
    [styles.darkBackground]: props.darkBackground,
    [styles.lightBackground]: props.lightBackground,
    'text--center': props.center,
  })}>
    <div className="container">
      {props.children}
      {props.columns && <div className="row">
        {props.columns.map((column, index) => (
          <div key={index} className="col">
            {column.title && <h2>{column.title}</h2>}

            {column.content && <div>
              <Markdown>{column.content}</Markdown>
            </div>}
          </div>
        ))}
      </div>}
    </div>
  </div>
);

const ColumnGrid = props => <div className="container">
  <div className="row">
    {props.children.map((child, index) => <div key={index} className="col">{child}</div>)}
  </div>
</div>;
