const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const CustomGridBlock = require(`${process.cwd()}/core/CustomGridBlock`);
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const HeaderButton = require(`${process.cwd()}/core/HeaderButton`);
const BadgesSection = require(`${process.cwd()}/core/BadgesSection`);
const DisqusSection = require(`${process.cwd()}/core/DisqusSection`);
const GithubButton = require(`${process.cwd()}/core/GithubButton`);
const AutomaticSplashLogo = require(`${process.cwd()}/core/AutomaticSplashLogo`);

function mp4Url(img) {
    return `${siteConfig.baseUrl}mp4/${img}`;
}

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const ProjectTitle = () => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
        <ul className="iconList">
            <li>Performance</li>
            <li>Consistency</li>
            <li>Reliability</li>
        </ul>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        const language = this.props.language || '';
        return (
            <SplashContainer>
                <AutomaticSplashLogo/>
                <div className="inner">
                    <ProjectTitle/>
                    <GithubButton href={siteConfig.mainRepoUrl}/>
                    <PromoSection>
                        <HeaderButton href={docUrl('installation', language)}>Installation</HeaderButton>
                        <HeaderButton href={docUrl('match', language)}>Matching</HeaderButton>
                        <HeaderButton href={docUrl('replace-with', language)}>Replacing</HeaderButton>
                        <div className="separator"/>
                        <HeaderButton href={docUrl('overview', language)}>What's T-Regx</HeaderButton>
                        <HeaderButton href={docUrl('whats-the-point', language)}>Why use T-Regx?</HeaderButton>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

const Block = props => (
    <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <CustomGridBlock align="center" contents={props.children} layout={props.layout}/>
    </Container>
);

const CommentsSection = props => (
    <Container id={props.id} background={props.background}>
        <DisqusSection/>
    </Container>
);

const FunctionalProgramming = () => (
    <Block>
        {[
            {
                title: 'Functional programming',
                content: "T-Regx utilizes chainable, functional programming with methods like `filter()`, [`map()`](docs/match-map), "
                    + "[`flatMap()`](docs/match-map#flatmap), [`first()`](docs/match-first)/[`forFirst()`](docs/match-for-first), etc.",
                video: mp4Url('functional.mp4'),
                videoAlign: 'left',
            },
        ]}
    </Block>
);

const MatchDetails = () => (
    <Block background="light">
        {[
            {
                title: 'Match details',
                content: "With [`pattern()->match()`](docs/match) and [`pattern()->replace()`](docs/replace), it's trivial to retrieve, iterate, map and filter matches with callbacks and a detailed [`Match` object](docs/match-details).",
                video: mp4Url('match-details.mp4'),
                videoAlign: 'right',
            },
        ]}
    </Block>
);

const Features = () => (
    <Block layout="fourColumn">
        {[
            {
                title: 'Written with clean design in mind',
                content: '`No Reflection used`, `No (...varargs)`, `No (boolean arguments, true)`, `(No flags, 1)`'
            },
            {
                title: 'Based on exceptions!',
                content: 'If any error occurs while using regexp (invalid pattern, malformed UTF8, backtrack limit, nonexistent group, anything!) T-Regx throws an exception.'
            },
        ]}
    </Block>
);

const Installation = () => (
    <div>
        <BadgesSection/>
        <Block layout="threeColumn" align="left">
            {[
                {
                    title: '',
                    content: '![](img/t.regx.installation.png)',
                },
                {
                    title: 'Installation',
                    content: '    composer require rawr/t-regx',
                },
                {
                    title: ''
                }
            ]}
        </Block>
    </div>
);

const AutomaticDelimiters = () => (
    <Block background="dark" id="scroll-background">
        {[
            {
                title: 'Automatic delimiters',
                content: "You no longer need to delimiter your patterns. [T-Regx' smart delimiterer](docs/delimiters) will add one of many"
                    + " delimiters for you, if they're not already present.",
                video: mp4Url('delimiters.mp4'),
                videoAlign: 'right',
            },
        ]}
    </Block>
);

const WarningsToExceptions = () => (
    <Block background="dark" id="scroll-background">
        {[
            {
                title: 'SafeRegex | Converts warnings to exceptions',
                content: "SafeRegex watches for warnings, analyzes `preg_()` methods return values and looks up `preg_last_error()` to validate a call. If it fails, an exception is thrown.",
                video: mp4Url('safe.regex.mp4'),
                videoAlign: 'left',
            },
        ]}
    </Block>
);

class Index extends React.Component {
    render() {
        const language = this.props.language || '';
        return (
            <div>
                <HomeSplash language={language}/>
                <div className="mainContainer">
                    <AutomaticDelimiters/>
                    <Installation/>
                    <MatchDetails/>
                    <Features/>
                    <WarningsToExceptions/>
                    <FunctionalProgramming/>
                    <CommentsSection/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
