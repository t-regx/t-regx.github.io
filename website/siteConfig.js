const siteConfig = {
    title: 'T-Regx',
    tagline: 'Powerful Regular Expressions library',

    url: 'https://your-docusaurus-test-site.com', // Your website URL
    baseUrl: '/',
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    projectName: 'T-Regx',
    organizationName: 'T-Regx',

    headerLinks: [
        {doc: 'installation', label: 'Docs'},
        {doc: 'api', label: 'API'},
        {page: 'help', label: 'Help'},
        {blog: true, label: 'Blog'},
        {href: 'https://github.com/Danon/T-Regx', label: 'GitHub'},
    ],

    headerIcon: 'img/t.regx.png',
    footerIcon: 'img/t.regx.png',
    favicon: 'img/favicon.png',

    colors: {
        primaryColor: '#26768c',
        secondaryColor: '#205C3B',
    },

    /* Custom fonts for website */
    /*
    fonts: {
      myFont: [
        "Times New Roman",
        "Serif"
      ],
      myOtherFont: [
        "-apple-system",
        "system-ui"
      ]
    },
    */

    copyright: `Copyright © ${new Date().getFullYear()} Daniel Wilkowski`,

    highlight: {
        theme: 'github',
        defaultLang: 'php'
    },

    // Add custom scripts here that would be placed in <script> tags.
    scripts: ['https://buttons.github.io/buttons.js'],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/docusaurus.png',
    twitterImage: 'img/docusaurus.png',

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
