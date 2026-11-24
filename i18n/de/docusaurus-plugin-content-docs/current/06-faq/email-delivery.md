---
id: email-delivery
title: "Probleme beim E-Mail-Versand und bei der Zustellung"
sidebar_label: "E-Mail-Zustellung"
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
MHM Rentiva ist für Buchungsbestätigungen und Benachrichtigungen an Anbieter stark auf das E-Mail-System angewiesen. Diese Seite erklärt, wie du Fehler beim E-Mail-Versand diagnostizierst und behebst.
:::

# 📧 Probleme beim E-Mail-Versand und bei der Zustellung

System-E-Mails (`Mailer::send`) verwenden die Standardfunktion `wp_mail()` von WordPress. Zustellungsprobleme hängen in der Regel mit der Serverkonfiguration oder dem E-Mail-Dienstanbieter zusammen.

---

## ❌ 1. E-Mails werden überhaupt nicht gesendet (Systemfehler)

### Log-Prüfung
- **Diagnose:** Prüfe E-Mail-Fehler im Tab „Rentiva > System Logs“ (AdvancedLogger). Der Beitragstyp `EmailLog` protokolliert jeden Sendeversuch.
- **Lösung:** Passe deine SMTP-Einstellungen anhand der Fehlermeldung an, die von der Klasse `Mailer` zurückgegeben wird.

### SMTP-Konfiguration
- **Grund:** Die PHP-Funktion `mail()` ist auf vielen modernen Servern blockiert.
- **Lösung:** Konfiguriere einen SMTP-Anbieter (SendGrid, Mailgun usw.) mit einem Plugin wie „WP Mail SMTP“ oder direkt in den Rentiva-Einstellungen.

---

## 📂 2. E-Mails landen im Spam

### SPF-, DKIM- und DMARC-Einträge
- **Grund:** Die Berechtigung deiner Domain zum Versenden von E-Mails ist möglicherweise nicht korrekt definiert.
- **Lösung:** Überprüfe die folgenden Einträge in deinen DNS-Einstellungen:
    - **SPF:** Muss die IP-Adresse des Servers enthalten, der die E-Mails versendet.
    - **DKIM:** Ermöglicht die digitale Signatur von E-Mails.
    - **DMARC:** Legt eine Richtlinie gegen gefälschte E-Mails fest.

### Abweichende Absenderadresse
- **Grund:** Die „Absender-E-Mail-Adresse“ in den Einstellungen stimmt möglicherweise nicht mit der E-Mail-Adresse des SMTP-Kontos überein.
- **Lösung:** Sorge dafür, dass die Absenderadresse (`From:`) mit der autorisierten SMTP-Adresse übereinstimmt.

---

## 🕒 3. Verzögerte Zustellung und Warteschlangenprobleme

### Status von WordPress Cron (WP-Cron)
- **Grund:** Das System verarbeitet Massen-E-Mails oder verzögerte Benachrichtigungen über WP-Cron. Wenn deine Website keinen Traffic erhält, wird Cron möglicherweise nicht ausgeführt.
- **Lösung:** Richte einen echten serverseitigen Cronjob ein, der `wp-cron.php` jede Minute auslöst.

### Limits des Dienstanbieters
- **Grund:** Shared-Hosting-Tarife können stündliche E-Mail-Limits erzwingen.
- **Lösung:** Prüfe deine Limits oder wechsle zu einem professionellen E-Mail-Zustelldienst.

---

## 🛠️ 4. Testmodus und Debugging

### E-Mail-Testmodus
- **Prüfung:** Wenn die Einstellung `mhmrentiva_email_test_mode` aktiviert ist, werden E-Mails nur in `AdvancedLogger` protokolliert, statt an echte Empfänger gesendet zu werden.
- **Lösung:** Stelle sicher, dass der Testmodus deaktiviert ist, bevor du live gehst.

### Vorlagenfehler
- **Grund:** Wenn eine benutzerdefinierte HTML-Vorlage (`EmailTemplates`) verwendet wird, kann fehlerhafter PHP-Code die Zustellung verhindern.
- **Lösung:** Teste den Versand mit der Standardvorlage.

## Checkliste
1. Prüfe den Beitragstyp `EmailLog`.
2. Teste die SMTP-Verbindung.
3. Überprüfe die DNS-Einträge der Domain (SPF/DKIM).
4. Stelle sicher, dass der Testmodus deaktiviert ist.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu SMTP, DNS (SPF/DKIM) und Testmodus hinzugefügt. |
