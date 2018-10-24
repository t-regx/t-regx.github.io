const siteConfig = {
    title: 'T-Regx',
    tagline: 'Powerful Regular Expressions library',

    url: 'https://t-regx.github.io',
    baseUrl: '/',

    organizationName: 'T-Regx',
    projectName: 't-regx.github.io',
    repoUrl: 'https://github.com/T-Regx/t-regx.github.io',

    headerLinks: [
        {search: true},
        {doc: 'installation', label: 'Docs'},
        // {doc: 'api/api', label: 'API'},
        {page: 'help', label: 'Help'},
        {blog: true, label: 'Blog'},
        {href: 'https://github.com/T-Regx/T-Regx', label: 'GitHub'},
        {languages: true}
    ],
    blogSidebarCount: 'ALL',
    enableUpdateTime: true,
    scrollToTop: true,
    scrollToTopOptions: {
        showWhenScrollTopIs: 190,
        scrollDuration: 400,
        backgroundColor: '#26768c'
    },

    headerIcon: 'img/t.regx.borderless.png',
    footerIcon: 'img/t.regx.png',
    favicon: 'img/favicon.ico',

    colors: {
        primaryColor: '#26768c',
        secondaryColor: '#2495B0',
    },

    copyright: `Copyright © ${new Date().getFullYear()} Daniel Wilkowski`,

    highlight: {
        theme: 'github',
        defaultLang: 'php'
    },

    scripts: ['https://buttons.github.io/buttons.js'],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/docusaurus.png',
    twitterImage: 'img/docusaurus.png',

    algolia: {
        apiKey: '6d3eef6432e87213c7f031ee898b73a1',
        indexName: 't-regx',
        algoliaOptions: {}
    },
};

module.exports = siteConfig;
