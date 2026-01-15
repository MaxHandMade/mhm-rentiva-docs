import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/mhm-rentiva-docs/en/blog',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog', '56e'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/archive',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/archive', '178'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/authors',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/authors', '613'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags', '3e8'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/release',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/release', '015'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/update',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/update', 'ef3'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/v-4-5-5',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/v-4-5-5', 'bfb'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/v4-5-5-released',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/v4-5-5-released', '47a'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/markdown-page',
    component: ComponentCreator('/mhm-rentiva-docs/en/markdown-page', '323'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/search',
    component: ComponentCreator('/mhm-rentiva-docs/en/search', 'ce4'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/docs',
    component: ComponentCreator('/mhm-rentiva-docs/en/docs', 'ae6'),
    routes: [
      {
        path: '/mhm-rentiva-docs/en/docs/next',
        component: ComponentCreator('/mhm-rentiva-docs/en/docs/next', 'ed5'),
        routes: [
          {
            path: '/mhm-rentiva-docs/en/docs/next',
            component: ComponentCreator('/mhm-rentiva-docs/en/docs/next', '342'),
            routes: [
              {
                path: '/mhm-rentiva-docs/en/docs/next/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/', '772'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/admin/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/admin/', 'd5d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/core-utilities',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/core-utilities', 'a03'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/emails',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/emails', '432'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/license',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/license', '1a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/payments',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/payments', 'c3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/settings', 'd37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/vehicle-settings', '601'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/database',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/database', '5a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/database-en',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/database-en', '45e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/list-table-overview',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/list-table-overview', '9a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/rest-api', '022'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/rest-api-tr',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/rest-api-tr', 'f07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/test-suite',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/test-suite', 'f29'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/testing-checklists',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/testing-checklists', '5cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/faq/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/faq/', '8ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/additional-services',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/additional-services', '0cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/bookings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/bookings', 'e98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/customers',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/customers', '1a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/export',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/export', '600'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/messages',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/messages', '395'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/post-types',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/post-types', 'bdf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/reports',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/reports', '123'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/shortcodes', '480'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/vehicles',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/vehicles', '732'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/getting-started/installation', '1cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/getting-started/post-install-checklist',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/getting-started/post-install-checklist', '04f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/getting-started/setup-wizard', '3bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/mhm-rentiva-docs/en/docs',
        component: ComponentCreator('/mhm-rentiva-docs/en/docs', 'f9f'),
        routes: [
          {
            path: '/mhm-rentiva-docs/en/docs',
            component: ComponentCreator('/mhm-rentiva-docs/en/docs', '841'),
            routes: [
              {
                path: '/mhm-rentiva-docs/en/docs/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/', '795'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/admin/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/admin/', 'd1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/core-utilities',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/core-utilities', 'c9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/emails',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/emails', 'b50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/license',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/license', '987'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/payments',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/payments', 'bb4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/settings', '174'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/vehicle-settings', '58f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/database',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/database', 'd50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/database-en',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/database-en', 'f4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/list-table-overview',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/list-table-overview', '559'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/rest-api', 'e39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/rest-api-tr',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/rest-api-tr', '112'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/test-suite',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/test-suite', '7cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/testing-checklists',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/testing-checklists', '12e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/faq/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/faq/', '567'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/additional-services',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/additional-services', 'd4d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/bookings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/bookings', '6c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/customers',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/customers', '7c9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/export',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/export', '618'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/messages',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/messages', '6b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/post-types',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/post-types', '81c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/reports',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/reports', 'f95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/shortcodes', 'a28'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/vehicles',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/vehicles', 'c00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/installation', 'e44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/post-install-checklist',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/post-install-checklist', 'f66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/setup-wizard', '51f'),
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
    path: '/mhm-rentiva-docs/en/',
    component: ComponentCreator('/mhm-rentiva-docs/en/', '7c8'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
