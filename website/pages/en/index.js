const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const HeaderButton = require(`${process.cwd()}/core/HeaderButton`);
const BadgesSection = require(`${process.cwd()}/core/BadgesSection`);
const DisqusSection = require(`${process.cwd()}/core/DisqusSection`);

function gifUrl(img) {
    return `${siteConfig.baseUrl}gif/${img}`;
}

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
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

const Logo = props => (
    <div className="projectLogo">
        <img src={props.src} alt="Project Logo" title={props.title || ''}/>
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

class SplashImage extends React.Component {
    render() {
        const images = {
            regular: {src: 't.regx.png', title: 'T-Regx'},
            christmas: {src: 't.regx.santa.png', title: 'Santa T-Regx'},
            carnival: {src: 't.regx.carnival.png', title: 'Carnival T-Regx'}
        };
        const splash = images[this.props.name];
        return <Logo src={imgUrl(splash.src)} title={splash.name}/>;
    }
}

class HomeSplash extends React.Component {
    render() {
        const language = this.props.language || '';
        return (
            <SplashContainer>
                <SplashImage name='carnival'/>
                <div className="inner">
                    <ProjectTitle/>
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
        <GridBlock align="center" contents={props.children} layout={props.layout}/>
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
                content: "T-Regx utilizes chainable, functional programming with methods like `filter()`, `map()`, `flatMap()`, `first()`/`forFirst()` etc.",
                image: gifUrl('functional.gif'),
                imageAlign: 'left',
            },
        ]}
    </Block>
);

const MatchDetails = () => (
    <Block background="light">
        {[
            {
                title: 'Match details',
                content: "With `pattern()->match()` and `pattern()->replace()`, it's trivial to retrieve, iterate, map and filter matches with callbacks and a detailed `Match` object.",
                image: gifUrl('match-details.gif'),
                imageAlign: 'right',
            },
        ]}
    </Block>
);

const Features = () => (
    <Block layout="fourColumn">
        {[
            {
                title: 'Written with clean design in mind',
                content: '`No varargs`, `No boolean arguments`, `No flags`, `No Reflection used`',
                image: gifUrl('delimiters.gif'),
            },
            {
                title: 'Always and exception!',
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
                image: gifUrl('delimiters.gif'),
                imageAlign: 'right',
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
                image: gifUrl('safe.regex.gif'),
                imageAlign: 'left',
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
