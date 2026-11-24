---
id: common-issues
title: "Häufige Probleme & Lösungen"
sidebar_label: "Häufige Probleme"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite behandelt die häufigsten technischen und betrieblichen Probleme, auf die Benutzer und Administratoren von MHM Rentiva stoßen können, zusammen mit schnellen Lösungsschritten.
:::

# 🛠️ Häufige Probleme & Lösungen

Die folgenden Themen sind nach den Szenarien geordnet, die in Support-Anfragen am häufigsten vorkommen.

---

## 📅 1. Probleme mit Buchungen & Kalender

### Eine Buchung wird erstellt, erscheint aber nicht im Kalender?
- **Grund:** Der Buchungsstatus ist möglicherweise `pending`. Der Kalender zeigt nur Einträge mit dem Status `confirmed` oder `completed` an.
- **Lösung:** Prüfe den Status in der Buchungsliste und bestätige die Buchung.

### Ich erhalte den Fehler „Die ausgewählten Daten sind nicht verfügbar“?
- **Grund:** An diesen Tagen gibt es eine andere bestätigte Buchung oder das Fahrzeug befindet sich im Modus „Wartung“.
- **Lösung:** Prüfe benutzerdefinierte Einschränkungen unter `Vehicle Settings > Availability` oder untersuche `Util::has_overlap()`-Konflikte.

---

## 💳 2. Zahlung & WooCommerce-Integration

### Die Zahlung war erfolgreich, aber der Buchungsstatus hat sich nicht geändert?
- **Grund:** Das Signal des WooCommerce-Webhooks oder der IPN (Instant Payment Notification) erreicht Rentiva nicht.
- **Lösung:**
    1. Prüfe die Fehlerprotokolle unter WooCommerce > Status > Logs.
    2. Verwende `Order > Actions > Re-send Payment Notification` für eine manuelle Auslösung.
    3. Überprüfe die Statuszuordnungen in der Klasse `WooCommerceBridge`.

### Fehler „Keine Zahlungsmethoden verfügbar“ auf der Zahlungsseite?
- **Grund:** Die für das Fahrzeug festgelegte Währung stimmt nicht mit der von der Zahlungsmethode akzeptierten Währung überein.
- **Lösung:** Prüfe die `CurrencyHelper`-Einstellungen und die Einschränkungen der WooCommerce-Zahlungsmethoden.

---

## 👤 3. Probleme mit Anbietern

### Kein Zugriff auf das Anbieter-Dashboard (Fehler 403)?
- **Grund:** Dem Benutzer wurde die Rolle `rentiva_vendor` nicht zugewiesen oder das Konto hat den Status „Gesperrt“.
- **Lösung:** Aktiviere das Konto im Benutzerprofil und überprüfe die Rolle.

### Das Anbieterguthaben zeigt 0 an?
- **Grund:** Die Buchung ist noch nicht in den Status `completed` übergegangen oder der Ledger-Eintrag wurde noch nicht `cleared`.
- **Lösung:** Lies den Abschnitt „Earnings Cycle“ in der Dokumentation `Payouts & Ledger`.

---

## ⚡ 4. Probleme mit Performance & Oberfläche

### Änderungen werden im Frontend nicht angezeigt?
- **Grund:** Aggressives Seiten-Caching (WP Rocket, LiteSpeed usw.) oder der Browser-Cache.
- **Lösung:**
    1. Führe in den Rentiva-Einstellungen einen „Cache Flush“ durch.
    2. Versuche, den Parameter `cache="false"` in Shortcodes zu verwenden.

### Auf einer Polylang- oder WPML-Website sehen Besucher Namen in einer anderen Sprache?
- **Seit 6.4.0:** Die Verfügbarkeitsmeldung auf der Fahrzeugseite sowie die Namen für Kraftstoff, Getriebe und Kategorien in der Such-Seitenleiste erscheinen in der jeweiligen Sprache des Besuchers. Die gemeinsamen Caches von Rentiva enthalten keinen Text; Kategorienamen werden aus den Begriffen deines Übersetzungs-Plugins gelesen.
- **Lösung, falls eine Sprache weiterhin falsche Namen anzeigt:** Übersetze die Fahrzeugkategorien in deinem Übersetzungs-Plugin und leere deinen Seiten-Cache.

### Karten- oder Standortdienste funktionieren nicht?
- **Grund:** Ungültiger Google-Maps-API-Schlüssel oder eingeschränkter HTTP-Referer.
- **Lösung:** Teste den Schlüssel unter Rentiva > Einstellungen > Tab „API“.

---

## 📝 Checkliste zur Fehlerbehebung
Wenn das Problem weiterhin besteht, befolge diese Schritte:
1. Aktiviere den `WP_DEBUG`-Modus.
2. Prüfe die `AdvancedLogger`-Einträge (Systemprotokolle).
3. Deaktiviere vorübergehend andere Plugins, um Plugin-Konflikte auszuschließen.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | 6.4.0 | Hinweis zur Mehrsprachigkeit (Polylang/WPML) hinzugefügt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Ausführliche Punkte zur Fehlerbehebung für Buchungen, Zahlungen und Anbieter hinzugefügt. |
