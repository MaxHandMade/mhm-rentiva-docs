import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/mhm-rentiva/__docusaurus/debug',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug', '6f4'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/config',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/config', '5fb'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/content',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/content', '30b'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/globalData',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/globalData', '0aa'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/metadata',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/metadata', '1b0'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/registry',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/registry', '9b3'),
    exact: true
  },
  {
    path: '/mhm-rentiva/__docusaurus/debug/routes',
    component: ComponentCreator('/mhm-rentiva/__docusaurus/debug/routes', '274'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog',
    component: ComponentCreator('/mhm-rentiva/blog', '13d'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/archive',
    component: ComponentCreator('/mhm-rentiva/blog/archive', '944'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/authors',
    component: ComponentCreator('/mhm-rentiva/blog/authors', '63d'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/mhm-rentiva/blog/authors/all-sebastien-lorber-articles', 'e35'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/authors/yangshun',
    component: ComponentCreator('/mhm-rentiva/blog/authors/yangshun', '923'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/first-blog-post',
    component: ComponentCreator('/mhm-rentiva/blog/first-blog-post', '490'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/long-blog-post',
    component: ComponentCreator('/mhm-rentiva/blog/long-blog-post', 'f4f'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/mdx-blog-post',
    component: ComponentCreator('/mhm-rentiva/blog/mdx-blog-post', '565'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/tags',
    component: ComponentCreator('/mhm-rentiva/blog/tags', '424'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/tags/docusaurus',
    component: ComponentCreator('/mhm-rentiva/blog/tags/docusaurus', '550'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/tags/facebook',
    component: ComponentCreator('/mhm-rentiva/blog/tags/facebook', '7d6'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/tags/hello',
    component: ComponentCreator('/mhm-rentiva/blog/tags/hello', '5f7'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/tags/hola',
    component: ComponentCreator('/mhm-rentiva/blog/tags/hola', 'e89'),
    exact: true
  },
  {
    path: '/mhm-rentiva/blog/welcome',
    component: ComponentCreator('/mhm-rentiva/blog/welcome', 'f44'),
    exact: true
  },
  {
    path: '/mhm-rentiva/markdown-page',
    component: ComponentCreator('/mhm-rentiva/markdown-page', '831'),
    exact: true
  },
  {
    path: '/mhm-rentiva/docs',
    component: ComponentCreator('/mhm-rentiva/docs', '297'),
    routes: [
      {
        path: '/mhm-rentiva/docs',
        component: ComponentCreator('/mhm-rentiva/docs', 'a72'),
        routes: [
          {
            path: '/mhm-rentiva/docs',
            component: ComponentCreator('/mhm-rentiva/docs', 'c5a'),
            routes: [
              {
                path: '/mhm-rentiva/docs/admin/',
                component: ComponentCreator('/mhm-rentiva/docs/admin/', 'fc6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/additional-services',
                component: ComponentCreator('/mhm-rentiva/docs/admin/additional-services', 'd8f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/bookings',
                component: ComponentCreator('/mhm-rentiva/docs/admin/bookings', '044'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/core-utilities',
                component: ComponentCreator('/mhm-rentiva/docs/admin/core-utilities', 'f52'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/customers',
                component: ComponentCreator('/mhm-rentiva/docs/admin/customers', 'f7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/export',
                component: ComponentCreator('/mhm-rentiva/docs/admin/export', 'fc8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/license',
                component: ComponentCreator('/mhm-rentiva/docs/admin/license', 'ab0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/list-table-overview',
                component: ComponentCreator('/mhm-rentiva/docs/admin/list-table-overview', '721'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/messages',
                component: ComponentCreator('/mhm-rentiva/docs/admin/messages', '25e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/reports',
                component: ComponentCreator('/mhm-rentiva/docs/admin/reports', '0d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/settings',
                component: ComponentCreator('/mhm-rentiva/docs/admin/settings', '46c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/test-suite',
                component: ComponentCreator('/mhm-rentiva/docs/admin/test-suite', 'bcf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva/docs/admin/vehicle-settings', '7f5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/admin/vehicles',
                component: ComponentCreator('/mhm-rentiva/docs/admin/vehicles', '3cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/checklists/testing-checklists',
                component: ComponentCreator('/mhm-rentiva/docs/checklists/testing-checklists', '046'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/configuration/emails',
                component: ComponentCreator('/mhm-rentiva/docs/configuration/emails', '315'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/configuration/payments',
                component: ComponentCreator('/mhm-rentiva/docs/configuration/payments', '401'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/developer/database',
                component: ComponentCreator('/mhm-rentiva/docs/developer/database', '008'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva/docs/developer/rest-api', '0c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva/docs/getting-started/installation', 'ec0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/getting-started/post-install-checklist',
                component: ComponentCreator('/mhm-rentiva/docs/getting-started/post-install-checklist', 'e15'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva/docs/getting-started/setup-wizard', '9a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/troubleshooting/',
                component: ComponentCreator('/mhm-rentiva/docs/troubleshooting/', 'a25'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/usage/post-types',
                component: ComponentCreator('/mhm-rentiva/docs/usage/post-types', '2ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva/docs/usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva/docs/usage/shortcodes', '9f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/mhm-rentiva/',
    component: ComponentCreator('/mhm-rentiva/', 'd79'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
