---
slug: /
sidebar_position: 0
title: "Willkommen"
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# MHM Rentiva Dokumentation

Willkommen in der offiziellen Dokumentationszentrale für **MHM Rentiva** – das WordPress-Plugin, das deine Fahrzeugvermietung auf ein professionelles Niveau hebt. Diese Zentrale bietet einen umfassenden Leitfaden für Website-Betreiber und Entwickler gleichermaßen.

:::tip Schnellzugriff
Du suchst eine bestimmte Funktion? Nutze die Hauptkategorien unten, um direkt zu den Informationen zu springen, die du brauchst.
:::

## Editionen – Lite vs. Pro

**MHM Rentiva (Lite)** ist die kostenlose Edition, die auf WordPress.org veröffentlicht ist. Sie deckt den gesamten Vermietungskern ab – Flottenverwaltung, Verfügbarkeit, Buchungen, Kunden, WooCommerce-Checkout, E-Mail-Benachrichtigungen, die Kundenkonto-Seiten sowie alle Shortcodes, Blöcke und Elementor-Widgets – **ohne Begrenzung bei Fahrzeugen, Buchungen oder Einträgen, ohne zeitlich begrenzte Funktionen und ohne gesperrte Bildschirme**.

**MHM Rentiva Pro** ist eine *separate kostenpflichtige Erweiterung*, die zusätzlich zu Lite installiert wird. Sie ersetzt Lite nicht, sondern ergänzt es um die Marktplatz-, Transfer- und Compliance-Ebene:

| Nur in Pro verfügbare Funktion | Was sie abdeckt |
| --- | --- |
| **Multi-Anbieter-Marktplatz** | Anbieter-Onboarding & -Freigabe, Anbieter-Panel, Anbieter-Einträge |
| **Anbieter-Auszahlungen, Provision & Hauptbuch** | Provisionsabgrenzung, Verrechnung, Auszahlungsfreigabe, Hauptbuch |
| **Anbieter-Meldungen & Streitfälle** | Meldungen von Anbietern an den Admin und der Einspruchsablauf |
| **VIP-Transfers + standortbasierte Routen** | Transfersuche/-ergebnisse, Routenverwaltung, beliebte Routen |
| **Kundennachrichten** | Nachrichtenverläufe zwischen Admin ↔ Kunde |
| **Erweiterte Berichte** | Erweiterte Auswertungen über das Lite-Dashboard hinaus |
| **Eigener Export-Bildschirm** | Die eigenständige Export-Adminseite |
| **DSGVO-/Datenaufbewahrungs-Tools** | Datenexport/-löschung, Einwilligung, Aufbewahrungs-Cron |

:::info So erkennst du den Unterschied
Jede Dokumentationsseite, die eine Pro-Funktion beschreibt, trägt oben ein **![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square)**-Badge. Seiten ohne dieses Badge dokumentieren Lite-Funktionen, die in der kostenlosen Edition funktionieren.

Pro-Funktionen sind an eine **gültige Lizenz** gebunden und nicht bloß ausgeblendet – ist Pro installiert, aber nicht lizenziert, bleiben diese Bildschirme deaktiviert. Pro ist unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/) erhältlich.
:::

---

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #0f766e' }}>
      <h3 className="cardTitle">🚀 Erste Schritte</h3>
      <p className="cardDescription">Bring das System in wenigen Minuten zum Laufen. Ein Schritt-für-Schritt-Fahrplan für Voraussetzungen, Aktivierung und Erstkonfiguration.</p>
      <Link className="button button--secondary button--block" to="/docs/getting-started/reading-order">Jetzt starten</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #3578e5' }}>
      <h3 className="cardTitle">⚙️ Grundkonfiguration</h3>
      <p className="cardDescription">Allgemeine Einstellungen, WooCommerce-Zahlungsgateways, Steuerkonfiguration und E-Mail-Benachrichtigungssysteme.</p>
      <Link className="button button--secondary button--block" to="/docs/core-configuration/settings">Einstellungen konfigurieren</Link>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #e5ad24' }}>
      <h3 className="cardTitle">🚗 Funktionen & Nutzung</h3>
      <p className="cardDescription">Hol das Beste aus Fahrzeugverwaltung, Buchungsverfolgung, Kundenportal und Berichtsmodulen heraus.</p>
      <Link className="button button--secondary button--block" to="/docs/features-usage/reading-order">Benutzerhandbuch</Link>
    </div>
  </div>
  <div className="col col--6 margin-bottom--lg">
    <div className="card padding--lg cardContainer shadow--md" style={{ height: '100%', borderTop: '4px solid #df3c29' }}>
      <h3 className="cardTitle">💻 Entwicklerhandbuch</h3>
      <p className="cardDescription">REST-API-Referenzen, Hook-/Filter-Listen und Datenbankschema für alle, die das Plugin anpassen möchten.</p>
      <Link className="button button--secondary button--block" to="/docs/developer/reading-order">Technische Details</Link>
    </div>
  </div>
</div>

---

## 🔝 Beliebte Themen
Du suchst eine schnelle Antwort? Durchstöbere die meistbesuchten Themen:

- 💳 [WooCommerce-Zahlungsintegration](./core-configuration/payments)
- 📧 [E-Mail-Vorlagen anpassen](./core-configuration/emails)
- 🏎️ [Fahrzeuge hinzufügen und Verfügbarkeitskalender](./features-usage/vehicles)
- 🧩 [Shortcode-Referenz](./features-usage/shortcodes/overview)
- ✅ [Checkliste nach der Installation](./getting-started/post-install-checklist)
- ➕ [Verwaltung von Zusatzleistungen](./features-usage/additional-services-usage)
- 🛠️ [Leitfaden zur Fehlerbehebung](./faq/common-issues)

---

## 🏗️ Technische Ressourcen
Ausführliche technische Dokumentation für Entwickler:

- 🧱 [Modularchitektur](./developer/core/technical-architecture)
- 💰 [Finanz-Governance](./developer/financial/governance-controls)
- 🧾 [Datenmodell des Hauptbuchs](./developer/financial/financial-ledger-model)
- 🧪 [Controller-Audit](./developer/testing/test-suite)
- 🧠 [REST-API-Architektur](./api/overview)
- 🌐 [v1-REST-API-Referenz](./api/v1/rest-api-v1)

---

## 🤝 Anbieter-Ökosystem
- 🚀 [Anbieter-Onboarding](./vendor/onboarding)
- 💳 [Auszahlungs- & Hauptbuchsystem](./vendor/payouts-ledger)
- 📊 [Analysen & Leistung](./vendor/analytics)
- 🛡️ [Sicherheit & Datenschutz](./vendor/security-privacy)

---

## 🌐 Support & Community
- **Problem melden:** [GitHub Issues](https://github.com/MaxHandMade/mhm-rentiva/issues)
- **Community-Forum:** [WordPress-Support](https://wordpress.org/support/plugin/mhm-rentiva)
- **Entwickler-Blog:** [Blog](/blog)

---

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Hotfix für Verunreinigung durch Einstellungstests + Deduplizierung doppelter Addon-Hinweise. |
| 23.04.2026 | 4.27.1 | Hotfix für i18n-Locale-Leck. |
| 23.04.2026 | 4.27.0 | Bereit für die Einreichung bei WordPress.org. |
| 21.03.2026 | 4.21.5 | Alle Routen-IDs und Kategoriezuordnungen zu 100 % verifiziert. |
