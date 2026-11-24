---
id: core-configuration-reading-order
title: "Roadmap der Grundkonfiguration"
sidebar_label: "Lesereihenfolge"
sidebar_position: 1
slug: /core-configuration/reading-order
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# ⚙️ Roadmap der Grundkonfiguration

Nach der Installation des Plugins müssen die Einstellungen in einem logischen Rahmen konfiguriert werden, damit die betrieblichen Abläufe reibungslos funktionieren. Dieser Abschnitt behandelt die grundlegenden Konfigurationsschritte, die das „Herz“ des Systems bilden.

:::tip KONFIGURATIONSLEITFADEN
Folge den unten nach Kategorien geordneten Karten, um das System vollständig einzurichten. Jede Karte bietet dir schnellen Zugriff auf die jeweilige Einstellungsgruppe.
:::

---

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🏢 1. Allgemeine Einstellungen</h3>
      <p className="cardDescription">Lege Unternehmensinformationen, Währung und grundlegende Betriebsmodi fest.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Allgemeine Einstellungen</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">📅 2. Buchung</h3>
      <p className="cardDescription">Mietdauern, Anzahlungssätze und Buchungsverhalten.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/booking-settings">Buchung</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">💳 3. Zahlungen</h3>
      <p className="cardDescription">Konfiguriere WooCommerce-Zahlungs-Gateways und Regeln für den Zahlungseinzug.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/payments">Zahlungseinstellungen</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">📧 4. Benachrichtigungen</h3>
      <p className="cardDescription">E-Mail-Vorlagen, SMTP-Einstellungen und automatische Benachrichtigungen.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/emails">E-Mail-Einstellungen</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #6366f1' }}>
      <h3 className="cardTitle">🏎️ 5. Fahrzeugfelder</h3>
      <p className="cardDescription">Technische Daten (Kraftstoffart, Getriebe usw.) und Definitionen der Fahrzeugmerkmale.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/vehicle-settings">Fahrzeugeinstellungen</Link>
    </div>
  </div>
  <div className="col col--4 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #ec4899' }}>
      <h3 className="cardTitle">🔑 6. Lizenz</h3>
      <p className="cardDescription">Aktiviere deinen Schlüssel, um die Pro-Funktionen freizuschalten.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/license">Lizenzverwaltung</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #8b5cf6' }}>
      <h3 className="cardTitle">⚡ 7. System & Leistung</h3>
      <p className="cardDescription">Caching, Sicherheitsregeln und System-Zustandsprüfungen.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/system-performance">System & Geschwindigkeit</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #10b981' }}>
      <h3 className="cardTitle">🛠️ 8. Wartung & Werkzeuge</h3>
      <p className="cardDescription">Datenbankbereinigung, Cron-Überwachung und Diagnosewerkzeuge.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/maintenance">Wartungsseite</Link>
    </div>
  </div>
</div>

---

## 📈 Ablaufdiagramm der Konfiguration

```mermaid
graph TD
    Start((START)) --> GS[1. General Settings]
    GS --> BS[2. Booking Management]
    BS --> PS[3. Payment Settings]
    PS --> ES[4. Email Gateways]
    ES --> AS[5. Vehicle Fields]
    AS --> LZ[6. License Activation]
    LZ --> SP[7. System & Security]
    SP --> UT[8. Maintenance & Diagnostics]
    UT --> End((COMPLETE))
```

---

### Zusammenfassung des Abschnitts
- Wenn du die Einstellungen in der richtigen Reihenfolge konfigurierst, vermeidest du Systemkonflikte.
- Es wird empfohlen, das System am Ende mit den Werkzeugen unter **Wartung & Diagnose** zu überprüfen.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Roadmap der Grundkonfiguration mit Premium-Kartendesign erstellt. |
