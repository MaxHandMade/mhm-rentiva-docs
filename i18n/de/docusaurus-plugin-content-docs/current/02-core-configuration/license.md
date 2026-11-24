---
id: license-management
title: "Lizenzverwaltung"
sidebar_label: "Lizenzverwaltung"
sidebar_position: 8
slug: /core-configuration/license
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva (Lite) ist kostenlos und benötigt keinen Lizenzschlüssel. **Rentiva Pro** ist ein separates Erweiterungs-Plugin, und seine Funktionen (VIP-Transfer, Messaging, erweiterte Berichte, der Anbieter-Marktplatz und mehr) benötigen einen gültigen Lizenzschlüssel. Wenn Pro installiert ist, verwaltest du deinen Schlüssel über das Menü **MHM Rentiva > Lizenz**.

---

## 💻 Lokale und Staging-Umgebungen

**In jeder Umgebung ist ein gültiger Lizenzschlüssel erforderlich**, auch auf lokalen und Staging-Websites.

Frühere Versionen haben Pro auf Hosts, die auf `.dev`, `.local`, `.test`, `.staging` oder `.localhost` enden, automatisch freigeschaltet („Entwicklermodus“). Das wurde in **5.0.0** entfernt: `.dev` ist eine echte, öffentlich registrierbare Domain, sodass bei einer Live-Website versehentlich kostenpflichtige Funktionen freigeschaltet sein könnten. Eine Funktion wird jetzt nur noch durch ein signiertes Lizenz-Token freigegeben, das erfolgreich verifiziert wird – es gibt keine Konstante, Option oder keinen Filter, die eine Funktion ohne dieses Token freischalten.

Um an einer lokalen oder Staging-Kopie zu arbeiten, aktiviere deine Lizenz dort wie auf jeder anderen Website. Wenn du den Schlüssel gleichzeitig auf mehr als einer Website brauchst, deaktiviere ihn zuerst auf der Website, mit der du fertig bist (siehe unten).

---

## 🟢 Lizenzstatus & Aktivierung

Der Admin-Bereich der Seite ist in drei Hauptblöcke unterteilt:

1. **Lizenzstatus:**
   Zeigt die Gültigkeit der aktuellen Lizenz. Wenn die Lizenz aktiv ist, zeigt die Seite **„✅ Pro-Lizenz aktiv“** und darunter eine Zeile mit den Pro-Funktionen, die deine Lizenz tatsächlich freigibt, zum Beispiel *„Aktive Pro-Funktionen: Anbieter & Auszahlung, Erweiterte Berichte, Nachrichten, Erweiterter Export“*. Ohne aktive Lizenz wird **„⚠️ Lite-Version aktiv“** angezeigt und du wirst nach deinem Schlüssel gefragt.

2. **Lizenzaktivierung:**
   Füge den gekauften Lizenzschlüssel in das Feld im Format `XXXX-XXXX-XXXX-XXXX` ein und klicke auf die Schaltfläche **„Lizenz aktivieren“**. Die API prüft ihn sofort.

3. **Lizenzverwaltung (Freigabe):**
   Wenn du das Plugin auf eine andere Website (Domain) umziehen oder eine echte Lizenz zum Testen oder wegen einer Kündigung deaktivieren möchtest, verwende die Schaltfläche **„Lizenz deaktivieren“** ganz unten. Andernfalls erhältst du auf der neuen Domain möglicherweise einen Aktivierungsfehler (zu viele Aktivierungen).

---

## 💎 Was Lite enthält und was Pro hinzufügt

Lite hat **keine Obergrenzen für Fahrzeuge, Buchungen, Kunden oder Zusatzleistungen, keine zeitlich begrenzten Funktionen und keine gesperrten Bildschirme**. Pro hebt keine Grenze in Lite auf, sondern fügt eigene Module hinzu. Jedes Pro-Modul wird nur freigeschaltet, wenn deine Lizenz es enthält.

| Bereich | In Lite enthalten | Mit Pro zusätzlich |
| :--- | :--- | :--- |
| **Fahrzeuge, Buchungen, Kunden, Zusatzleistungen** | So viele du brauchst, ohne Obergrenzen | Nichts zusätzlich (es gibt keine Grenze, die aufgehoben werden müsste) |
| **Fahrzeuggalerie** | Bis zu der in den Einstellungen festgelegten Anzahl Bilder (standardmäßig 50 pro Fahrzeug) | Nichts zusätzlich |
| **Dashboard** | Statistikkarten, Umsatzdiagramm, neueste Buchungen, anstehende Vorgänge, Status- und Zahlungsübersichten | Nichts zusätzlich |
| **Berichte** | Nur Dashboard-Kennzahlen | Der Bildschirm **Berichte**: Umsatz-, Buchungs- und Kundenberichte |
| **Export** | Kundenliste als CSV | **Erweiterter Export**: Buchungen, Fahrzeuge und Protokolle als CSV oder JSON, mit Filtern |
| **E-Mail** | 14 bearbeitbare Vorlagen (Buchung, Status, Stornierung, Erinnerung, Erstattung, Willkommen, Offline-Beleg, Restzahlung) | Zusätzliche Vorlagen für Pros eigene Module (Anbieter, Inserate, Auszahlungen, Nachrichten) |
| **Messaging** | Kontaktformular und der Bildschirm „Kontaktnachrichten“ | **Nachrichten**: Unterhaltungen zwischen Kunden und Admin, auch unter „Mein Konto“ des Kunden |
| **Anbieter-Marktplatz & Auszahlungen** | — | Anbieter-Bewerbungen, Anbieter-Panel, Provisionen, Auszahlungen und Anbieter-Berichte |
| **VIP-Transfer** | — | Standorte, Routen, Transfer-Suche und -Buchung (wird mit jeder aktiven Pro-Lizenz freigeschaltet) |
| **Datenschutz / DSGVO** | Export und Löschung personenbezogener Daten in den WordPress-Datenschutzwerkzeugen (Buchungen, Kontaktnachrichten, E-Mail-Protokoll, Kontodaten, Anwendungsprotokoll) und der Text für den Leitfaden zur Datenschutzerklärung | Die Einwilligungskarte unter „Mein Konto“ und Datenanfragen, Export und Löschung von Pros Nachrichten, Anbieterdaten und Einwilligungsnachweisen, Bereinigung nach Aufbewahrungsfristen (siehe [Datenschutz und personenbezogene Daten](../03-features-usage/privacy-personal-data.md)) |

