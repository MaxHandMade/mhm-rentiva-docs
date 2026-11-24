---
id: financial-image-backlog
title: "Backlog für Finanzgrafiken (Assets)"
sidebar_label: "Backlog Finanzgrafiken"
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist, sowie eine gültige Lizenz.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Diese Seite verfolgt den aktuellen Status von Diagrammen, technischen Zeichnungen und Medien-Assets, die in der Finanzdokumentation verwendet werden.
:::

# 🖼️ Backlog für Finanzgrafiken

Das Dokumentationssystem verwendet jetzt in einem hybriden Ansatz **dynamische Mermaid-Diagramme** und **statische SVG**-Icons. Die folgende Liste zeigt, welche technische Seite auf welches visuelle Asset angewiesen ist.

## 📊 Inventar der Diagramme und Grafiken

| Code | Dateipfad / Typ | Status | Seitenverweis |
| :--- | :--- | :--- | :--- |
| **FIN-MERMAID-OVERVIEW** | `Mermaid Code` | ✅ Aktuell | Finanzübersicht |
| **FIN-IMG-LEDGER-001** | `ledger-001.svg` | 🔄 Überarbeitung ausstehend | Ledger-Modell |
| **FIN-MERMAID-POLICY** | `Mermaid Code` | ✅ Aktuell | Provision und Richtlinien |
| **FIN-MERMAID-GOV** | `Mermaid Code` | ✅ Aktuell | Governance-Kontrollen |
| **FIN-IMG-ANALYTICS-001** | `analytics-001.svg`| ✅ Aktuell | Analysekennzahlen |
| **FIN-IMG-DB-001** | `db-001.svg` | ⚠️ Fehlt (V4.21) | Datenbankarchitektur |
| **FIN-MERMAID-SIG** | `Mermaid Code` | ✅ Aktuell | Audit-Kryptografie & Integrität |

---

## 🛠️ Visuelle Standards

1. **Verwendung von Mermaid:** Für Architekturabläufe und Sequenzdiagramme sollte immer Mermaid bevorzugt werden. So lassen sich Diagramme bei jeder Aktualisierung der Dokumentation einfach mitaktualisieren.
2. **SVG-Format:** SVG-Dateien unter `/static/img/docs/financial/` werden für feste Schemata und Tabellenbeziehungen verwendet.
3. **Namenskonvention:** Halte dich strikt an das Format `fin-fin-img-{category}-{index}.svg`.

---

## 📅 Geplante Ergänzungen (TODO)

- [ ] **Ablaufkarte der Auszahlung:** Sequenzdiagramm, das den Weg einer Auszahlungsanfrage vom Endnutzer bis zur Bank zeigt.
- [ ] **Visualisierung der Krypto-Hash-Kette:** Technische Illustration, die zeigt, wie die SHA-256-Kette verknüpft ist.
- [ ] **Steuerflussdiagramm:** Verteilungsdiagramm der Steuerpositionen (MwSt., Quellensteuer) im Ledger.

## Zusammenfassung des Abschnitts
- Der Grafik-Backlog ist die zentrale Checkliste für dynamische und statische Assets.
- Alle neu hinzugefügten Mermaid-Diagramme müssen in dieser Liste erfasst werden.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Grafik-Backlog modernisiert, um die Mermaid-Migration und die neue Asset-Struktur abzubilden. |
| 26.02.2026 | 4.21.0-docs | Seite auf den einheitlichen Vorlagenstandard normalisiert. |
