const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function gifUrl(img) {
    return `${siteConfig.baseUrl}gif/${img}`;
}

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href} target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: '_self',
};

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const Logo = props => (
    <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo"/>
    </div>
);

const ProjectTitle = () => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
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
                <Logo img_src={imgUrl('t.regx.png')}/>
                <div className="inner">
                    <ProjectTitle/>
                    <PromoSection>
                        <Button href={docUrl('installation', language)}>Try It Out</Button>
                        <Button href={docUrl('match', language)}>Matching</Button>
                        <Button href={docUrl('replace-with', language)}>Replacing</Button>
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

const Features = () => (
    <Block layout="fourColumn">
        {[
            {
                title: 'Automatic delimiters',
                content: 'This is the content of my feature',
                image: gifUrl('first.gif'),
                imageAlign: 'top',
            },
            {
                title: 'Converting warnings to exceptions',
                content: 'The content of my second feature',
                image: gifUrl('second.gif'),
                imageAlign: 'top',
            },
        ]}
    </Block>
);

const FeatureCallout = () => (
    <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
    </div>
);

const AutomaticDelimiters = () => (
    <Block background="light">
        {[
            {
                title: 'Automatic delimiters',
                content: "You no longer need to delimiter your patterns. [T-Regx' smart delimiterer](docs/delimiters) will add one of many"
                    + " delimiters for you, if they're not already present.",
                image: gifUrl('first.gif'),
                imageAlign: 'right',
            },
        ]}
    </Block>
);

const WarningsToExceptions = () => (
    <Block id="try" background="dark">
        {[
            {
                title: 'SafeRegex | Converts warnings to exceptions',
                content: "SafeRegex watches for warnings, analyzes `preg_*()` methods' return values and looks up last preg errors to validate a call. If it fails, an exception is thrown.",
                image: gifUrl('second.gif'),
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
                content: "With `pattern()->match()` and `pattern()->replace()`, it's trivial to retrieve, iterate, map and filter matches with callback and a detailed `Match` object.",
                image: gifUrl('match-details.gif'),
                imageAlign: 'right',
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
                    <MatchDetails/>
                    <Features/>
                    <AutomaticDelimiters/>
                    <FeatureCallout/>
                    <WarningsToExceptions/>
                </div>
            </div>
        );
    }
}

module.exports = Index;
