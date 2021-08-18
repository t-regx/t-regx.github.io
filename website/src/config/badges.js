import {mainRepoUrl, travisUrl} from "./links";

export default {
  upper: [
    {
      title: 'Build Status',
      src: 'https://travis-ci.org/T-Regx/T-Regx.svg?branch=master',
      href: travisUrl,
    },
    {
      title: 'Coverage Status',
      src: 'https://img.shields.io/badge/coverage-100%25-green.svg',
      href: 'https://github.com/T-Regx/T-Regx/blob/master/CONTRIBUTING.md#phpunit-covers-annotation',
    },
    {
      title: 'Dependencies',
      src: 'https://img.shields.io/badge/dependencies-0-brightgreen.svg',
      href: mainRepoUrl,
    },
    {
      title: 'Install size',
      src: 'https://github-size-badge.herokuapp.com/T-Regx/fiddle.svg',
      href: mainRepoUrl,
    },
    {
      title: 'License',
      src: 'https://img.shields.io/github/license/T-Regx/T-Regx.svg',
      href: mainRepoUrl,
    },
    {
      title: 'GitHub last commit',
      src: 'https://img.shields.io/github/last-commit/T-Regx/T-Regx/develop.svg',
      href: 'https://github.com/T-Regx/T-Regx/commits/develop',
    },
    {
      title: 'GitHub commit activity"',
      src: 'https://img.shields.io/github/commit-activity/y/T-Regx/T-Regx.svg',
      href: mainRepoUrl,
    },
  ],
  lower: [
    {
      title: 'PHP Version',
      src: 'https://img.shields.io/badge/PHP-7.1-blue.svg',
      href: travisUrl,
    },
    {
      title: 'PHP Version',
      src: 'https://img.shields.io/badge/PHP-7.2-blue.svg',
      href: travisUrl,
    },
    {
      title: 'PHP Version',
      src: 'https://img.shields.io/badge/PHP-7.3-blue.svg',
      href: travisUrl,
    },
    {
      title: 'PHP Version',
      src: 'https://img.shields.io/badge/PHP-7.4-blue.svg',
      href: travisUrl,
    },
    {
      title: 'PHP Version',
      src: 'https://img.shields.io/badge/PHP-8.0-blue.svg',
      href: travisUrl,
    },
    {
      title: 'PRs Welcome',
      src: 'https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=popout',
      href: 'http://makeapullrequest.com',
    },
  ],
};
