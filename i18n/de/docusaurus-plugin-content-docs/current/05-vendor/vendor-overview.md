---
id: vendor-overview
title: "Anbieter-Ökonomie & -Verwaltung"
sidebar_label: "Übersicht"
sidebar_position: 1
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Unter [Editionen – Lite vs. Pro](/docs/) findest du die vollständige Aufteilung, oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

# 🤝 Anbieter-Ökonomie & -Verwaltung

Der Dokumentations-Hub zum Lebenszyklus, zu den Finanzvorgängen und zu den Marktplatzregeln für Anbieter, die Fahrzeuge über das MHM Rentiva-Portal vermieten.

:::tip ANBIETERVERWALTUNG
Nutze die Karten unten, um ausführliche Informationen zum Onboarding von Anbietern, zu Auszahlungsprozessen und zu Sicherheitsstandards zu finden.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Anbieter-Onboarding</h3>
      <p className="cardDescription">Registrierung neuer Anbieter, Profilfreigabe und eine Anleitung zum Hochladen von Fahrzeugen in das System.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/onboarding">Onboarding-Anleitung</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">💳 Auszahlung & Hauptbuch</h3>
      <p className="cardDescription">Finanzbucheinträge, Auszahlungsanfragen und Verwaltung der Zahlungszeiträume.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/payouts-ledger">Finanzdetails</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">📊 Analysen & Leistung</h3>
      <p className="cardDescription">Umsatzstatistiken pro Anbieter, Auslastungsraten der Fahrzeuge und Leistungsdaten.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/analytics">Anbieterstatistiken</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">🛡️ Sicherheit & Datenschutz</h3>
      <p className="cardDescription">Schutz personenbezogener Daten, Anbietervereinbarungen und sichere Transaktionsprotokolle.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/security-privacy">Sicherheitsleitfaden</Link>
    </div>
  </div>
</div>

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #7c3aed' }}>
      <h3 className="cardTitle">💰 System für kostenpflichtige Inserate</h3>
      <p className="cardDescription">Inseratsgebühr auf WooCommerce-Basis: Zahlungsschranke für neue Fahrzeuge, Verlängerungen und erneute Inserate.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/vendor-management#-paid-listing-system-v4241">Details zur Inseratsgebühr</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #059669' }}>
      <h3 className="cardTitle">🔄 Fahrzeug-Lebenszyklus</h3>
      <p className="cardDescription">90-tägige Inseratsdauer, Pausieren, Verlängerung, Rückzug und Zuverlässigkeitswert.</p>
      <Link className="button button--secondary button--block" to="/docs/vendor/vendor-management#-vehicle-lifecycle-management-v4240">Details zum Lebenszyklus</Link>
    </div>
  </div>
</div>

## 🔝 Schnellreferenzen
- 💰 [Wie erstelle ich eine Auszahlungsanfrage?](/docs/vendor/payout-requests)
- 🏢 [Anleitung zur Nutzung des Anbieter-Dashboards](/docs/vendor/vendor-management)
- 💳 [System für kostenpflichtige Inserate](/docs/vendor/vendor-management#-paid-listing-system-v4241)

---

### Zusammenfassung des Abschnitts
- Dieser Abschnitt definiert die kommerzielle und technische Brücke zwischen Admin und Anbieter.
- Alle Finanztransaktionen werden über das **MHM Ledger**-Modell kryptografisch geprüft.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 01.04.2026 | 4.24.1 | Karten „System für kostenpflichtige Inserate“ und „Fahrzeug-Lebenszyklus“ hinzugefügt. Schnellreferenzen aktualisiert. |
| 28.03.2026 | 4.23.1 | Versions-Badge aktualisiert; Verweise auf die Neugestaltung des Anbieterformulars und die SelectWoo-Migration in v4.23.1. |
| 26.03.2026 | 4.23.0 | Versions-Badge aktualisiert; Verweise auf die Architektur der Transfer-Standorte in v4.23.0. |
| 19.03.2026 | 4.21.2 | Übersichtsseite mit Premium-Kartendesign für die Anbieter-Kategorie erstellt. |
