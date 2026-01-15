import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug', 'd55'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/config',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/config', '326'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/content',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/content', '3d1'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/globalData', '339'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/metadata', '87a'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/registry', 'cf4'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/mhm-rentiva-docs/__docusaurus/debug/routes', '241'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog',
    component: ComponentCreator('/mhm-rentiva-docs/blog', '4e4'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/archive',
    component: ComponentCreator('/mhm-rentiva-docs/blog/archive', '8cc'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/authors',
    component: ComponentCreator('/mhm-rentiva-docs/blog/authors', 'bd8'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/mhm-rentiva-docs/blog/authors/all-sebastien-lorber-articles', '86d'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/authors/yangshun',
    component: ComponentCreator('/mhm-rentiva-docs/blog/authors/yangshun', 'cc3'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/first-blog-post',
    component: ComponentCreator('/mhm-rentiva-docs/blog/first-blog-post', 'e33'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/long-blog-post',
    component: ComponentCreator('/mhm-rentiva-docs/blog/long-blog-post', '4cb'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/mdx-blog-post',
    component: ComponentCreator('/mhm-rentiva-docs/blog/mdx-blog-post', '339'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/tags',
    component: ComponentCreator('/mhm-rentiva-docs/blog/tags', '12f'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/tags/docusaurus',
    component: ComponentCreator('/mhm-rentiva-docs/blog/tags/docusaurus', '7d9'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/tags/facebook',
    component: ComponentCreator('/mhm-rentiva-docs/blog/tags/facebook', '404'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/tags/hello',
    component: ComponentCreator('/mhm-rentiva-docs/blog/tags/hello', '994'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/tags/hola',
    component: ComponentCreator('/mhm-rentiva-docs/blog/tags/hola', '883'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/blog/welcome',
    component: ComponentCreator('/mhm-rentiva-docs/blog/welcome', '898'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/markdown-page',
    component: ComponentCreator('/mhm-rentiva-docs/markdown-page', '39d'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/docs',
    component: ComponentCreator('/mhm-rentiva-docs/docs', '3d9'),
    routes: [
      {
        path: '/mhm-rentiva-docs/docs',
        component: ComponentCreator('/mhm-rentiva-docs/docs', '241'),
        routes: [
          {
            path: '/mhm-rentiva-docs/docs',
            component: ComponentCreator('/mhm-rentiva-docs/docs', '626'),
            routes: [
              {
                path: '/mhm-rentiva-docs/docs/admin/',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/', 'cc9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/additional-services',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/additional-services', 'fab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/bookings',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/bookings', 'ce6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/core-utilities',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/core-utilities', 'ef9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/customers',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/customers', '03a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/export',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/export', '4a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/license',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/license', 'fa2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/list-table-overview',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/list-table-overview', '6f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/messages',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/messages', '785'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/reports',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/reports', '1e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/settings',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/settings', 'a91'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/test-suite',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/test-suite', '93a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/vehicle-settings', '5f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/admin/vehicles',
                component: ComponentCreator('/mhm-rentiva-docs/docs/admin/vehicles', 'bb3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/checklists/testing-checklists',
                component: ComponentCreator('/mhm-rentiva-docs/docs/checklists/testing-checklists', 'a40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/configuration/emails',
                component: ComponentCreator('/mhm-rentiva-docs/docs/configuration/emails', '1e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/configuration/payments',
                component: ComponentCreator('/mhm-rentiva-docs/docs/configuration/payments', '2c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/developer/database',
                component: ComponentCreator('/mhm-rentiva-docs/docs/developer/database', '025'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva-docs/docs/developer/rest-api', '797'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva-docs/docs/getting-started/installation', 'c0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/getting-started/post-install-checklist',
                component: ComponentCreator('/mhm-rentiva-docs/docs/getting-started/post-install-checklist', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva-docs/docs/getting-started/setup-wizard', 'e80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/troubleshooting/',
                component: ComponentCreator('/mhm-rentiva-docs/docs/troubleshooting/', 'f39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/usage/post-types',
                component: ComponentCreator('/mhm-rentiva-docs/docs/usage/post-types', '5c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/docs/usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva-docs/docs/usage/shortcodes', 'd47'),
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
    path: '/mhm-rentiva-docs/',
    component: ComponentCreator('/mhm-rentiva-docs/', '01c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
