const React = require('react');
const GithubButton = require('./GithubButton.js');
const FooterIcon = require('./FooterIcon.js');
const DisqusSection = require(`./DisqusSection.js`);

class Footer extends React.Component {
    docUrl(doc) {
        return `${this.props.config.baseUrl}docs/${doc}`;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <FooterIcon baseUrl={this.props.config.baseUrl}/>
                    <div>
                        <h5>Docs</h5>
                        <a href={this.docUrl('installation')}>
                            Installation
                        </a>
                        <a href={this.docUrl('introduction')}>
                            Getting Started
                        </a>
                        <a href={this.docUrl('match')}>
                            Documentation
                        </a>
                        <a href="https://github.com/T-Regx/T-Regx/blob/master/ChangeLog.md#api">
                            API Reference
                        </a>
                    </div>
                    <div>
                        <h5>More</h5>
                        <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
                        <a href={this.props.config.mainRepoUrl} target="_blank">GitHub</a>
                        <GithubButton href={this.props.config.mainRepoUrl}/>
                    </div>
                </section>

                <section className="copyright">{this.props.config.copyright}</section>

                <section className="sitemap discussion-section">
                    <DisqusSection/>
                </section>
            </footer>
        );
    }
}

module.exports = Footer;
