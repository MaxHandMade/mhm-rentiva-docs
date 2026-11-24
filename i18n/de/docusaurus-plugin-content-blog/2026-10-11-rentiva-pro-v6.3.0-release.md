---
slug: rentiva-pro-v6.3.0-release
title: "Rentiva Pro 6.3.0 – IBANs und Dokumente der Anbieter verschlüsselt gespeichert, Nachrichten als Unterhaltungen neu aufgebaut und alle Anbieter-Einstellungen an einem Ort"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, security, messages, admin]
date: 2026-10-11T06:30
---

6.3.0 schützt, was Anbieter übermitteln: IBANs, Ausweisdokumente und Fahrzeugdokumente werden verschlüsselt und von der Mediathek ferngehalten. Nachrichten werden als Unterhaltungen neu aufgebaut, und die Anbieterverwaltung erhält eine Detailseite für Anbieter sowie einen zentralen Ort für alle Anbieter-Einstellungen. **Aktualisiere zuerst MHM Rentiva (Lite) auf 6.2.0, danach Pro.** Rentiva Pro 6.1.0 oder älter bricht neben Rentiva 6.2.0 im Anbieter-Panel mit einem Fehler ab, führe die beiden Updates also direkt nacheinander durch.

<!--truncate-->

## IBANs und Dokumente der Anbieter werden verschlüsselt gespeichert

- **IBANs und Ausweisdokumente** (Ausweis, Führerschein, Adressnachweis) werden verschlüsselt und außerhalb der Mediathek gespeichert. Dokumente werden nur als JPG, PNG oder PDF akzeptiert und auf Typ und Größe geprüft. Administratoren zeigen eine IBAN über „Anzeigen / Kopieren / Ausblenden“ an und öffnen Dokumente über Routen, die protokollieren, wer sie angesehen hat; Auszahlungsabrechnungen zeigen eine maskierte IBAN.
- **Fahrzeugschein und Versicherungsdokumente** verlassen ebenfalls die öffentliche Mediathek. Der Bearbeitungsbildschirm des Fahrzeugs enthält eine Box „Fahrzeugdokumente“ mit protokolliertem Betrachter, und der Administrator erhält eine E-Mail, wenn ein Anbieter ein Dokument erneuert.
- **Beim Update werden vorhandene IBANs und Dokumente umgewandelt, und die alten Dokument-Anhänge werden aus der Mediathek gelöscht, sobald sie** in den verschlüsselten Speicher **kopiert wurden**. Galerie- oder Titelbild-Einträge, die auf eine solche Datei verwiesen, werden entfernt.

**Empfohlen:** Ohne weitere Einrichtung stammen die Verschlüsselungsschlüssel aus den WordPress-Schlüsseln in `wp-config.php`, sodass eine Änderung dieser Schlüssel gespeicherte IBANs und Dokumente unlesbar macht. Definiere `MHM_RENTIVA_SENSITIVE_KEY` in `wp-config.php`, um den Daten einen eigenen Schlüssel zu geben – ein Admin-Hinweis empfiehlt dies, erklärt, wo die Zeile hingehört, und gibt eine fertige `define()`-Zeile mit einem neuen Schlüssel aus.

:::caution Bekannte Einschränkung
Ein Anbieter, dessen IBAN nach dem Update nicht gelesen werden konnte – zum Beispiel, weil die WordPress-Schlüssel in `wp-config.php` nach der Freigabe des Anbieters geändert wurden –, **kann keine Auszahlung anfordern, bis die IBAN erneut eingegeben wird, und 6.3.0 hat kein Formular, um sie einzugeben.** Der Admin-Hinweis nennt und verlinkt jeden betroffenen Anbieter.
:::

## Nachrichten, als Unterhaltungen neu aufgebaut

Eine Unterhaltung besteht aus einer ersten Nachricht und ihren Antworten. Es gibt einen neuen Admin-Posteingang und eine Verlaufsansicht – Priorität, letzte Aktivität, Kunde, Status und zugehörige Buchung – mit seitlichen Karten, die sich einklappen lassen und ihren Zustand speichern. Kunden sehen nur ihre eigenen Unterhaltungen, als reinen Text. Die E-Mail-Regeln sind eindeutig: eine Status-E-Mail nur bei einer einzelnen Änderung durch einen Administrator, genau eine E-Mail pro Antwort eines Administrators, keine bei Massenaktionen oder beim Update und eine automatische Antwort nur bei einer neuen Unterhaltung. Nachrichten haben eigene Berechtigungen. Vorhandene Nachrichten werden einmalig beim Update umgewandelt, ohne dass E-Mails versendet werden. E-Mail-Benachrichtigungen für Nachrichten lassen sich jetzt tatsächlich abschalten.

