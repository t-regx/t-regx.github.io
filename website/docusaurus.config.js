const mainRepoUrl = 'https://github.com/T-Regx/T-Regx';

module.exports = {
  title: 'T-Regx',
  tagline: 'Bulletproof and powerful Regular Expressions for PHP',
  url: 'https://t-regx.com',
  baseUrl: '/',
  organizationName: 'T-Regx',
  projectName: 't-regx.github.io',
  favicon: 'img/favicon.ico',
  customFields: {
    repoUrl: 'https://github.com/T-Regx/t-regx.github.io',
    mainRepoUrl,
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
  themeConfig: {
    image: '/img/docusaurus.png',
    algolia: {
      apiKey: '6d3eef6432e87213c7f031ee898b73a1',
      indexName: 't-regx',
      algoliaOptions: {},
      //   placeholder: 'Search the website',
    },
    sidebarCollapsible: false,
    disableDarkMode: true,
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      defaultLanguage: 'php',
    },
    navbar: {
      title: 'T-Regx',
      logo: {
        alt: 'T-Regx',
        src: 'img/t.regx.borderless.png',
      },
      links: [
        {to: 'docs/installation', label: 'Docs'},
        {to: 'comparison', label: 'Compare'},
        {to: 'help', label: 'Help'},
        {to: 'blog', label: 'Blog'},
        {href: mainRepoUrl, label: 'GitHub'},
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
            {label: 'Getting Started', to: 'docs/introduction'},
            {label: 'Documentation', to: 'docs/match'},
            {
              label: 'API Reference',
              href: `${mainRepoUrl}/blob/master/ChangeLog.md#api`,
            },
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
          ],
        },
      ],
    },
  },
  plugins: ['docusaurus-plugin-sass']
};
