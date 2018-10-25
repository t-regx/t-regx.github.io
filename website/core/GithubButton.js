const React = require('react');

class GithubButton extends React.Component {
    render() {
        return (
            <a
                className="github-button"
                href={this.props.href}
                title="See this project on GitHub"
                data-icon="octicon-star"
                data-show-count="true"
                data-count-href="/T-Regx/T-Regx/stargazers"
                data-count-aria-label="# stargazers on GitHub"
                aria-label="Star this project on GitHub">
                T-Regx
            </a>
        );
    }
}

module.exports = GithubButton;
