---
id: performance-cache
title: "Performance- & Cache-Verwaltung"
sidebar_label: "Performance & Cache"
sidebar_position: 40
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Erklärt die Caching-Architektur, mit der Rentiva auf stark frequentierten Fahrzeugvermietungs-Websites effizient arbeitet, und wie du häufige Performance-Probleme behebst.
:::

# ⚡ Performance- & Cache-Verwaltung

Das System optimiert auf drei Hauptebenen: Object Cache, Transients und Seiten-Cache.

---

## 🛠️ 1. Caching-Ebenen

### WordPress-Transients (Datenbankebene)
- **Verwendung:** Preisberechnungen, komplexe Abfragen für Fahrzeuglisten und Anbieter-Analysen.
- **TTL (Lebensdauer):** In der Regel 15 Minuten (`900 seconds`) für kritische Daten.
- **Wichtig:** Wenn sich Transients in der Datenbank ansammeln, ohne gelöscht zu werden, können sie die gesamte Website verlangsamen. Verwende `mhmrentiva_flush_cache` für die manuelle Bereinigung.

### Object Cache (Speicherebene)
- **Verwendung:** Wenn Redis oder Memcached aktiv ist, ruft das System alle Objektdaten aus dem Arbeitsspeicher ab.
- **Vorteil:** Reduziert die Anzahl der SQL-Abfragen um bis zu 80 %.
- **Achtung:** Wenn du Dateninkonsistenzen feststellst, deaktiviere Redis vorübergehend und teste das Problem erneut.

---

## 🐢 2. Häufige Performance-Probleme

### Langsame Ergebnisse bei der Fahrzeugsuche
- **Grund:** Suche über zu viele `WP_Query`-Meta-Schlüssel.
- **Lösung:** Aktiviere die Rentiva-Funktion „Meta Optimizer“. Erwäge, häufig verwendete Metadaten (Marke, Modell, Baujahr usw.) in einer separaten Tabelle oder einer optimierten Indexstruktur zu speichern.

### Langsame Verwaltungsseiten im Admin-Bereich
- **Grund:** Eine große Menge an Buchungsdaten (10.000+) wird gleichzeitig aufgelistet.
- **Lösung:** Reduziere die Anzahl der Einträge pro Seite (Standard: 20). Deaktiviere unnötige Spalten über das Menü „Ansicht anpassen“.

---

## 🕒 3. Probleme mit veralteten Daten

### Ich habe eine Einstellung geändert, aber sie wird im Frontend nicht angezeigt?
- **Mögliche Gründe:**
    1. **Seiten-Cache:** Der Seiten-Cache von Plugins wie WP Rocket oder LiteSpeed ist veraltet.
    2. **Fragment-Cache:** Bereiche wie die Preistabelle oder die FAQ können eigene, unabhängige Caches haben.
- **Lösung:** Klicke unter Rentiva > Schnellaktionen > Cache zurücksetzen auf die Schaltfläche zum Zurücksetzen des Caches.

---

### Nach dem Update von Rentiva (6.4.0)
Leere nach dem Update einmal deinen Seiten-Cache (den Cache deines Hosters, LiteSpeed Cache, WP Rocket usw.). Eine unter 6.3.x zwischengespeicherte Seite enthält weiterhin das alte Markup von Buchungsformular und Kalender, und die neuen Skripte können darauf nicht ausgeführt werden. Der eigene kurzlebige Cache von Rentiva aktualisiert sich von selbst. Dasselbe gilt, nachdem du die Akzentfarbe des Frontends unter **Einstellungen > Frontend & Darstellung > Farben** geändert hast.

---

## 📈 4. Überwachung & Messung

Überwache Folgendes, um die Performance deiner Website zu verfolgen:
- **TTFB (Time to First Byte):** Servergeschwindigkeit und PHP-Ausführungszeit.
- **Anzahl der Abfragen (SQL-Abfragen):** Verwende das Plugin „Query Monitor“, um den Anteil der Rentiva-Abfragen an der Gesamtzahl zu sehen.
- **Cron-Jobs:** Prüfe, ob Finanzaktualisierungen oder Bereinigungsaufgaben planmäßig ausgeführt werden.

## Checkliste
1. Prüfe den Status von Redis/Memcached.
2. Überprüfe die Ausnahmen des Seiten-Caches (die Checkout-Seite muss ausgeschlossen sein).
3. Optimiere unnötige Meta-Abfragen.
4. Führe regelmäßig eine „Datenbankbereinigung“ durch.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | 6.4.0 | Hinweis zum Seiten-Cache bei Updates und Farbänderungen. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Szenarien zu Object Cache, Transients und veralteten Daten hinzugefügt. |
