---
id: reports
title: "Berichte"
sidebar_position: 11
slug: /features-usage/reports
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite beschreibt eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen — Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info React SPA (seit v4.37.x)
Die Seite „Berichte“ wurde in v4.37.x (Faz 1b) auf eine **React SPA mit Chart.js** migriert. Die gesamte Diagrammdarstellung und der Datenabruf erfolgen clientseitig über die REST API. 9 veraltete PHP/JS-Berichtsdateien wurden gelöscht. Der Datumsfilter und die 5 Tab-Komponenten sind React-Komponenten.
:::

„Berichte“ ist die zentrale Stelle für erweiterte Analysen, die alle betrieblichen Daten von MHM Rentiva in finanzielle und statistische Auswertungen umwandelt. Verfolge die Wachstumstrends und die Effizienz deines Unternehmens unter **MHM Rentiva > Berichte**.

:::caution Unterschied Lite / Pro
Der Bildschirm **Berichte** ist in Rentiva Pro enthalten und öffnet sich, wenn deine Lizenz die Funktion für erweiterte Berichte umfasst (Gate: `Edition::canUseAdvancedReports()`). Lite hat keinen Bildschirm „Berichte“; das Lite-Dashboard verfügt über eigene Statistikkarten, ein Umsatzdiagramm und anstehende Vorgänge.
:::

---

## Globale Leistungskennzahlen (Statistik-Widget)

Oben auf der Seite werden vier zentrale Leistungsindikatoren, die entsprechend dem ausgewählten Zeitraum aktualisiert werden, in einem mit Symbolen und Farben angereicherten **2x2-Raster** angezeigt:

- **Buchungen gesamt:** Alle Vorgänge innerhalb des festgelegten Zeitraums.
- **Umsatz dieses Monats:** Gesamtumsatz des aktuellen Monats (mit Währungssymbol).
- **Aktive Buchungen:** Anzahl der Fahrzeuge, die derzeit genutzt werden (beim Kunden).
- **Auslastungsquote (%):** Der prozentuale Kapazitätsauslastungsgrad deiner Flotte.

:::info Technischer Hinweis
Das Statistik-Widget wird mit dem Cache-Schlüssel-Präfix `mhmrentiva_dashboard_stats` zwischengespeichert. Alle Datumsberechnungen verwenden die WordPress-Zeitzone (`wp_date`).
:::

---

## Berichts-Tabs und Details

Mit MHM Rentiva kannst du Daten aus 5 verschiedenen Perspektiven auswerten:

### 1. Übersicht
Eine „Momentaufnahme“ aller Berichte. Stellt Umsatz-, Buchungs-, Kunden- und Fahrzeuganalysen in vergleichenden Diagrammen auf einem einzigen Bildschirm dar.

### 2. Umsatzbericht — nur Pro
Zeigt detailliert deine finanzielle Lage.
- **Umsatzanalyse:** Durchschnittlicher Tagesumsatz und Gesamteinnahmen.
- **Umsatztrend:** Balkendiagramme, die zeigen, welche Wochentage (Mo–So) profitabler sind. Das Datumsformat wird mit `date_i18n(get_option('date_format'))` lokalisiert.
- **Stornierungsdatensatz:** Stornierte Buchungen werden im Diagramm als separater Datensatz mit einer rot gestrichelten Linie dargestellt.
- **Tagesdetails:** Eine transparente Umsatzliste, Datum für Datum.

### 3. Buchungsverteilung
Analysiert die Statusverteilung der Buchungen und die Stornierungsquoten.
- **Stornierungsquote (%):** Der prozentuale Anteil stornierter Buchungen an allen Buchungen.
- **Statusverteilung:** Eine Aufschlüsselung der bestätigten, ausstehenden, abgeschlossenen und stornierten Buchungen nach Anzahl und Prozentsatz.

