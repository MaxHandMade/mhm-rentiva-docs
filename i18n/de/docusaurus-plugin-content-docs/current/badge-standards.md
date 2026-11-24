---
id: badge-standards
title: "Badge-Standards & Nutzungsleitfaden"
sidebar_label: "Badge-Standards"
sidebar_position: 120
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Doku](https://img.shields.io/badge/docs-standard_v2-0f766e?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Dieser Leitfaden legt die Standards, Farbcodes und Nutzungsregeln für die visuellen Badges fest, die auf den Dokumentationsseiten von MHM Rentiva verwendet werden.
:::

# 🏷️ Badge-Standards & Nutzungsleitfaden

`Shields.io`-basierte Badges werden verwendet, um die Aktualität und das technische Niveau jeder Dokumentationsseite auf einen Blick sichtbar zu machen.

---

## 🔝 1. Aktuelles Badge-Format (v4.27.2)

Die Standardreihenfolge, die oben auf jeder Seite erscheinen muss:

```markdown
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)
```

---

## 🏛️ 2. Badge-Komponenten

### Versions-Badge
- **Farbe:** Blau (`blue`)
- **Format:** `version-{plugin_version}`
- **Verwendung:** Gibt an, mit welcher Hauptversion des Plugins diese Seite kompatibel ist.

### Sicherheits- & Compliance-Badges
- **Farbe:** Grün (`green`) oder Dunkelgrün (`0f766e`)
- **Werte:**
  - `WPCS Compliant`: Entspricht den WordPress Coding Standards.
  - `Security Hardened`: Sicherheitshärtung angewendet.
  - `SQL Safe`: Gegen SQL-Injection geschützt.

### Aktualisiert-Badge
- **Farbe:** Orange (`orange`)
- **Format:** `last updated-DD.MM.YYYY`
- **Verwendung:** Zeigt an, wann die Seite zuletzt überprüft oder aktualisiert wurde.

---

## 🎨 3. Stilparameter

Alle Badges müssen für ein einheitliches Erscheinungsbild die folgenden Parameter verwenden:
- **`style=flat-square`**: Sorgt für ein modernes Erscheinungsbild mit eckigen Kanten.
- **`logo=...`**: Markenlogos können bei Bedarf hinzugefügt werden.

---

## 📏 4. Nutzungsregeln

1. **Position:** Badges müssen direkt nach dem YAML-Frontmatter und vor der Hauptüberschrift (`#`) platziert werden.
2. **Reihenfolge:** Die Standardreihenfolge lautet: **Version** → **Dokumenttyp / Sicherheit** → **Zuletzt aktualisiert**.
3. **Abstand:** Lass zwischen den Badges jeweils ein einzelnes Leerzeichen.
4. **Genauigkeit:** Das Aktualisierungsdatum muss immer dem Datum entsprechen, an dem die Änderung vorgenommen wurde.

---

## 📝 5. Beispiel

```markdown
---
id: sample-page
title: Sample Page
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

# Sample Title
Content goes here...
```

## Zusammenfassung des Abschnitts
- Eine einheitliche Verwendung von Badges verleiht der Dokumentation ein professionelles Erscheinungsbild.
- Alle Seiten wurden ab v4.21.2 auf das neue Format vereinheitlicht.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Standards von v4.21.2 und neue Farbcodes hinzugefügt. |
