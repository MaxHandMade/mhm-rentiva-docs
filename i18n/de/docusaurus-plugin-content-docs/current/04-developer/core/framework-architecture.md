---
id: framework-architecture
title: "Architektur des Vermietungs-Frameworks (Leasing-Framework)"
sidebar_label: "Architektur & Anpassung"
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite erklärt, wie MHM Rentiva sein Modell für Mietobjekte verwaltet, welche technischen Unterschiede zwischen der Lite- und der Pro-Version bestehen und wie das flexible Attributsystem funktioniert.
:::

# 🏗️ Architektur des Vermietungs-Frameworks

MHM Rentiva ist nicht nur ein Plugin für die Fahrzeugvermietung, sondern ein flexibles **Vermietungs-Framework**, das sich für Autos, Fahrräder, Boote oder ähnliche Mietobjekte anpassen lässt.

## 🛠️ Modulare Architektur (Lite vs. Pro)

Lite hat keine Lizenzierungsschicht. Die alte Klasse `MHMRentiva\Admin\Licensing\Mode` wurde in 5.2.0 aus Lite entfernt und mit ihr sämtliche Kapazitätsgrenzen: Lite hat **keine Obergrenzen für Fahrzeuge, Buchungen, Kunden, Galerien oder Zusatzleistungen**.

Die Lizenzierung befindet sich ausschließlich im Add-on Rentiva Pro. Pro prüft seine eigene Sperre, `MHMRentiva\Pro\Edition`, bevor es jedes seiner Module registriert.

### 📊 Funktionen der Pro-Lizenz
| Pro-Modul | Sperre |
| :--- | :--- |
| Anbieter-Marktplatz, Auszahlungen, Anbieterberichte, Lebenszyklus von Inseraten | `Edition::canUseVendorMarketplace()` (Lizenzfunktion `vendor_marketplace`) |
| Nachrichten | `Edition::canUseMessages()` (`messaging`) |
| Berichte | `Edition::canUseAdvancedReports()` (`advanced_reports`) |
| Erweiterter Export (CSV und JSON) | `Edition::canUseExport()` (`export`) |
| DSGVO-Werkzeuge | `Edition::canUseGdpr()` (`gdpr_tools`) |
| VIP-Transfer | `Edition::isPro()` (jede aktive Lizenz) |

Der Lizenzserver stellt außerdem `full_rest_api` und `custom_emails` aus, aber kein Code liest sie aus: Sie schalten nichts frei.

---

## 🧬 Trennung von Kernfeldern und Attributen

Die Plattform teilt Daten nach operativer Priorität in zwei Hauptgruppen auf:

### 1. Kernfelder
:::danger Können nicht gelöscht / deaktiviert werden
Diese Felder sind für die Preisberechnung, die Buchung und die Rechnungsstellung des Systems zwingend erforderlich.
:::
- **Preisgestaltung:** Täglicher Grundpreis und Steuersätze.
- **Verfügbarkeit:** Kalenderbasierte Bestandskontrolle.
- **Objektidentität:** Kennzeichen, Seriennummer oder eindeutige ID.

### 2. Attributfelder
:::tip Anpassbar
Felder, die je nach Geschäftsmodell hinzugefügt oder vollständig entfernt werden können.
:::
- **Objektdetails:** Kraftstoffart, Getriebe, Anzahl der Sitze.
- **Zusätzliche Parameter:** Felder, die über `MHMRentiva\Core\Attribute\AllowlistRegistry` verwaltet werden und in Shortcodes als Parameter verwendet werden können.

---

## 🧩 Modulflexibilität (Clean Slate)

Das Plugin verfolgt eine **„Clean Slate“**-Strategie. So kannst du die Oberfläche vereinfachen, indem du nicht benötigte Funktionen deaktivierst:

- **Plugin-Einstellungen:** Nicht verwendete Felder können in den Tabs unter `MHM Rentiva > Settings` ausgeblendet werden.
- **UI-Pipeline:** Wird ein Feld ausgeblendet, wird es automatisch sowohl aus den Admin-Formularen im Backend als auch aus der Spezifikationstabelle im Frontend entfernt.

## Zusammenfassung des Abschnitts
- Das System setzt Grenzen über die Klasse `Mode` durch.
- **Pro** hebt alle technischen Grenzen auf und ermöglicht unbegrenzte Skalierung.
- Die Architektur passt sich auch an Vermietungsmodelle jenseits von Fahrzeugen an (durch Ändern der technischen Attribute).

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 09.11.2026 | 6.3.1 | Korrektur: Die Lite-Kapazitätstabelle (3 Fahrzeuge, 50 Buchungen …) wurde entfernt; diese Grenzen und die Klasse `Mode` wurden in 5.2.0 aus Lite entfernt. Stattdessen werden die Pro-Sperren `Edition` und ihre Lizenzfunktionen aufgeführt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite mit Lite-/Pro-Grenzen und aktuellen Architekturdetails aktualisiert. |
