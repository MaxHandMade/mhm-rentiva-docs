---
id: setup-wizard
title: "Einrichtungsassistent"
sidebar_label: "Einrichtungsassistent"
sidebar_position: 15
slug: /features-usage/setup-wizard
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Einrichtungsassistent führt dich durch die Vorbereitung von MHM Rentiva auf einer neuen WordPress-Installation und die Konfiguration der Einstellungen. Du kannst den Assistenten jederzeit über **MHM Rentiva > Einrichtungsassistent** erneut öffnen. Er umfasst fünf nummerierte Schritte, die jeweils als Karte angezeigt werden: Systemprüfung, Erforderliche Seiten, E-Mail-Einstellungen, Frontend & Darstellung sowie Zusammenfassung & Tests.

---

## Schritt 1: Systemanforderungen (Systemprüfung)

Prüft deine WordPress-Umgebung, um sicherzustellen, dass Rentiva zuverlässig läuft. Jede Zeile zeigt den aktuellen Wert, den empfohlenen Wert und einen Status. Behebe alle als erforderlich markierten Punkte, bevor du fortfährst:

- **WooCommerce:** Der Status „Installiert“ und „Aktiv“ wird geprüft (erforderlich).
- **PHP-Version:** Wird mit der vom Plugin geforderten Mindestversion verglichen (PHP 8.1+).
- **WordPress-Version:** Wird mit der vom Plugin geforderten Mindestversion verglichen (WordPress 7.0+).
- **Datenbankversion:** MySQL 5.7+ oder MariaDB 10.3+ wird empfohlen.
- **PHP-Speicherlimit:** 256 MB werden empfohlen. Liegt der Wert darunter, zeigt der Schritt einen Hinweis mit der Zeile, die du in `wp-config.php` einfügen musst.
- **PHP `max_execution_time`:** *Warnung* unter 60 Sekunden; erhöhe den Wert für große Importe.
- **HTTPS / SSL:** *Warnung*, wenn kein gültiges SSL-Zertifikat erkannt wird.
- **WP-Cron:** *Warnung*, wenn WP-Cron deaktiviert ist; geplante E-Mails und Erinnerungen benötigen WP-Cron oder einen echten Server-Cronjob.
- **E-Mail-Zustellung:** *Warnung*, wenn kein SMTP-Anbieter erkannt wird.

Die Mindestversionen für PHP und WordPress werden direkt aus dem Plugin ausgelesen, sodass dieser Schritt immer den tatsächlichen Anforderungen des Plugins entspricht.

---

## Schritt 2: Erforderliche Seiten

Rentiva verwendet eigene WordPress-Seiten für Suche, Fahrzeugdetails, Buchung und Kontakt (Shortcode-Seiten). Du kannst diese Seiten mit der Schaltfläche **Fehlende Seiten erstellen** anlegen oder über **Shortcode-Seiten öffnen** bestehende Seiten verknüpfen. Folgende Seiten werden vom Assistenten eingerichtet (mit ihren empfohlenen URLs):

1. **Buchungsformular** (`[rentiva_booking_form]`) -> `/rentiva/booking-form/`
2. **Einheitliche Suche** (`[rentiva_unified_search]`) -> `/rentiva/search/`
3. **Suchergebnisse** (`[rentiva_search_results]`) -> `/rentiva/search-results/`
4. **Fahrzeugdetails** (`[rentiva_vehicle_details]`) -> `/rentiva/vehicle/`
5. **Fahrzeugliste** (`[rentiva_vehicles_list]`) -> `/rentiva/vehicles/`
6. **Kontaktformular** (`[rentiva_contact]`) -> `/rentiva/contact/`

:::info Optionale Seiten
Die Seiten **Fahrzeugraster** (`[rentiva_vehicles_grid]`) und **Fahrzeugvergleich** (`[rentiva_vehicle_comparison]`) sind optional und werden vom Assistenten nicht vorausgesetzt. Du kannst sie bei Bedarf manuell erstellen.
:::

Neben jeder Seite wird der Status „Vorhanden“ oder „Fehlt“ angezeigt, bei bestehenden Seiten zusätzlich ein Link „Bearbeiten“.

---