### 4. Fahrzeugbericht (Fahrzeugleistung)
Misst, welche Fahrzeuge oder Kategorien mehr Umsatz erzielen.
- **Beliebteste Fahrzeuge:** Modelle mit der höchsten Anzahl an Vermietungen.
- **Anzahl der Vermietungen vs. Gesamtumsatz:** Gesamtumsatz, den jedes Fahrzeug erzielt hat.

### 5. Kundenbericht (Kundenanalyse)
Verfolgt Kundentreue und Ausgabeverhalten.
- **Kundenübersicht:** Gesamtzahl der Kunden, wiederkehrende Kunden und durchschnittlicher Ausgabebetrag.
- **Lebenszyklus (LTV):** Stellt das Verhältnis von neuen zu wiederkehrenden Kunden in einem Diagramm dar.

---

## Datenfilterung und Export

- **Benutzerdefinierter Zeitraum:** Wähle Start- und Enddatum aus, um rückblickende oder vorausschauende Analysen durchzuführen.
- **Dynamische Aktualisierung:** Kalender und Diagramme werden sofort neu berechnet, sobald ein Filter angewendet wird.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>BILD: BERICHTS- UND ANALYSE-PANELS</strong><br/>
  <em>mhm-rentiva-reports-all-tabs</em>
</div>

---

### Zusammenfassung des Abschnitts
- Durchleuchte dein Unternehmen mit der **Übersicht**.
- Ermittle die profitabelsten Segmente mit den **Umsatz-/Fahrzeugberichten**.
- Entwickle Strategien zur Kundenbindung mit den **Kundenberichten**.

## React-Komponenten (v4.37.x+)

| Komponente | Zweck |
| :--- | :--- |
| `ReportsPage` | Root — Kopfzeilen-Statistiken + Tab-Navigation + Zeitraumfilter |
| `BookingsTab` | Diagramm zur Buchungsverteilung + Statustabelle |
| `RevenueTab` | Umsatz-Balkendiagramm (Chart.js) + tägliche Detailliste |
| `VehiclesTab` | KPI zur Fahrzeugleistung + Tabelle der Top-Fahrzeuge |
| `CustomersTab` | Diagramm zum Kundenlebenszyklus + zusammenfassende Kennzahlen |

**Datumsfilter:** Wird auf Mobilgeräten (≤782px) vertikal gestapelt — Klasse `.mhm-reports__date-filter`.

**REST-Namespace:** `GET /wp-json/mhm-rentiva/v1/reports/*`

---

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 09.11.2026 | 6.3.1 | Korrektur: Der Lite-/Pro-Hinweis gibt jetzt den tatsächlichen Stand wieder: Der Bildschirm „Berichte“ ist ein Pro-Modul; das Umsatzdiagramm und die anstehenden Vorgänge des Dashboards sind in Lite enthalten. |
| 12.05.2026 | 4.49.0 | Mobile Korrektur: Datumsfilter vertikal gestapelt (Breakpoint 782px). |
| 11.05.2026 | 4.48.0 | Statistik-Raster mit 2-spaltigem Mobil-Layout. |
| 06.05.2026 | 4.37.x | Vollständige Migration auf React SPA mit Chart.js. 9 veraltete PHP/JS-Dateien entfernt. ReportsRestController + 5 Tab-Komponenten. |
| 23.04.2026 | 4.27.2 | Dokumentation mit der aktuellen Plugin-Version synchronisiert. |
| 27.03.2026 | 4.23.0 | Lite/Pro-Gating (Umsatzdiagramm + anstehende Vorgänge), 2x2-Raster-Design des Statistik-Widgets, Zeitzonen-Korrekturen (`wp_date`), Stornierungsdatensatz und Korrektur des Cache-Schlüssel-Präfixes dokumentiert. |
| 19.03.2026 | 4.21.2 | Seite „Berichte“ anhand der tatsächlichen Oberfläche mit 5 Tabs und allen Diagrammdetails aktualisiert. |
| 26.02.2026 | 4.21.0 | Erste Version erstellt. |
