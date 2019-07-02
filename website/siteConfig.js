const siteConfig = {
    title: 'T-Regx',
    tagline: 'Bulletproof and powerful Regular Expressions for PHP',

    url: 'https://t-regx.com',
    baseUrl: '/',

    organizationName: 'T-Regx',
    projectName: 't-regx.github.io',
    repoUrl: 'https://github.com/T-Regx/t-regx.github.io',
    mainRepoUrl: 'https://github.com/T-Regx/T-Regx',

    headerLinks: [
        {search: true},
        {label: 'Docs', doc: 'installation'},
        {label: 'Compare', page: 'comparison'},
        {label: 'Help', page: 'help'},
        {label: 'Blog', blog: true},
        {label: 'GitHub', href: 'https://github.com/T-Regx/T-Regx', external: true}
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
    favicon: 'img/favicon.ico',

    colors: {
        primaryColor: '#26768c',
        secondaryColor: '#2495B0',
    },

    copyright: `Copyright © 2017-${new Date().getFullYear()} Daniel Wilkowski`,

    highlight: {
        theme: 'github',
        defaultLang: 'php'
    },

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js'
    ],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: '/img/docusaurus.png',
    twitterImage: '/img/docusaurus.png',

    algolia: {
        apiKey: '6d3eef6432e87213c7f031ee898b73a1',
        indexName: 't-regx',
        algoliaOptions: {},
        placeholder: 'Search the website'
    },
};

module.exports = siteConfig;
