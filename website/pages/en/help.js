const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const DisqusSection = require(`${process.cwd()}/core/DisqusSection.js`);

function pageUrl(page, language) {
    return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

class Help extends React.Component {
    render() {
        const language = this.props.language || '';
        const supportLinks = [
            {
                title: 'Browse Docs',
                content: `Learn more using the [documentation on this site](${docUrl('introduction', language)}).`,
            },
            {
                title: 'Join the discussion!',
                content: 'Ask as many questions about the documentation and the project as you need. ![](img/t.regx.discussion.png)',
            },
            {
                title: 'Stay up to date',
                content: `Find out what's new with this project on [Blog](${pageUrl('blog', language)}).`,
            },
        ];
        const issueLink = 'https://github.com/T-Regx/T-Regx/issues/new/choose';
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
                        </p>
                        <GridBlock contents={supportLinks} layout="threeColumn" className="discussion-tregx-grid"/>
                        <DisqusSection/>
                    </div>
                </Container>
            </div>
        );
    }
}

module.exports = Help;
