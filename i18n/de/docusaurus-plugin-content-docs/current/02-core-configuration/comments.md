---
id: comments
title: "Bewertungen & Sternebewertungen (Einstellungen)"
sidebar_label: "Bewertungen"
sidebar_position: 7
slug: /core-configuration/comments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Der Tab „Bewertungen“ ist die zentrale Stelle für die Verwaltung von Kundenfeedback, Sternebewertungen und Spamschutz nach einer Fahrzeugmiete. Du erreichst ihn über **MHM Rentiva > Einstellungen > Bewertungen**.

---

## ⚙️ Allgemeine Konfiguration

Hier legst du die grundlegenden Regeln für das Bewertungssystem fest:

- **Bewertungen automatisch freigeben:** Wenn aktiviert, werden Bewertungen sofort veröffentlicht, ohne die Moderation durch den Administrator zu durchlaufen.
- **Anmeldung erforderlich:** Beschränkt das Abgeben von Bewertungen auf angemeldete Benutzer.
- **Gastbewertungen erlauben:** Erlaubt nicht registrierten Benutzern, eine Bewertung mit ihrem Namen und ihrer E-Mail-Adresse abzugeben.

---

## 🎨 Anzeigeeinstellungen

Einstellungen für die Anzeige im Frontend:

- **Bewertungen pro Seite:** Wie viele Bewertungen auf einer Seite aufgelistet werden (z. B. 10).
- **Sternebewertungen anzeigen:** Aktiviert oder deaktiviert das Sternebewertungssystem.
- **Avatare anzeigen:** Zeigt die Profilbilder der Benutzer (Gravatar) an.
- **Bearbeiten und Löschen:** Erlaubt Benutzern, ihre eigenen Bewertungen innerhalb eines festgelegten Zeitraums (Minuten) zu bearbeiten oder zu löschen.

---

## 🛡️ Spam & Sicherheit

Schützt das System vor schädlichen Inhalten und Bots:

- **Spamschutz:** Aktiviert das intelligente Filtersystem.
- **Ratenbegrenzung aktivieren:** Verhindert, dass ein einzelner Benutzer in kurzer Zeit zu viele Bewertungen abgibt (z. B. ein Limit von 1 Bewertung pro Minute).
- **Blockierte Wörter:** Eine Sperrliste von Wörtern, die Inhalte automatisch blockieren, wenn sie in einer Bewertung vorkommen. Füge die Einträge durch Kommas getrennt hinzu (z. B. spam, casino, viagra).

---

### 🖼️ BILD: EINSTELLUNGSBEREICH FÜR BEWERTUNGEN
*(Tab „Einstellungen > Bewertungen“, als Akkordeon aufgebaute Einstellungsgruppen)*

---

## ⚡ Cache & Performance

Wird verwendet, um die Datenbanklast auf Websites mit hohem Besucheraufkommen zu verringern:

- **Bewertungs-Cache aktivieren:** Speichert Bewertungslisten im Zwischenspeicher.
- **Cache-Dauer (Minuten):** Wie lange die Listen aktuell bleiben (z. B. 5 Min.).

---

### Zusammenfassung des Abschnitts
- Nutze den **Freigabeprozess**, um die Qualität der Inhalte zu überwachen.
- Nutze die **Spamfilter**, um den Feedbackbereich sauber zu halten.
- Nutze das **Sternebewertungssystem**, um anderen Kunden sozialen Beweis zu liefern.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Dokumentation zu Bewertungen (Einstellungen) auf Basis eines Screenshots des Einstellungsbereichs und einer Codeanalyse erstellt. |
