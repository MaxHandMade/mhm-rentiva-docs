---
id: theme-overview
title: Theme Compatibility & Visual Standards
sidebar_label: Overview
sidebar_position: 1
hide_table_of_contents: true
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Theme](https://img.shields.io/badge/theme-v0.3.0-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🎨 Theme & Visual Standards

MHM Rentiva provides seamless compatibility with modern WordPress block themes (FSE) and classic themes. Access the complete design guidelines for visual consistency here.

:::tip DESIGN GUIDE
Use the cards below to explore theme architecture, template hierarchy, and style customization options.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏗️ Theme Architecture</h3>
      <p className="cardDescription">The plugin's impact on the theme, CSS/JS loading policies, and Asset Manager integration.</p>
      <a className="button button--secondary button--block" href="/docs/theme/introduction">Architecture Overview</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📦 Templates & Patterns</h3>
      <p className="cardDescription">Using Block Patterns, single vehicle page templates, and list views.</p>
      <a className="button button--secondary button--block" href="/docs/theme/templates-patterns">Template Guide</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛠️ theme.json Support</h3>
      <p className="cardDescription">Global color palettes, typography settings, and theme-specific style parameters for the plugin.</p>
      <a className="button button--secondary button--block" href="/docs/theme/theme-json">Style Rules</a>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Theme Development</h3>
      <p className="cardDescription">Hooks and override mechanisms for developers who want to build a custom theme.</p>
      <a className="button button--secondary button--block" href="/docs/theme/development">Development Details</a>
    </div>
  </div>
</div>

---

### Theme v0.3.0 Key Facts

| Metric | Value |
|---|---|
| **Theme Version** | v0.3.0 |
| **Templates (templates/)** | 10 total (front-page, page, single-vehicle, archive-vehicle, page-account, 404, archive, index, search, single) |
| **Patterns (patterns/)** | 31 total (in homepage, rentiva, and 404 categories) |
| **CSS Files** | 6 total: `header.css`, `3-layout.css`, `components.css`, `utilities.css`, `plugin-pages.css`, `elementor-compat.css` |
| **WordPress Pages** | 10+ pages (with localized slugs) |

### Architecture Notes
- The theme is built on **FSE (Full Site Editing)** architecture.
- **Mobile navigation overlay:** Dark theme (`#101922`), `backdrop-filter` moved to `::before` pseudo-element (containing-block fix).
- **header.html:** `style` attribute matched with WP block comment (block validation fix).
- **3-layout.css:** `@layer layout` REMOVED; `white-space: nowrap` added for `rv-trust-value` (10,000+ stats card fix).
- **Page width:** Uses `content-wide` instead of `content-narrow`; `3-layout.css` max-width synchronized to `theme.json` via `var(--wp--style--global--content-size, 1280px)`.
- All visual components are centrally managed via `AssetManager`.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | Theme v0.3.0 details added: 31 patterns, 10 templates, 6 CSS files, architecture notes. |
| 19.03.2026 | 4.21.2 | Overview page with premium card design created for theme category. |
