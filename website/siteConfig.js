const siteConfig = {
    title: 'T-Regx',
    tagline: 'Powerful Regular Expressions library',

    url: 'https://your-docusaurus-test-site.com', // Your website URL
    baseUrl: '/',
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    organizationName: 'Danon',
    projectName: 'T-Regx',
    repoUrl: 'https://github.com/Danon/T-Regx',

    headerLinks: [
        {search: true},
        {doc: 'installation', label: 'Docs'},
        {doc: 'api', label: 'API'},
        {page: 'help', label: 'Help'},
        {blog: true, label: 'Blog'},
        {href: 'https://github.com/Danon/T-Regx', label: 'GitHub'},
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
};

module.exports = siteConfig;