---

## ⏰ Verlängerungserinnerung und Verbindungsprobleme (Pro)

- **Verlängerungserinnerung:** In den letzten 14 Tagen vor Ablauf der Lizenz nennt ein Hinweis das **Ablaufdatum** und enthält eine Schaltfläche **Lizenz verwalten**, die die Lizenzseite öffnet. Er erscheint nur auf den Rentiva-Bildschirmen, unter **Plugins** und im WordPress-Dashboard, nicht auf jeder Admin-Seite. **In 3 Tagen erinnern** blendet ihn für dich drei Tage lang aus; die Schaltfläche wird nur angeboten, solange noch mindestens vier Tage verbleiben, und am letzten Tag wird die Erinnerung immer angezeigt.
- **Probleme mit dem Lizenzserver:** Wenn der Lizenzserver nicht erreichbar ist, mit einem vorübergehenden Fehler (HTTP 5xx) oder einer Ratenbegrenzung (HTTP 429) antwortet oder die Antwort nicht vom Server selbst stammt (zum Beispiel eine Captive-Portal-Seite), schaltet sich Pro nicht ab: Es funktioniert bis zu **sieben Tage** nach der letzten erfolgreichen Lizenzprüfung weiter und zeigt einen Hinweis **Verbindungswarnung**.
- **Länger als sieben Tage:** Wenn die Lizenz nach sieben Tagen immer noch nicht verifiziert werden kann, **pausiert** Pro seine Funktionen und zeigt einen Hinweis mit einer Schaltfläche **Jetzt prüfen**. Die Aktivierung bleibt erhalten: Die Funktionen kehren bei der nächsten erfolgreichen Prüfung von selbst zurück (die geplante Prüfung läuft alle sechs Stunden, und beim Öffnen der Lizenzseite wird sofort geprüft), sodass du nicht erneut aktivieren musst.
- **Eine tatsächliche Ablehnung:** Jede Ablehnung durch den Lizenzserver (zum Beispiel bei einer ungültigen, widerrufenen oder unbekannten Lizenz) deaktiviert Pro weiterhin.

:::info Geändert in Pro 6.5.0
Die Verlängerungserinnerung nennt das Ablaufdatum, verlinkt die Lizenzseite und erscheint nicht mehr auf jeder Admin-Seite.
:::

:::info Geändert in Pro 6.5.1
Wenn die Lizenz länger als sieben Tage nicht verifiziert werden kann, pausiert Pro, statt die Aktivierung der Website zu entfernen, und kehrt bei der nächsten erfolgreichen Prüfung von selbst zurück.
:::

---

### Zusammenfassung des Abschnitts
- Lite funktioniert ohne Lizenz und hat keine Obergrenzen; ein Lizenzschlüssel schaltet nur die Module von Rentiva Pro frei.
- Deine Lizenz wird in einem Schritt über das Menü **MHM Rentiva > Lizenz** aktiviert oder deaktiviert.
- Eine gültige Lizenz ist überall erforderlich, auch auf lokalen und Staging-Websites – seit 5.0.0 gibt es keine Umgebung, die Pro ohne Lizenz freischaltet.
- Gib vor einem Domain-Umzug immer zuerst die alte Lizenz über die Schaltfläche **Deaktivieren** frei.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 19.11.2026 | Pro 6.5.1 | Pausieren nach sieben Tagen ohne verifizierte Lizenz und Wiederherstellung ohne erneute Aktivierung dokumentiert. |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Verlängerungserinnerung, siebentägige Kulanzfrist bei Problemen mit dem Lizenzserver und die Aufteilung von Datenschutz / DSGVO zwischen Lite und Pro dokumentiert. |
| 09.11.2026 | 6.3.1 | Korrektur: Lite hat seit 5.2.0 keine Obergrenzen für Fahrzeuge, Buchungen, Kunden oder Zusatzleistungen. Die alte Tabelle „Lite (Limit) / Pro (Unbegrenzt)“ wurde durch eine Übersicht ersetzt, was Lite enthält und was Pro hinzufügt, abgeglichen mit dem Plugin-Code. „Vollständige REST-API“ und „E-Mail-Benachrichtigungen“ wurden als reine Pro-Punkte entfernt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 27.03.2026 | 4.23.0 | Lite-Limits aktualisiert (Fahrzeuge: 3→5, Kunden: 3→10, Galerie: 3→5). Reine Pro-Funktionen abgetrennt: Anbieter & Auszahlung, DSGVO, E-Mail-Benachrichtigungen. |
| 19.03.2026 | 4.21.2 | Anleitung zur Lizenzverwaltung mit Abbildungen und technischen Hinweisen modernisiert. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
