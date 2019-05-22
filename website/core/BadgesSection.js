const React = require('react');

const Badge = (props) =>
    <a href={props.href} title={props.title}>
        <img src={props.src} alt={props.title} className="badge"/>
    </a>;

const UpperBadges = () =>
    <div className="upper-badges">
        <Badge
            title="Build Status"
            src="https://travis-ci.org/T-Regx/T-Regx.svg?branch=master"
            href="https://travis-ci.org/T-Regx/T-Regx"/>
        <Badge
            title="Coverage Status"
            src="https://coveralls.io/repos/github/T-Regx/T-Regx/badge.svg?branch=master"
            href="https://coveralls.io/github/T-Regx/T-Regx?branch=master"/>
        <Badge
            title="Dependencies"
            src="https://img.shields.io/badge/dependencies-0-brightgreen.svg"
            href="https://github.com/T-Regx/T-Regx"/>
        <Badge
            title="Repository Size"
            src="https://github-size-badge.herokuapp.com/T-Regx/T-Regx.svg"
            href="https://github.com/T-Regx/T-Regx"/>

        <Badge
            title="License"
            src="https://img.shields.io/github/license/T-Regx/T-Regx.svg"
            href="https://github.com/T-Regx/T-Regx"/>

        <Badge
            title="GitHub last commit"
            src="https://img.shields.io/github/last-commit/T-Regx/T-Regx/develop.svg"
            href="https://github.com/T-Regx/T-Regx/commits/develop"/>
        <Badge
            title="GitHub commit activity"
            src="https://img.shields.io/github/commit-activity/y/T-Regx/T-Regx.svg"
            href="https://github.com/T-Regx/T-Regx"/>
    </div>;

const LowerBadges = () =>
    <div className="lower-badges">
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-5.3%2B-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-5.6%2B-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-7.1-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-7.2-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-7.3-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PHP Version"
            src="https://img.shields.io/badge/PHP-7.4-blue.svg"
            href="https://github.com/T-Regx/T-Regx/branches/all"/>
        <Badge
            title="PRs Welcome"
            src="https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=popout"
            href="http://makeapullrequest.com"/>
    </div>;

const BadgesSection = () =>
    <div className="badges-section">
        <UpperBadges/>
        <LowerBadges/>
    </div>;

module.exports = BadgesSection;
