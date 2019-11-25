import React from 'react';
import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  AutomaticSplashLogo,
  GithubButton,
  DisqusThread,
  BadgesSection,
} from '@site/src/components';
import sections from '@site/src/data/index.js';
import styles from './styles.module.css';

const CustomCodeBlock = ({ children, ...props }) => {
  return <CodeBlock {...children.props} />;
};

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
      <li>Performance</li>
      <li>Consistency</li>
      <li>Reliability</li>
    </ul>
  </h2>
);

const PromoSection = props => (
  <div className={styles.promoSection}>
    <div className={styles.headerButtons}>{props.children}</div>
  </div>
);

const HeaderButton = ({ to, children }) => (
  <Link
    className={classnames('button button--outline button--primary button--md')}
    to={useBaseUrl(to)}
  >
    {children}
  </Link>
);

const HomeSplash = ({ title, tagline, url }) => (
  <SplashContainer>
    <AutomaticSplashLogo />
    <ProjectTitle title={title} tagline={tagline} />
    <GithubButton href={url} />
    <PromoSection>
      <HeaderButton to="docs/installation">Installation</HeaderButton>
      <HeaderButton to="docs/match">Matching</HeaderButton>
      <HeaderButton to="docs/replace-with">Replacing</HeaderButton>
      <HeaderButton to="docs/handling-user-input">
        Prepared Patterns
      </HeaderButton>
      <div className={styles.separator} />
      <HeaderButton to="docs/overview">What's T-Regx</HeaderButton>
      <HeaderButton to="docs/whats-the-point">Why use T-Regx?</HeaderButton>
    </PromoSection>
  </SplashContainer>
);

const GridBlock = props => (
  <div
    className={classnames('padding-vert--xl', {
      [styles.scrollBackground]: props.scrollableBackground,
      [styles.darkBackground]: props.darkBackground,
      [styles.lightBackground]: props.lightBackground,
      'text--center': props.center,
    })}
  >
    <div className="container">
      {props.children}
      <div className="row ">
        {props.columns.map((column, index) => (
          <div key={index} className="col">
            {column.title && (
              <h2>
                <Markdown>{column.title}</Markdown>
              </h2>
            )}

            {column.content && (
              <div>
                <Markdown
                  options={{
                    overrides: {
                      pre: CustomCodeBlock,
                    },
                  }}
                >
                  {column.content}
                </Markdown>
              </div>
            )}

            {column.video && (
              <video
                src={column.video}
                playsInline
                autoPlay
                muted
                loop
                style={{ maxWidth: '100%' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CommentsSection = props => (
  <div className="comments">
    <div className="container">
      <DisqusThread />
    </div>
  </div>
);

const FunctionalProgramming = () => (
  <GridBlock columns={sections.functionalProgramming}></GridBlock>
);

const MatchDetails = () => (
  <GridBlock columns={sections.matchDetails} lightBackground></GridBlock>
);

const Features = () => (
  <GridBlock columns={sections.features} layout="fourColumn"></GridBlock>
);

const Installation = () => (
  <GridBlock columns={sections.installation} center layout="threeColumn">
    <BadgesSection />
  </GridBlock>
);

const AutomaticDelimiters = () => (
  <GridBlock
    columns={sections.automaticDelimiters}
    darkBackground
    scrollableBackground
  ></GridBlock>
);

const WarningsToExceptions = () => (
  <GridBlock
    columns={sections.warningsToExceptions}
    darkBackground
    scrollableBackground
  ></GridBlock>
);

function Index() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout>
      <HomeSplash
        title={siteConfig.title}
        tagline={siteConfig.tagline}
        url={siteConfig.mainRepoUrl}
      />
      <div className="mainContainer">
        <AutomaticDelimiters />
        <Installation />
        <MatchDetails />
        <Features />
        <WarningsToExceptions />
        <FunctionalProgramming />
        <CommentsSection />
      </div>
    </Layout>
  );
}

export default Index;
