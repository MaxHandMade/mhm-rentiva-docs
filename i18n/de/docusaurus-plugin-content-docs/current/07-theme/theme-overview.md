---
id: theme-overview
title: "Theme-Kompatibilität & visuelle Standards"
sidebar_label: "Übersicht"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Theme](https://img.shields.io/badge/theme-v0.3.0-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🎨 Theme & visuelle Standards

MHM Rentiva bietet nahtlose Kompatibilität mit modernen WordPress-Block-Themes (FSE) und klassischen Themes. Hier findest du die vollständigen Designrichtlinien für ein einheitliches Erscheinungsbild.

:::tip DESIGN-LEITFADEN
Nutze die Karten unten, um Theme-Architektur, Template-Hierarchie und Optionen zur Stilanpassung zu erkunden.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏗️ Theme-Architektur</h3>
      <p className="cardDescription">Die Auswirkungen des Plugins auf das Theme, Richtlinien zum Laden von CSS/JS und die Integration des Asset Managers.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/introduction">Architekturübersicht</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📦 Templates & Patterns</h3>
      <p className="cardDescription">Verwendung von Block-Patterns, Templates für einzelne Fahrzeugseiten und Listenansichten.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/templates-patterns">Template-Leitfaden</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛠️ theme.json-Unterstützung</h3>
      <p className="cardDescription">Globale Farbpaletten, Typografie-Einstellungen und theme-spezifische Stilparameter für das Plugin.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/theme-json">Stilregeln</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Theme-Entwicklung</h3>
      <p className="cardDescription">Hooks und Überschreibungsmechanismen für Entwickler, die ein eigenes Theme erstellen möchten.</p>
      <Link className="button button--secondary button--block" to="/docs/theme/development">Entwicklungsdetails</Link>
    </div>
  </div>
</div>

---

### Theme v0.3.0 – die wichtigsten Fakten

| Kennzahl | Wert |
|---|---|
| **Theme-Version** | v0.3.0 |
| **Templates (templates/)** | Insgesamt 10 (front-page, page, single-vehicle, archive-vehicle, page-account, 404, archive, index, search, single) |
| **Patterns (patterns/)** | Insgesamt 31 (in den Kategorien homepage, rentiva und 404) |
| **CSS-Dateien** | Insgesamt 6: `header.css`, `3-layout.css`, `components.css`, `utilities.css`, `plugin-pages.css`, `elementor-compat.css` |
| **WordPress-Seiten** | 10+ Seiten (mit lokalisierten Slugs) |

### Hinweise zur Architektur
- Das Theme basiert auf der **FSE-Architektur (Full Site Editing)**.
- **Overlay der mobilen Navigation:** Dunkles Design (`#101922`), `backdrop-filter` in das `::before`-Pseudoelement verschoben (Containing-Block-Fix).
- **header.html:** `style`-Attribut an den WP-Blockkommentar angeglichen (Fix für die Blockvalidierung).
- **3-layout.css:** `@layer layout` ENTFERNT; `white-space: nowrap` für `rv-trust-value` hinzugefügt (Fix für Statistikkarten mit 10.000+).
- **Seitenbreite:** Verwendet `content-wide` statt `content-narrow`; die max-width von `3-layout.css` wird über `var(--wp--style--global--content-size, 1280px)` mit `theme.json` synchronisiert.
- Alle visuellen Komponenten werden zentral über `AssetManager` verwaltet.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | Details zu Theme v0.3.0 hinzugefügt: 31 Patterns, 10 Templates, 6 CSS-Dateien, Hinweise zur Architektur. |
| 19.03.2026 | 4.21.2 | Übersichtsseite mit Premium-Kartendesign für die Theme-Kategorie erstellt. |
