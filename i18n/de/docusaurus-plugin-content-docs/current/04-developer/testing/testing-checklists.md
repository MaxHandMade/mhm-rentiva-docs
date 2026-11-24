---
id: testing-checklists
title: "Test-Checklisten"
sidebar_label: "Test-Checklisten"
sidebar_position: 3
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Diese Seite enthält die kritischen Checklisten, die abgearbeitet werden müssen, wenn eine neue Funktion entwickelt wird oder bevor ein Release veröffentlicht wird.
:::

# ✅ Test-Checklisten

Über die automatisierten Tests hinaus müssen die folgenden Checklisten manuell oder halbautomatisch durchlaufen werden, um die Integrität des Systems zu wahren.

---

## 🛠️ Entwicklungsprozess (lokale Prüfungen)

Dies ist die letzte Ebene, bevor der Code in die Staging-Umgebung übertragen wird:
- [ ] **Strikte Typisierung:** Enthalten alle neuen PHP-Dateien `declare(strict_types=1);`?
- [ ] **Bereinigung:** Wurden alle `$_POST`- und `$_GET`-Werte bereinigt (sanitized)?
- [ ] **Escaping:** Wurden alle HTML-Ausgaben mit `esc_html` oder `wp_kses` gefiltert?
- [ ] **i18n:** Wurden alle für Benutzer sichtbaren Zeichenketten mit der Textdomain `mhm-rentiva` gekennzeichnet?

---

## 💰 Finanz- und Szenariotests

Bei Änderungen, die die Finanzebene betreffen, müssen die folgenden Szenarien überprüft werden:
- [ ] **Integrität des Hauptbuchs:** Wird der Saldo nach der Transaktion korrekt in `Ledger` abgebildet?
- [ ] **Doppelte Freigabe:** Funktioniert das Vier-Augen-Prinzip (Maker-Checker)? (Blockierung bei Selbstfreigabe).
- [ ] **CSV-Export:** Lässt sich die Zahlungsliste in einem Excel-kompatiblen Format (UTF-8 BOM) exportieren?
- [ ] **Negativablauf:** Werden Fehler wie unzureichender Saldo oder ungültiges Datum abgefangen?

---

## 🚀 Checkliste vor dem Release

Schritte, die vor Minor-/Major-Releases abgeschlossen sein müssen:
- [ ] **Migrationsprüfung:** Sind die SQL-Migrationen (up/down) für neue Tabellen oder Spalten bereit?
- [ ] **Cache leeren:** Wurden alte Transients über `CacheManager` gelöscht?
- [ ] **Shortcode-Prüfung:** Werden alle Frontend-Shortcodes (`[rentiva_...]`) korrekt dargestellt?
- [ ] **Rate Limit:** Ist die Ratenbegrenzung an den API-Endpunkten aktiv?

---

## 📱 UI/UX-Qualitätskontrolle

- [ ] **Responsives Design:** Werden die Elementor-Widgets auf Mobilgeräten und Tablets korrekt angezeigt?
- [ ] **Datumsauswahl:** Funktioniert die Kalenderauswahl in allen Browsern (Chrome, Safari, Firefox)?
- [ ] **Fehler-UI:** Leiten die Fehlermeldungen in Formularen den Benutzer richtig an?

## Zusammenfassung des Abschnitts
- Checklisten gewährleisten die betriebliche Qualität des Systems.
- Das Abarbeiten der Finanzpunkte ist **nicht optional**.
- Jede abgeschlossene Checkliste wird im `Sprint Report` dokumentiert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Seite um Punkte zu technischen Schulden und Finanz-Stresstests aktualisiert. |