## Anbieterverwaltung

- **Eine Detailseite für Anbieter:** Kennzahlen, Kontakt (Stadt bearbeitbar), Zahlung und Steuern mit protokollierter IBAN-Anzeige, die genehmigte Bewerbung und ihre Dokumente, Zuverlässigkeit und Abzeichen, die effektive Provision und ihre Herkunft, Buchungen und Bewertungen zu den Fahrzeugen des Anbieters sowie Sperren / Reaktivieren.
- **Die Anbieterverwaltung öffnet sich mit „Aktive Anbieter“**, mit E-Mail, Stadt, Fahrzeuganzahl, effektiver Provision und Bewertung pro Anbieter, einer Zählerleiste und einer Karte „Umsatz nach Stadt“. Die Aktionen Genehmigen, Ablehnen, IBAN und Sperren werden innerhalb der Seite bestätigt statt in einem Browser-Pop-up. Eine Bewerbung wird abgelehnt, wenn ihre drei Dokumente nicht angehängt sind.
- **Alle Anbieter-Einstellungen wandern nach Plugin-Einstellungen > Anbieter-Marktplatz**, und die Anbieterverwaltung verliert ihren Tab „Einstellungen“. Ein neuer Schalter „Neue Anbieter-Bewerbungen annehmen“ ist standardmäßig aktiviert. Die Einstellungen für Listungsgebühren werden jetzt tatsächlich gespeichert. Die acht verstreuten Anbieter-Optionen werden beim Update dorthin verschoben.
- Im Rentiva-Bildschirm **Kunden** tragen Anbieter das Abzeichen „Anbieter“ oder „Gesperrter Anbieter“, und der Bildschirm **Buchungen** erhält einen Anbieter-Filter und eine Anbieter-Spalte.

## Fehlerbehebungen

- **Eine Neuinstallation ohne gespeicherten Provisionssatz legt WooCommerce-Zahlungen, -Abschlüsse und -Erstattungen nicht mehr lahm.** Die Provision wird mit einer Bestellnotiz zurückgehalten und mit dem später gespeicherten Satz erfasst; ein Admin-Hinweis zeigt, wie viele zurückgehalten werden.
- Eine einzelne ausstehende Anbieter-Bewerbung leert nicht mehr das Dashboard aller anderen angemeldeten Kunden.
- Anbieter-E-Mails (13 Vorlagen und die Auszahlungsabrechnung) verlinken auf den passenden Bereich des Anbieter-Panels, statt Anbieter zurück zu „Mein Konto“ zu schicken.
- Kunden-, Fahrzeug- und Umsatzberichte zählen nur abgeschlossene und bestätigte Buchungen, und gleichzeitige Änderungen des globalen Satzes überschreiben sich nicht mehr gegenseitig.
- Alle sechs Pro-Elementor-Widgets wenden die in ihnen gespeicherten Einstellungen an, und Einstellungen, die gespeichert, aber ignoriert wurden, greifen jetzt – zum Beispiel das Layout „Vertikal“ der Transfer-Suche und der Filter nach Herkunftstyp bei „Beliebte Routen“, der jetzt deine gespeicherten Standorttypen auflistet. Einstellungen, die nie eine Wirkung hatten, wurden aus dem Nachrichten-Block, den Transfer-Ergebnissen, der Transfer-Suche und „Beliebte Routen“ entfernt.

## Für Entwickler

Entfernt: die Action `mhmrentiva_message_read`, der Filter `mhmrentiva_account_vendor_panel`, die alten Handler des Nachrichtenformulars und Methoden wie `Message::mark_as_read()`, `VendorApplicationManager::encrypt_iban()` / `decrypt_iban()` sowie die REST-Routen `GET/POST /vendors/settings`. `mhmrentiva_message_status_changed` übergibt jetzt die ID der ersten Nachricht der Unterhaltung und `array( 'actor' => … )`. **Gespeicherte IBANs ändern ihr Format:** Code, der die IBAN-Meta direkt ausliest, funktioniert nicht mehr. Fünf Datenbankschritte laufen einmalig beim Update.

---

**Bezugsquelle.** Pro 6.3.0 ist auf GitHub als `v6.3.0` veröffentlicht und wird über den Rentiva-Pro-Download auf wpalemi.com bereitgestellt. Aktualisiere zuerst [Rentiva auf 6.2.0](/blog/rentiva-v6.2.0-release). Das vollständige Changelog wird mit dem Plugin in beiden Sprachen ausgeliefert.
