const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const DisqusSection = require(`${process.cwd()}/core/DisqusSection.js`);
const metaDescription = require(`${process.cwd()}/core/MetaDescription`);

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

class Help extends React.Component {
    render() {
        const issueLink = 'https://github.com/T-Regx/T-Regx/issues/new/choose';
        const language = this.props.language || '';
        const supportLinks = [
            {
                title: 'Browse Docs',
                content: `Learn more using the [documentation on this site](${docUrl('introduction', language)}).
                Feel free to visit:
                <ul>
                  <li><a href="${docUrl('match', language)}">Matching</a></li>
                  <li><a href="${docUrl('match-details', language)}">Match details</a></li>
                  <li><a href="${docUrl('replace', language)}">Replacing</a></li>
                  <li><a href="${docUrl('prepared-patterns', language)}">Prepared patterns</a></li>
                  <li><a href="${docUrl('delimiters', language)}">Automatic delimiters</a></li>
                  <li><a href="${docUrl('is-valid', language)}">Pattern validator</a></li>
                <ul>`,
            },
            {
                title: 'Stay up to date',
                content: `Find out what's new with this project on [Blog](${pageUrl('blog', language)}).
                 We'll inform about new releases in advances and anything that needs to happen sooner than a new version.
                 <p>Can you find a hidden Matrix reference? :)</p>
                 `,
            },
            {
                title: 'Create GitHub issue',
                content: `Issues on <a href=${issueLink}>github</a> are more than welcome. Feel free to
                <ul>
                    <li>create a <a href="https://github.com/T-Regx/T-Regx/issues/new?template=feature-request.md">feature request</a></li>
                    <li>report <a href="https://github.com/T-Regx/T-Regx/issues/new?template=i-found-a-bug.md">a bug</a></li> 
                    <li>or simply ask a <a href="https://github.com/T-Regx/T-Regx/issues/new?template=i-have-a-question.md">question</a></li>
                </ul>
                We'll answer as fast as we can :)`
            },
            {
                title: 'Robust Docs',
                content: `Continuous integration tests are being run for each code example in the documentation every new update of the documentation.
                That way, we can be 100% sure the code examples you see in the documentation are compatible with the given T-Regx version.`,
            },
            {
                title: 'Join the discussion below!',
                content: 'Ask as many questions about the documentation and the project as you need We\'ll try to answer them as fast as we can! ![](img/t.regx.discussion.png)',
            },
        ];
        return (
            <div className="docMainWrapper wrapper">
                <Container className="mainContainer documentContainer postContainer">
                    <div className="post">
                        <header className="postHeader">
                            <h1>Need help?</h1>
                        </header>
                        <p>
                            This project is maintained by a dedicated group of people. If you have experienced any bugs
                            or problems, you're welcome to submit an <a href={issueLink}>issue on github!</a> :)
                            It never takes us more than 24h to respond!
                        </p>
                        <GridBlock contents={supportLinks} layout="threeColumn" className="discussion-tregx-grid"/>
                        <DisqusSection/>
                    </div>
                </Container>
            </div>
        );
    }
}

Help.description = metaDescription;
module.exports = Help;
