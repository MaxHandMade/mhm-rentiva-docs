---
id: go-live-checklist
title: "Go-Live-Checkliste (Release-Protokoll)"
sidebar_label: "Go-Live-Checkliste"
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::important Kritische Warnung
Alle Punkte müssen „Grün“ (bestanden) sein, bevor du live gehst. Insbesondere die Korrektheit der Finanzschlüssel verhindert nicht behebbare Datenfehler.
:::

# 🚀 Go-Live-Checkliste

Dieses Protokoll soll die Systemkontinuität und Datensicherheit bei Versionswechseln von Rentiva gewährleisten.

---

## 🏗️ 1. Infrastruktur- und Lizenzprüfungen

- [ ] **Aktivierung des Pro-Modus:** Wurde der Lizenzschlüssel auf dem Live-Server für `Mode::featureEnabled()`-Prüfungen validiert?
- [ ] **SQL-Migrationen:** Wurden die erforderlichen `up()`-Skripte für die `{$wpdb->prefix}mhmrentiva_*`-Tabellen fehlerfrei ausgeführt?
- [ ] **SSL-Erzwingung:** Wurde bestätigt, dass Auszahlungs- und Webhook-Datenverkehr ausschließlich über HTTPS läuft?
- [ ] **SMTP / Mailer:** Wurde eine Test-E-Mail erfolgreich über `Mailer::send()` zugestellt?

---

## 💰 2. Finanzielle Sicherheitseinstellungen

- [ ] **HMAC-Secrets:** Wurden die eigens für die Produktivumgebung vorgesehenen API-Secret- und Key-Sätze korrekt eingetragen?
- [ ] **Webhook-Idempotenz:** Wurde überprüft, dass wiederholte Callbacks keine doppelten Einträge in `Ledger` erzeugen (bei deaktiviertem Testmodus)?
- [ ] **Währungscodes:** Wurde bestätigt, dass die aktuellen WooCommerce-Währungseinstellungen mit Rentiva `CurrencyHelper` kompatibel sind?
- [ ] **Governance Freeze:** Wurden kritische Finanzberechtigungen (Massenfreigabe) ausschließlich autorisierten `Checker`-Rollen zugewiesen?

---

## ⚡ 3. Anwendung und Performance

- [ ] **Asset-Minifizierung:** Wurden CSS- und JS-Dateien für die Produktivumgebung minifiziert?
- [ ] **Cache leeren:** Wurden Transients und Objekt-Caches aus der vorherigen Version über `CacheManager` geleert?
- [ ] **Shortcode-Prüfung:** Werden die `[rentiva_...]`-Shortcodes auf kritischen Buchungsseiten korrekt dargestellt?
- [ ] **Cron-Zustand:** Sind die über `wp-cron` ausgelösten Finanzberichts-Jobs aktiv?

---

## 🚨 4. Notfallbereitschaft (Rollback)

- [ ] **DB-Backup:** Wurde die Zugänglichkeit einer aktuellen Datenbanksicherung überprüft?
- [ ] **Versions-Rollback:** Steht ein `git`-Tag oder ein Paket-Backup bereit, um im Fehlerfall zur vorherigen stabilen Version zurückzukehren?
- [ ] **Kommunikation:** Wurden alle Beteiligten (Anbieter, Operations-Team) über das Release-Zeitfenster informiert?

## Zusammenfassung des Abschnitts
- Das Go-Live-Protokoll ist ein fester Bestandteil des Versions-Release-Prozesses.
- Eine einzige Lücke bei den Finanzpunkten versetzt das Release in den Status „Blockiert“.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite um PRO-Aktivierung und Punkte zur finanziellen Sicherheit erweitert. |
