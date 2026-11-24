---
id: features-usage-reading-order
title: "Funktionen & Nutzungs-Roadmap"
sidebar_label: "Lesereihenfolge"
sidebar_position: 1
slug: /features-usage/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# 🚗 Funktionen & Nutzungs-Roadmap

Um alle Möglichkeiten von MHM Rentiva optimal zu nutzen, empfehlen wir dir, die unten stehende Reihenfolge im Betriebsablauf einzuhalten.

:::tip NUTZUNGSANLEITUNG
Nutze die unten nach Kategorien sortierten Karten, um deine täglichen Vermietungsabläufe zu verwalten, Fahrzeuge hinzuzufügen und Berichte zu erstellen.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏎️ 1. Fahrzeuge & Bestand</h3>
      <p className="cardDescription">Fahrzeuge hinzufügen, Kategorien verwalten, Preise und globale Fahrzeugeinstellungen.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/vehicles">Fahrzeugverwaltung</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Buchungsverfolgung</h3>
      <p className="cardDescription">Eingehende Anfragen verwalten, den Kalender im Blick behalten und Buchungsdetails prüfen.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/bookings">Buchungen</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">✨ 3. Zusatzleistungen & VIP</h3>
      <p className="cardDescription">Zusatzleistungen wie Babysitze und Versicherungen sowie die Definition von VIP-Transfer-Routen.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/additional-services-usage">Zusatzleistungen</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💬 4. Kunden & Kommunikation</h3>
      <p className="cardDescription">Verwaltung des Kundenportals, Treueprogramm und internes Nachrichtensystem.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/customers">Kundenverwaltung</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--12 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">📊 5. Berichte & Analysen</h3>
      <p className="cardDescription">Diagramme zur Geschäftsentwicklung, Umsatzberichte und Datenexport.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reports">Berichte & Export</Link>
    </div>
  </div>
</div>

---

## 📈 Betriebszyklus

```mermaid
graph TD
    A[<b>1. Add Vehicle</b>] --> B[<b>2. Receive Booking</b>]
    B --> C[<b>3. Operations / Delivery</b>]
    C --> D[<b>4. Customer Relations</b>]
    D --> E[<b>5. Reporting & Analytics</b>]
    E --> A
    
    style A fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
    style B fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style C fill:#fff1f2,stroke:#e11d48,stroke-width:2px
    style D fill:#faf5ff,stroke:#9333ea,stroke-width:2px
    style E fill:#fffbeb,stroke:#d97706,stroke-width:2px
```

---

### Zusammenfassung des Abschnitts
- Dieser Abschnitt behandelt die Arbeitsabläufe für die tägliche Nutzung des Plugins.
- Der Betriebszyklus ist auf ein nachhaltiges Vermietungsgeschäft ausgelegt.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 21.03.2026 | 4.21.3 | Alle Kartenlinks (Fahrzeuge, Buchungen, Zusatzleistungen usw.) auf relative Pfade korrigiert. |
| 19.03.2026 | 4.21.2 | Funktionen- & Nutzungs-Roadmap mit Premium-Kartendesign erstellt. |
