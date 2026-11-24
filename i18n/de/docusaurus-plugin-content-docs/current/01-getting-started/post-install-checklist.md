---
id: post-install-checklist
title: "Checkliste nach der Installation"
sidebar_label: "Checkliste"
sidebar_position: 4
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Nachdem du die Installationsschritte und den Einrichtungsassistenten abgeschlossen hast, gehe die folgende Checkliste durch, um sicherzustellen, dass deine Website voll funktionsfähig ist. Diese Checkliste ist die letzte Sicherheitsprüfung, bevor du echte Buchungen annimmst.

---

### 🛠️ Konfigurationsprüfung
- [ ] **Einstellungen gespeichert:** Alle Tabs auf der Seite `MHM Rentiva > Settings` wurden überprüft und gespeichert.
- [ ] **Währung:** Währung und Symbol werden im Tab `General Settings` korrekt angezeigt.
- [ ] **Datum & Uhrzeit:** Die Zeitzone deiner Website (`Settings > General`) stimmt mit dem Standort deines Unternehmens überein.
- [ ] **Lizenz:** Du hast bestätigt, dass dein Schlüssel auf der Seite `License` als „Aktiv“ angezeigt wird.

### 📄 Seiten und Shortcodes
- [ ] **Seitenzuweisungen:** Jede Funktion (Suche, Auflistung, Detail, Kasse, Mein Konto) ist unter `Settings > Shortcode Pages` der richtigen Seite zugewiesen.
- [ ] **Anzeigetest:** Diese erstellten Seiten öffnen sich im Frontend sauber und ohne Fehler.
- [ ] **Menüintegration:** Das Kunden-Dashboard (Mein Konto) und die Suchseite wurden zum Hauptmenü hinzugefügt.

### 💰 Zahlung und Finanzen
- [ ] **Zahlungs-Gateways:** WooCommerce-Zahlungsmethoden (Stripe, PayPal, Banküberweisung usw.) wurden aktiviert.
- [ ] **Testzahlung:** Mindestens eine Buchungszahlung wurde im Sandbox-/Testmodus erfolgreich abgeschlossen.
- [ ] **Preisberechnung:** Tagespreise der Fahrzeuge und Zusatzleistungen werden im Warenkorb korrekt übernommen.

### 📧 Benachrichtigungssystem
- [ ] **Test-E-Mail:** Eine Test-E-Mail wurde über `Settings > Email Templates` gesendet.
- [ ] **SMTP-Überprüfung:** E-Mails erreichen die Empfänger, ohne im Spam-Ordner zu landen (SMTP wird empfohlen).
- [ ] **Admin-Benachrichtigungen:** Bei Eingang einer neuen Buchung wird eine E-Mail-Benachrichtigung an den Administrator ausgelöst.

### 🚗 Fahrzeug- und Bestandsverwaltung
- [ ] **Beispielfahrzeug:** Mindestens ein Fahrzeug mit echten Eigenschaften wurde dem System hinzugefügt.
- [ ] **Kategorien:** Die Fahrzeuge wurden nach Klasse gruppiert (Economy, SUV, VIP usw.).
- [ ] **Kalenderprüfung:** Der Verfügbarkeitskalender des Fahrzeugs wird nach einer Buchung korrekt aktualisiert.

---

## Technische Überprüfung (für Entwickler)

Wenn ein technisches Problem auftritt, prüfe Folgendes:

1. **Permalinks:** Rufe `Settings > Permalinks` auf und klicke auf „Änderungen speichern“, um die Rewrite-Regeln zu leeren (`flush_rewrite_rules`).
2. **WooCommerce-Synchronisierung:** Prüfe anhand der `WooCommerceBridge`-Logs, ob Rentiva Daten an den WooCommerce-Warenkorb sendet.
3. **Datenbankprüfung:** Über phpMyAdmin kannst du aktive Sitzungsdaten in der Tabelle `wp_mhmrentiva_sessions` überprüfen.

---

### Zusammenfassung des Abschnitts
- Die Checkliste besteht aus **5 Hauptkategorien**.
- Eine Testzahlung **vor dem Livegang** abzuschließen, ist entscheidend.
- **Das Leeren der Permalinks** behebt viele seitenbezogene Fehler.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 18.03.2026 | 4.21.2 | Struktur der Checkliste mit modernen Icons und Kategorien überarbeitet. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
