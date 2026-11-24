---
id: system-performance
title: "System- & Performance-Einstellungen"
sidebar_label: "System & Performance"
sidebar_position: 11
slug: /core-configuration/system-performance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Die Geschwindigkeit (Caching) und die Sicherheit (WAF – Web Application Firewall) des Plugins werden zentral an dieser Stelle verwaltet. Konfiguriere alle Schutz- und Geschwindigkeitsoptimierungen im Tab **MHM Rentiva > Einstellungen > System & Performance**.

---

## ⚡ System & Performance (Caching)

MHM Rentiva nutzt eine fortschrittliche Objekt-Caching-Schicht, um die Datenbanklast zu verringern.

- **Objekt-Cache aktivieren:** Wenn aktiv, werden Datenbankabfragen im Arbeitsspeicher abgelegt, was die Ladegeschwindigkeit der Seiten deutlich erhöht.
- **Cache-TTL-Dauern:**
    - **Standard:** Speicherdauer für allgemeine Daten (Stunden).
    - **Listen:** Cache-Dauer für Fahrzeug- und Buchungslisten (Minuten).
    - **Berichte & Diagramme:** Wie häufig Statistiken aktualisiert werden (Minuten).
- **Meta-Query-Limit:** Maximale Anzahl an Meta-Abfragen pro Anfrage. Ein niedriger Wert hält das System schlanker.

---

### 🖼️ BILD: SYSTEM- & PERFORMANCE-EINSTELLUNGEN
*(Einstellungen > Tab „System & Performance“, Cache- und TTL-Einstellungen)*

---

## 🛡️ IP-Kontrolle & Firewall

Wende IP- und länderbasierte Beschränkungen an, um böswillige Benutzer und Spam-Bots von deinem System fernzuhalten.

- **Whitelist:** Füge hier die IP-Adressen deines Büros oder deines Management-Teams hinzu, damit sie niemals blockiert werden.
- **Blacklist:** Blockiere bekannte bösartige IPs dauerhaft.
- **Länderbeschränkung:** Füge nur die Länder, die du bedienst (z. B. TR, DE), zur Liste der erlaubten Länder hinzu und blockiere den Rest der Welt mit einem einzigen Klick.

---

## 🔓 Erweiterte Sicherheitsregeln

Integrierte Schutzregeln gegen die häufigsten Angriffsarten, denen das System ausgesetzt sein kann:

- **Brute-Force-Schutz:** Sperrt Konten vorübergehend bei wiederholten falschen Passworteingaben.
- **Schutz vor SQL-Injection & XSS:** Bereinigt Daten aus Formularen, um die Sicherheit der Datenbank zu gewährleisten.
- **CSRF-Schutz:** Blockiert gefälschte Anfragen und Formularmanipulationen.

---

### 🖼️ BILD: SICHERHEITS- & FIREWALL-BEREICH
*(Tab „Einstellungen“ – Oberfläche für IP-Beschränkungen und Sicherheitsregeln)*

---

## 🚥 Traffic-Limits & Anfragekontrolle (Ratenbegrenzung)

Lege Limits pro IP und Minute fest, um den Missbrauch von Systemressourcen zu verhindern.

| Limit-Typ | Beschreibung |
| :--- | :--- |
| **Globales Anfragelimit** | Gesamtlimit an Aufrufen, die ein Benutzer an Plugin-Funktionen senden kann. |
| **Buchungsanfrage** | Wie viele neue Buchungsversuche dürfen pro Minute von einer IP aus unternommen werden? |
| **Zahlungsanfrage** | Begrenzt Versuche über das Zahlungs-Gateway, um betrügerische Transaktionen zu verhindern. |

---

## 🩺 Systemwartung & Status

Sieh dir die wichtigsten Informationen deines Servers in Echtzeit im Bereich **„Systemstatus“** unten auf der Seite an:
- PHP-/WordPress-Versionen
- Servertyp (Apache, Nginx usw.)
- **SQL-Modus:** Prüft, ob du für optimale Performance im Modus `High Performance` arbeitest.

### Zusammenfassung des Abschnitts
- **Objekt-Cache** erhöht die Geschwindigkeit und verringert die Datenbanklast.
- **Ratenbegrenzung** stoppt Bot-Angriffe und Brute-Force-Versuche.
- **WAF-Regeln** bieten einen Sicherheitsschutz auf Softwareebene.

### Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Leitfaden zu System, Performance und Sicherheit (WAF) erstellt. |
