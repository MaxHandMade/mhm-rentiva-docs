---
id: overview
title: "REST API und Nervensystem"
sidebar_label: "Überblick"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🧠 REST API und Nervensystem

Willkommen im zentralen Nervensystem, das den Datenfluss zwischen allen MHM-Rentiva-Modulen, die Integrationen mit externen Systemen und die Kommunikation moderner Oberflächen (Interactivity API) steuert.

:::tip TECHNISCHER LEITFADEN
Nutze die Karten unten, um detaillierte technische Informationen zu den asynchronen Schichten, sicheren Protokollen und zukünftigen Plänen des Systems aufzurufen.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🌐 v1-Endpunkte (aktuell)</h3>
      <p className="cardDescription">Derzeit aktive REST-Endpunkte. Referenzen für Vermietungen, Standortdienste und Health-Audits.</p>
      <Link className="button button--secondary button--block" to="/docs/api/v1/rest-api-v1">v1-Referenz</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🏗️ v2-Planung (Zukunft)</h3>
      <p className="cardDescription">Der API-First-Übergang des Systems. Roadmap für die Unterstützung mobiler Apps, das JWT-Design und die API-Architektur der nächsten Generation.</p>
      <Link className="button button--secondary button--block" to="/docs/api/rest-v2-planning">v2-Plan</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🛡️ Sicherheit und Lizenzierung</h3>
      <p className="cardDescription">HMAC-Signierung, Verwaltung von API-Schlüsseln und Kommunikationsprotokolle mit dem externen Lizenzserver.</p>
      <Link className="button button--secondary button--block" to="/docs/api/license-server-protocols">Sicherheitsdetails</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🔍 Audit und Architektur</h3>
      <p className="cardDescription">Controller-Audit, Hierarchie des Nervensystems und Berichte zur Performance-Optimierung.</p>
      <Link className="button button--secondary button--block" to="/docs/api/api-nervous-system">Architekturanalyse</Link>
    </div>
  </div>
</div>

---

## 🔝 Beliebte technische Themen
Die API-Themen, die Entwickler am häufigsten brauchen:

- 🛡️ [API-Authentifizierungsmethoden](./v1/auth-and-security)
- 🔑 [Verwendung des API-Schlüssel-Managers](./v1/api-key-manager)
- 🧾 [Zahlungs-Callback-API](./v1/financial-rest-callbacks)
- 🚦 [Fehlercodes und Rate Limiting](./v1/rate-limits-and-errors)

---

### Zusammenfassung des Abschnitts
- Die Dokumente in diesem Abschnitt richten sich an Entwickler, die die technische Infrastruktur des Plugins verstehen möchten.
- Alle Übergangsprozesse von `v1` und `v2` werden in einer standardisierten Hierarchie dargestellt.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 21.03.2026 | 4.21.3 | Defekte Links (v1-Referenz, v2-Plan usw.) als relative Pfade korrigiert. |
| 19.03.2026 | 4.21.2 | Startseite im Premium-Kartendesign für die API-Kategorie erstellt. |
