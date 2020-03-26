"use strict";

module.exports = {
  title: 'Forward Alone',
  tagline: 'Stay Hungry Stay Foolish',
  url: 'https://github.com/hunxiran/blog',
  baseUrl: '/blog/',
  favicon: 'img/favicon.ico',
  organizationName: 'hunxiran',
  // Usually your GitHub org/user name.
  projectName: 'blog',
  // Usually your repo name. 
  themeConfig: {
    navbar: {
      title: 'Forward Alone',
      logo: {
        alt: 'Forward Alone Logo',
        src: 'img/logo.svg'
      },
      links: [{
        to: 'docs/html/Basics',
        label: 'Interview',
        position: 'right'
      }, {
        to: 'blog',
        label: 'Blog',
        position: 'right'
      }, {
        href: 'https://github.com/hunxiran/blog.git',
        label: 'GitHub',
        position: 'right'
      }]
    },
    footer: {
      style: 'dark',
      copyright: "Copyright \xA9 ".concat(new Date().getFullYear(), " hunxiran, Inc. Built with Docusaurus.")
    }
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [['@docusaurus/preset-classic', {
    docs: {
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
      showLastUpdateAuthor: true,
      showLastUpdateTime: true
    },
    theme: {
      customCss: require.resolve('./src/css/custom.css')
    }
  }]],
  plugins: ['@docusaurus/plugin-ideal-image']
};