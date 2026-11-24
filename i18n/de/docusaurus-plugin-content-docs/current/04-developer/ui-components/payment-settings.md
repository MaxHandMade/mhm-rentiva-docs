---
id: payment-settings
title: "Architektur der PaymentSettings-Klasse (UI & Integration)"
sidebar_label: "Zahlungseinstellungen (technisch)"
sidebar_position: 5
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite erklärt die Architektur der Zahlungseinstellungen von Rentiva und wie die Klasse `PaymentSettings` eine Brücke zu **WooCommerce** schlägt, um Zahlungs-Gateways zu verwalten – anstatt sie selbst direkt zu verwalten.
:::

# 💳 PaymentSettings-Klasse

Rentiva folgt für Sicherheit und Flexibilität bei Zahlungen dem Prinzip „Das Rad nicht neu erfinden“ und überlässt die gesamte Zahlungsabwicklung der **WooCommerce**-Ebene. `PaymentSettings` ist eine Steuerzentrale, die den Zustand dieser Integration überwacht.

---

## 🏗️ Architekturstrategie: Delegation

Der Rentiva-Kern verarbeitet Kreditkarten- oder Bankdaten nicht direkt. Stattdessen gilt:
1.  **Frontend:** Wenn das Buchungsformular abgeschlossen ist, wird eine WooCommerce-Bestellung erstellt.
2.  **PaymentSettings:** Diese Klasse prüft, ob WooCommerce aktiv ist, und leitet den Administrator an die richtige Stelle in den WC-Einstellungen weiter.
3.  **Rechtliche Konformität:** Zahlungsdaten werden nach WC-Standards gespeichert; Rentiva referenziert nur die Transaktions-ID.

---

## 🛡️ Überwachung des Integrationsstatus

Die Methode `render_payment_section_description()` prüft in Echtzeit, ob das System Zahlungen annehmen kann:

```php
// Is WooCommerce loaded?
if ( class_exists( 'WooCommerce' ) ) {
    // Quick link to WC Settings and Status Active badge
} else {
    // Critical warning prompting the admin to install WC
}
```

---

## 🔗 Registrierung und Settings API

`PaymentSettings` wird als Abschnitt auf der zentralen Einstellungsseite von Rentiva (`SettingsCore::PAGE`) registriert.

-   **Abschnitts-ID:** `mhmrentiva_general_payment_section`
-   **Hook:** `admin_init` (über die zentrale `SettingsManager`).

---

## 📋 Verwandte Klassen

Die Zahlungseinstellungen beschränken sich nicht auf diese eine Klasse; die betrieblichen Einstellungen sind auf die folgenden Klassen verteilt:

| Klasse | Zuständigkeit |
| :--- | :--- |
| `WooCommerceBridge` | Produkt- und Bestellzuordnungen. |
| `EmailSettings` | Konfiguration der Bestätigungs-E-Mails nach der Zahlung. |
| `MaintenanceSettings` | Ratenbegrenzung und Sicherheitsregeln auf Zahlungsseiten. |

## Zusammenfassung des Abschnitts
- Rentiva verwaltet keine Zahlungs-Gateways; es nutzt **WooCommerce** als Engine.
- `PaymentSettings` visualisiert die Einstellungen und den Verbindungsstatus dieser Brücke.
- Gateway-spezifische Einstellungen (iyzico, Stripe usw.) werden immer über WC konfiguriert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite komplett neu geschrieben, um die WooCommerce-Delegationsstrategie widerzuspiegeln. |
