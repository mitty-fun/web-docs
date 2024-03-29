// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OrangeApple Docs',
  tagline: 'OrangeApple Docs are cool',
  url: 'https://docs.mitty.tw',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'mitty.tw', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: 'docs/python/intro',
            docId: 'python/intro',
            position: 'left',
            label: 'PYTHON 教學',
          },
          {
            to: 'docs/javascript/intro',
            docId: 'javascript/intro',
            position: 'left',
            label: 'JAVASRIPT 教學',
          },
          {
            to: 'docs/html/intro',
            docId: 'html/intro',
            position: 'left',
            label: 'HTML 教學',
          },
          {
            to: 'docs/css/intro',
            docId: 'css/intro',
            position: 'left',
            label: 'CSS 教學',
          },
          {
            href: 'https://koding.school/',
            label: '線上平台',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'JavaScript 教學',
                to: '/docs/JavaScript/intro',
              },
              {
                label: 'Python 教學',
                to: '/docs/Python/intro',
              },
              {
                label: 'HTML 教學',
                to: '/docs/html/intro',
              },
              {
                label: 'CSS 教學',
                to: '/docs/css/intro',
              },
            ],
          },
          {
            title: 'Website',
            items: [
              {
                label: 'OrangeApple Inc',
                href: 'https://orangeapple.co/',
              },
              {
                label: 'koding.school',
                href: 'https://koding.school/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/orangeappletw/',
              }
            ],
          },
          
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OrangeApple, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
