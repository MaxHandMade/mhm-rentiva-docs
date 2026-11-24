---
id: emails
title: "E-Mails & Benachrichtigungen"
sidebar_label: "E-Mail-Konfiguration"
sidebar_position: 5
slug: /core-configuration/emails
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva enthält ein E-Mail-Benachrichtigungssystem, das sowohl den Administrator als auch den Kunden bei jedem Schritt des Buchungsprozesses auf dem Laufenden hält. Die Absenderdaten und das Erscheinungsbild der E-Mails legst du unter **MHM Rentiva > Einstellungen > E-Mail-Adresse** fest; der Inhalt jeder E-Mail wird unter **MHM Rentiva > Einstellungen > Benachrichtigungs-Templates** bearbeitet.

---

## 📧 Allgemeine E-Mail-Konfiguration

Konfiguriere die Grundlagen, damit alle E-Mails professionell aussehen (siehe [E-Mail-Konfiguration](./email-configuration.md) für alle Felder):
- **Absendername & Absender-E-Mail:** Der Name und die Adresse, die deine Kunden in ihrem Posteingang sehen.
- **Header-Bild (Logo-URL):** Das Firmenlogo, das oben in den E-Mails erscheint.
- **Grundfarbe:** Eine zu deiner Marke passende Farbe für Buttons und Überschriften.

:::important SMTP-Empfehlung
Die Standardfunktion `mail()` von WordPress führt oft dazu, dass E-Mails im Ordner „Spam“ landen. Für eine zuverlässige Zustellung empfehlen wir dringend, einen SMTP-Server – etwa SendGrid, Mailgun oder deinen eigenen – mit einem Plugin wie **WP Mail SMTP** anzubinden.
:::

---

## 📝 Template-Variablen (Platzhalter)

Verwende die folgenden dynamischen Tags, um Templates zu personalisieren. Das System ersetzt diese Tags beim Versand der E-Mail durch echte Daten:

| Tag | Beschreibung |
| :--- | :--- |
| `{salutation_name}` | Der Name des Kunden für eine Anrede („`Dear {salutation_name},`“). Wenn die Buchung keinen Namen hat, wird „geschätzter Kunde“ ausgegeben, sodass ein Kunde nie „Sehr geehrte/r ,“ liest. |
| `{contact_name}` / `{customer_name}` | Der vollständige Name des Kunden. |
| `{contact_email}` | Die E-Mail-Adresse des Kunden. |
| `{booking_id}` | Die dem Kunden angezeigte Buchungsnummer (die Bestellnummer, sofern vorhanden). |
| `{vehicle_title}` | Der Titel des gemieteten Fahrzeugs. |
| `{pickup_date}` | Das Abholdatum. |
| `{dropoff_date}` / `{return_date}` | Das Rückgabedatum. |
| `{pickup_time}` | Die Abholzeit. |
| `{return_time}` / `{dropoff_time}` | Die Rückgabezeit. |
| `{pickup_datetime}` | Abholdatum und -zeit zusammen, zum Beispiel „01/07/2099, 10:00“. Gibt nur das Datum aus, wenn keine Uhrzeit gespeichert ist. |
| `{return_datetime}` / `{dropoff_datetime}` | Rückgabedatum und -zeit zusammen; nur das Datum, wenn keine Uhrzeit gespeichert ist. |
| `{total_price}` | Gesamtkosten der Miete (mit Währungssymbol). |
| `{status}` | Der Buchungsstatus. |
| `{site_name}` | Der Name deiner Website. |
| `{site_url}` | Die Adresse deiner Website. |
| `{my_account_url}` | Die Seite „Mein Konto“ des Kunden. |

Erstattungs-E-Mails akzeptieren außerdem `{amount}`, `{currency}` und `{reason}`.

:::info Datum und Uhrzeit
Datum und Uhrzeit in E-Mails richten sich nach dem Datumsformat, Zeitformat, der Zeitzone und der Sprache deiner Website (**Einstellungen > Allgemein** in WordPress), und die Standard-Reservierungs-E-Mails geben das Datum zusammen mit der Uhrzeit daneben aus. Die Erinnerungs-E-Mail listet sowohl die Abholung als auch die Rückgabe auf, und die Stornierungs-E-Mail gibt ebenfalls die Daten aus.
:::

---

## 🧪 Testen & Vorschau

Überprüfe deine Template-Änderungen immer, bevor du sie live veröffentlichst:
1. **Vorschau:** Verwende den Tab **E-Mail-Vorschau** auf der Seite „Benachrichtigungs-Templates“, um das Design in deinem Browser zu sehen.
2. **Test-E-Mail senden:** Sende eine echte Testnachricht an eine angegebene E-Mail-Adresse, um die Mobilkompatibilität zu prüfen.

---

![Einstellungen > Tab „Benachrichtigungs-Templates“, Template-Editor](/img/docs/screens/settings-email-templates.webp)

*MHM Rentiva > Einstellungen > Tab „Benachrichtigungs-Templates“ – Template-Editor*

---

## Technischer Hinweis: E-Mail-Protokolle

Wenn **Kommunikationsprotokolle aktivieren** eingeschaltet ist, speichert das Plugin gesendete E-Mails unter dem Custom Post Type (CPT) `EmailLog`. Wenn ein Kunde sagt „Ich habe keine E-Mail erhalten“, kannst du anhand dieser Protokolle im WordPress-Adminbereich prüfen, ob die E-Mail versendet wurde.

```php
// Use the Mailer class for programmatic email sending:
Mailer::send($to, $subject, $template_id, $data);
```

---

### Zusammenfassung des Abschnitts
- **Die Nutzung von SMTP** ist entscheidend für eine erfolgreiche Zustellung.
- Templates lassen sich mit **dynamischen Tags** personalisieren.
- Alle Sendungen können im E-Mail-Protokoll nachverfolgt werden.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 | Platzhalterliste entspricht jetzt dem Plugin (`{salutation_name}`, Zeit- und Datum-Zeit-Tags hinzugefügt; `{vehicle_name}` und `{site_title}` entfernt: Sie werden nicht unterstützt); Datum und Uhrzeit folgen dem Format der Website; Namen der Einstellungen korrigiert. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 18.03.2026 | 4.21.2 | Inhalt auf das Hybridmodell aktualisiert; SMTP-Hinweise hinzugefügt. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
