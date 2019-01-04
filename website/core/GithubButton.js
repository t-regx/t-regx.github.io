const React = require('react');

module.exports = props => (
    <a
        className="github-button"
        href={props.href}
        title="See this project on GitHub"
        data-icon="octicon-star"
        data-show-count="true"
        data-count-href="/T-Regx/T-Regx/stargazers"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star this project on GitHub">
        T-Regx
    </a>
);
