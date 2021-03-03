const path = require('path');
const {mainRepoUrl} = require("./consts");
const changeLogUrl = `${mainRepoUrl}/blob/develop/ChangeLog.md`;

module.exports = {
  title: 'T-Regx',
  tagline: 'Programmer-oriented Regular\nExpressions wrapper library for PHP',
  url: 'https://t-regx.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'T-Regx',
  projectName: 't-regx.github.io',
  themeConfig: {
    sidebarCollapsible: false,
    image: '/img/t.regx.png',
    algolia: {
      apiKey: '6d3eef6432e87213c7f031ee898b73a1',
      indexName: 't-regx',
      algoliaOptions: {},
      //   placeholder: 'Search the website',
    },
    prism: {
      theme: require('./theme'),
      defaultLanguage: 'php',
    },
    navbar: {
      title: 'T-Regx',
      logo: {
        alt: 'T-Regx',
        src: 'img/t.regx.borderless.png',
      },
      items: [
        {position: 'left', label: 'Tutorial', to: 'docs/installation'},
        {position: 'left', label: 'Blog', to: 'blog'},
        {position: 'left', label: 'Compare', to: 'comparison'},
        {position: 'left', label: 'Help', to: 'help'},
        {position: 'left', label: 'Try online', to: 'replit'},
        {position: 'right', label: 'ChangeLog', href: changeLogUrl},
        {position: 'right', label: 'GitHub', href: mainRepoUrl},
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'T-Regx',
        src: 'img/t.regx.png',
      },
      copyright: `Copyright © 2017-${new Date().getFullYear()} Daniel Wilkowski`,
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Installation', to: 'docs/installation'},
            {label: 'Getting Started', to: 'docs/introduction-safe'},
            {label: 'Documentation', to: 'docs/match'},
            {label: 'API Reference', href: changeLogUrl},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: 'blog'},
            {label: 'GitHub', href: mainRepoUrl},
            {
              html: `<a class="github-button" href="${mainRepoUrl}"
                        title="See this project on GitHub"
                        data-icon="octicon-star"
                        data-show-count="true"
                        data-count-href="/T-Regx/T-Regx/stargazers"
                        data-count-aria-label="# stargazers on GitHub"
                        aria-label="Star this project on GitHub">T-Regx</a>`,
            },
            {
              label: 'Sponsor',
              href: 'https://github.com/sponsors/Danon'
            }
          ],
        },
      ],
    },
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./static/scss/style.scss'),
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [path.resolve(__dirname, 'src', 'plugins', 'docusaurus-plugin-php-loader'), {}]
  ],
  customFields: {
    repoUrl: 'https://github.com/T-Regx/t-regx.github.io',
    mainRepoUrl,
  },
};
