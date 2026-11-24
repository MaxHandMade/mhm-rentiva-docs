---
id: developer-reading-order
title: "Roadmap für den Entwicklerleitfaden"
sidebar_label: "Lesereihenfolge"
sidebar_position: 1
slug: /developer/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 💻 Roadmap für den Entwicklerleitfaden

Um die technische Architektur von MHM Rentiva zu verstehen und auf Basis des Plugins zu entwickeln, empfehlen wir dir, der folgenden Lesereihenfolge zu folgen.

:::tip TECHNISCHER EINSTIEG
Es wurde ein hierarchischer Lernpfad konzipiert, der bei der Kernstruktur des Plugins beginnt und bis zur Finanz-Engine und den API-Schichten reicht.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">⚙️ 1. Kern & Architektur</h3>
      <p className="cardDescription">Kernkomponenten wie Modulstruktur, Transfer-Architektur und Layout-Pipeline.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/core/framework-architecture">Kernstruktur</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">🌐 2. API & Kommunikation</h3>
      <p className="cardDescription">REST-v1/v2-Endpunkte, Webhook-Sicherheit und die Service-Hierarchie.</p>
      <Link className="button button--secondary button--block" to="/docs/api/overview">API-Leitfaden</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💰 3. Finanz-Engine</h3>
      <p className="cardDescription">Ledger-Modell, Provisionsrichtlinien, Auszahlungsverwaltung und kryptografische Integrität des Audits.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/financial/governance-controls">Finanzarchitektur</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🧪 4. Tests & Betrieb</h3>
      <p className="cardDescription">Strategien für Unit-Tests, Webhook-Simulationen und Go-Live-Checklisten.</p>
      <Link className="button button--secondary button--block" to="/docs/api/controller-audit">Testleitfaden</Link>
    </div>
  </div>
</div>

---

## 🔝 Wichtige technische Referenzen
Weitere Dokumente, die Entwickler häufig nutzen:

- 📑 [Benutzerdefinierte Beitragstypen](/docs/developer/post-types)
- 🎨 [UI-Komponenten & Dashboard](/docs/developer/ui-components/dashboard-widgets)
- 🔒 [Sicherheits- & Datenschutzstandards](/docs/vendor/security-privacy)

---

### Zusammenfassung des Abschnitts
- Die technische Dokumentation ist nach der Abhängigkeitskette geordnet.
- In der ersten Phase werden die Abschnitte **Kern + API** empfohlen, in der zweiten Phase **Finanzen + Tests**.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 21.03.2026 | 4.21.3 | Defekte Links (Finanzarchitektur, Testleitfaden) auf die korrekten Routen aktualisiert. |
| 19.03.2026 | 4.21.2 | Roadmap für den Entwicklerleitfaden mit Premium-Kartendesign erstellt. |
