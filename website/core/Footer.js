const React = require('react');
const GithubButton = require('./GithubButton.js');
const FooterIcon = require('./FooterIcon.js');

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
                            Getting Started
                        </a>
                        <a href={this.docUrl('match-for-first')}>
                            Documentation
                        </a>
                        <a href={this.docUrl('api/api')}>
                            API Reference
                        </a>
                    </div>
                    <div>
                        <h5>Community</h5>
                        <a
                            href="http://stackoverflow.com/questions/tagged/"
                            target="_blank"
                            rel="noreferrer noopener">
                            Stack Overflow
                        </a>
                        <a href="https://discordapp.com/">Project Chat</a>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer noopener">
                            Twitter
                        </a>
                    </div>
                    <div>
                        <h5>More</h5>
                        <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
                        <a href={this.props.config.mainRepoUrl} target="_blank">GitHub</a>
                        <GithubButton href={this.props.config.mainRepoUrl}/>
                    </div>
                </section>

                Some image here

                <section className="copyright">{this.props.config.copyright}</section>
            </footer>
        );
    }
}

module.exports = Footer;
