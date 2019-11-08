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
          customCss: require.resolve('./static/css/custom.css'),
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
    prism: {
      theme: require('prism-react-renderer/themes/github'),
    },
    navbar: {
      title: 'T-Regx',
      logo: {
        alt: 'T-Regx',
        src: 'img/t.regx.borderless.png',
      },

      links: [
        { to: 'docs/installation', label: 'Docs' },
        { to: 'comparison', label: 'Compare' },
        { to: 'help', label: 'Help' },
        { to: 'blog', label: 'Blog' },
        { href: mainRepoUrl, label: 'GitHub' },
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
            { label: 'Installation', to: 'docs/installation' },
            { label: 'Getting Started', to: 'docs/introduction' },
            { label: 'Documentation', to: 'docs/match' },
            {
              label: 'API Reference',
              href: `${mainRepoUrl}/blob/master/ChangeLog.md#api`,
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: 'blog' },
            { label: 'GitHub', href: mainRepoUrl },
          ],
        },
      ],
    },
  },

  //   scrollToTop: true,
  //   scrollToTopOptions: {
  //     showWhenScrollTopIs: 190,
  //     scrollDuration: 400,
  //     backgroundColor: '#26768c',
  //   },

  //   colors: {
  //     primaryColor: '#26768c',
  //     secondaryColor: '#2495B0',
  //   },

  //   highlight: {
  //     theme: 'github',
  //     defaultLang: 'php',
  //   },
};