## Schritt 3: E-Mail-Einstellungen und Benachrichtigungen

In diesem Schritt konfigurierst du die Absenderdaten und die automatischen E-Mail-Benachrichtigungen für Buchungen.
*Der Assistent weist vorab darauf hin, dass das Standard-Mailsystem von WordPress unzuverlässig sein kann, und empfiehlt ein SMTP-Plugin wie WP Mail SMTP oder Fluent SMTP.*

**Konfigurationsfelder:**
- **Absendername** und **Absender-E-Mail:** Name und Adresse, die in E-Mails an Kunden verwendet werden.
- **Antwortadresse (Reply-To):** Wohin die E-Mail geht, wenn ein Kunde auf „Antworten“ klickt.
- **Testmodus** und **Test-E-Mail-Adresse:** Solange der Testmodus aktiv ist, wird jede E-Mail ausschließlich an die Testadresse gesendet. Deaktiviere ihn, bevor du live gehst.

**Automatisierungsoptionen:**
- **E-Mail-Versand aktiviert**
- **Automatischer E-Mail-Versand aktiviert** (zum Beispiel bei einer Änderung des Buchungsstatus)
- **E-Mails im Beitragstyp „E-Mail-Protokoll“ protokollieren:** speichert einen Nachweis der gesendeten E-Mails.

---

## Schritt 4: Frontend und Darstellung

Grundlegende Einstellungen zu Finanzen, Mietdauer und Farben, die auf der Kundenseite, in Buchungsformularen und auf Fahrzeugkarten erscheinen:

- **Währung und Währungsposition:** *MHM Rentiva ist mit WooCommerce integriert.* Bei aktivem WooCommerce zeigt der Assistent „Von WooCommerce verwaltet: …“ an und ändert die Währung nicht; über einen Link gelangst du zu den WooCommerce-Einstellungen, falls du etwas ändern möchtest.
- **Standard-Miettage:** Die standardmäßige Mietdauer, die in Formularen vorausgefüllt wird (1–30).
- **Minimale Miettage:** Die minimale Anzahl an Tagen, die das System akzeptiert.
- **Maximale Miettage:** Ein Limit, das übermäßig lange Mieten verhindert.
- **Akzentfarbe:** Dieselbe Einstellung wie unter **Einstellungen > Frontend & Darstellung > Farben** (Automatisch oder Benutzerdefiniert, mit Vorschau).

:::info Geändert in 6.4.0
Die Schalter „Merkmal-Badges anzeigen“ und „Verfügbarkeits-Badge anzeigen“ für Fahrzeugkarten entfallen; diese werden über Shortcode-Parameter gesteuert (`show_features`, `show_badges` usw.).
:::

---

## Schritt 5: Zusammenfassung & Tests

Listet jeden Schritt mit seinem Status auf. Wenn deine Permalink-Struktur auf „Einfach“ steht, fordert dich eine Warnung auf, sie zu ändern (zum Beispiel auf „Beitragsname“), damit die Frontend-Seiten funktionieren. Nutze **Einstellungen öffnen**, **Shortcode-Seiten prüfen** oder **Test-E-Mail senden**, um alles zu überprüfen, und klicke dann auf **Einrichtung abschließen**.

---

### Zusammenfassung des Abschnitts
- Der Einrichtungsassistent beginnt mit einer Systemprüfung und nutzt WooCommerce für die Währung – so erhältst du eine solide Grundlage.
- Nach Abschluss des Assistenten sind die erforderlichen Seiten, Shortcodes und die E-Mail-Automatisierung einsatzbereit.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Assistent bildet die tatsächlichen fünf Schritte ab (der Lizenzschritt ist nicht Teil des Assistenten); Akzentfarbe hinzugefügt; E-Mail- und Darstellungsschritte aktualisiert; Mindestversionen werden aus dem Plugin ausgelesen. |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 27.03.2026 | 4.22.1 | Liste der erforderlichen Seiten aktualisiert: `rentiva_vehicle_details` hinzugefügt, `rentiva_vehicles_grid` und `rentiva_vehicle_comparison` entfernt (jetzt optional). 7 -> 6 Seiten. |
| 19.03.2026 | 4.21.2 | Anleitung erstellt. |
