import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/mhm-rentiva-docs/en/blog',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog', '5b2'),
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
    path: '/mhm-rentiva-docs/en/blog/tags/critical',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/critical', '585'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/release',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/release', 'ed6'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/security',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/security', '9f6'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/update',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/update', 'cf6'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/v-4-5-5',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/v-4-5-5', 'bfb'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/v-4-6-0',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/v-4-6-0', 'fcc'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/v-4-6-1',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/v-4-6-1', '253'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/vip-transfer',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/vip-transfer', 'c71'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/tags/woocommerce',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/tags/woocommerce', '07f'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/v4-5-5-released',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/v4-5-5-released', '47a'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/v4-6-0-released',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/v4-6-0-released', 'e51'),
    exact: true
  },
  {
    path: '/mhm-rentiva-docs/en/blog/v4-6-1-released',
    component: ComponentCreator('/mhm-rentiva-docs/en/blog/v4-6-1-released', 'c2f'),
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
    component: ComponentCreator('/mhm-rentiva-docs/en/docs', 'c2f'),
    routes: [
      {
        path: '/mhm-rentiva-docs/en/docs/4.5.5',
        component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5', 'b6c'),
        routes: [
          {
            path: '/mhm-rentiva-docs/en/docs/4.5.5',
            component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5', '17b'),
            routes: [
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/', '055'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/admin/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/admin/', '77f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/core-utilities',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/core-utilities', '959'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/emails',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/emails', '683'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/license',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/license', 'e82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/payments',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/payments', 'c15'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/settings', '0f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/core-configuration/vehicle-settings', '1fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/database',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/database', '0fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/database-en',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/database-en', '267'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/list-table-overview',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/list-table-overview', '681'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/rest-api', 'bee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/rest-api-tr',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/rest-api-tr', '27b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/test-suite',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/test-suite', '779'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/developer/testing-checklists',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/developer/testing-checklists', 'a4c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/faq/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/faq/', '75c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/additional-services',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/additional-services', '39b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/bookings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/bookings', 'd1a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/customers',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/customers', 'db1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/export',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/export', '822'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/messages',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/messages', '01d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/post-types',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/post-types', '927'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/reports',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/reports', '3db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/shortcodes', '80a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/features-usage/vehicles',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/features-usage/vehicles', '447'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/getting-started/installation', '4d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/getting-started/post-install-checklist',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/getting-started/post-install-checklist', '176'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/4.5.5/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/4.5.5/getting-started/setup-wizard', '2cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/mhm-rentiva-docs/en/docs/next',
        component: ComponentCreator('/mhm-rentiva-docs/en/docs/next', '81c'),
        routes: [
          {
            path: '/mhm-rentiva-docs/en/docs/next',
            component: ComponentCreator('/mhm-rentiva-docs/en/docs/next', '163'),
            routes: [
              {
                path: '/mhm-rentiva-docs/en/docs/next/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/', '772'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/category/başlangıç-rehberi',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/category/başlangıç-rehberi', '3d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/category/geliştirici-rehberi',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/category/geliştirici-rehberi', '59f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/category/özellikler-ve-kullanım',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/category/özellikler-ve-kullanım', 'c10'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/category/sss',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/category/sss', '0b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/category/temel-yapılandırma',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/category/temel-yapılandırma', '863'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/booking-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/booking-settings', '519'),
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
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/maintenance',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/maintenance', '351'),
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
                path: '/mhm-rentiva-docs/en/docs/next/core-configuration/utilities',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/core-configuration/utilities', 'eda'),
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
                path: '/mhm-rentiva-docs/en/docs/next/developer/framework-architecture',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/framework-architecture', 'a44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/developer/list-table',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/list-table', '99b'),
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
                path: '/mhm-rentiva-docs/en/docs/next/developer/technical-architecture',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/developer/technical-architecture', 'cb8'),
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
                path: '/mhm-rentiva-docs/en/docs/next/faq/common-issues',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/faq/common-issues', '2e3'),
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
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/vehicle-settings', '4af'),
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
                path: '/mhm-rentiva-docs/en/docs/next/features-usage/vip-transfer',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/features-usage/vip-transfer', '77d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/next/getting-started/checklist',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/next/getting-started/checklist', 'f4b'),
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
        component: ComponentCreator('/mhm-rentiva-docs/en/docs', '1d0'),
        routes: [
          {
            path: '/mhm-rentiva-docs/en/docs',
            component: ComponentCreator('/mhm-rentiva-docs/en/docs', 'f6c'),
            routes: [
              {
                path: '/mhm-rentiva-docs/en/docs/',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/', 'da9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/category/başlangıç-rehberi',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/category/başlangıç-rehberi', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/category/geliştirici-rehberi',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/category/geliştirici-rehberi', 'f85'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/category/özellikler-ve-kullanım',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/category/özellikler-ve-kullanım', '63c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/category/sss',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/category/sss', '55a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/category/temel-yapılandırma',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/category/temel-yapılandırma', '013'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/booking-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/booking-settings', 'cfb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/emails',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/emails', 'cca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/license',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/license', 'c3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/maintenance',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/maintenance', 'b22'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/payments',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/payments', '4b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/settings', '6df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/utilities',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/utilities', '5e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/core-configuration/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/core-configuration/vehicle-settings', '304'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/database',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/database', 'a61'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/framework-architecture',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/framework-architecture', 'a2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/list-table',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/list-table', '8b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/rest-api',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/rest-api', '0ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/technical-architecture',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/technical-architecture', '0a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/test-suite',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/test-suite', 'd0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/developer/testing-checklists',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/developer/testing-checklists', 'c79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/faq/common-issues',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/faq/common-issues', '10a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/additional-services',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/additional-services', 'c31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/bookings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/bookings', '549'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/customers',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/customers', '280'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/export',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/export', 'bc6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/messages',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/messages', 'a97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/post-types',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/post-types', '485'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/reports',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/reports', '382'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/shortcodes',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/shortcodes', 'fca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/vehicle-settings',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/vehicle-settings', '40b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/vehicles',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/vehicles', 'c0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/features-usage/vip-transfer',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/features-usage/vip-transfer', '717'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/checklist',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/checklist', '4d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/installation',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/installation', '707'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mhm-rentiva-docs/en/docs/getting-started/setup-wizard',
                component: ComponentCreator('/mhm-rentiva-docs/en/docs/getting-started/setup-wizard', '994'),
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
