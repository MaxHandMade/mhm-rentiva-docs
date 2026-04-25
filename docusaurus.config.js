// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MHM Rentiva Documentation',
  tagline: 'Comprehensive Vehicle Rental Management for WordPress',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://MaxHandMade.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/mhm-rentiva-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MaxHandMade', // Usually your GitHub org/user name.
  projectName: 'mhm-rentiva-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      tr: {
        label: 'Türkçe',
        htmlLang: 'tr-TR',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Edit this page link points to the docs repo
          editUrl:
            'https://github.com/MaxHandMade/mhm-rentiva-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit this page link points to the docs repo
          editUrl:
            'https://github.com/MaxHandMade/mhm-rentiva-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'MHM Rentiva',
        logo: {
          alt: 'MHM Rentiva Logo',
          src: 'img/mhm-logo.png',
          srcDark: 'img/mhm-logo-white.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: '/blog', label: 'Release Notes', position: 'left' },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/MaxHandMade/mhm-rentiva',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/getting-started/installation',
              },
              {
                label: 'User Guide',
                to: '/docs/features-usage/shortcodes/overview',
              },
              {
                label: 'Developer Docs',
                to: '/docs/developer/core/technical-architecture',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'WordPress Support Forum',
                href: 'https://wordpress.org/support/plugin/mhm-rentiva',
              },
              {
                label: 'GitHub Repository',
                href: 'https://github.com/MaxHandMade/mhm-rentiva',
              },
              {
                label: 'Report an Issue',
                href: 'https://github.com/MaxHandMade/mhm-rentiva/issues',
              },
              {
                label: 'YouTube Channel',
                href: 'https://www.youtube.com/channel/UC3qBE6ZCCEc8ugFUYXwtcpA',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Release Notes',
                to: '/blog',
              },
              {
                label: 'Official Website',
                href: 'https://maxhandmade.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MHM Development. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["tr"],
      }),
    ],
  ],
};

export default config;
