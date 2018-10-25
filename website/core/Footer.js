const React = require('react');
const GithubButton = require('./GithubButton.js');

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? `${language}/` : '') + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <a href={this.props.config.baseUrl} className="nav-home">
                        {this.props.config.footerIcon && (
                            <img
                                src={this.props.config.baseUrl + this.props.config.footerIcon}
                                alt={this.props.config.title}
                                width="64"
                                height="52"
                            />
                        )}
                    </a>
                    <div>
                        <h5>Docs</h5>
                        <a href={this.docUrl('installation', this.props.language)}>
                            Getting Started
                        </a>
                        <a href={this.docUrl('match-for-first', this.props.language)}>
                            Documentation
                        </a>
                        <a href={this.docUrl('api/api', this.props.language)}>
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
