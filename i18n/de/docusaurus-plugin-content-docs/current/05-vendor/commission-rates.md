---
id: commission-rates
title: "Konfiguration der Provisionssätze"
sidebar_label: "Provisionssätze"
sidebar_position: 11
slug: /vendor/commission-rates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Aktualisiert](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite beschreibt eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusätzlich zu Lite installiert ist und eine gültige Lizenz vorliegt.
Siehe [Editionen – Lite vs. Pro](/docs/) für die vollständige Aufteilung oder hol dir Pro unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
Dieses Dokument erklärt, wie MHM Rentiva entscheidet, **welcher Provisionssatz** für eine bestimmte Buchung gilt, und wo sich die vier Konfigurationsbildschirme im wp-admin befinden. Wie der daraus resultierende `commission_credit`-Ledger-Eintrag erstellt, freigegeben und ausgezahlt wird, erfährst du unter [Auszahlungen & Ledger](/docs/vendor/payouts-ledger).
:::

# 💰 Konfiguration der Provisionssätze

Jede bezahlte Buchung eines Anbieter-Fahrzeugs erzeugt eine Provisionsgutschrift für den Anbieter, dem dieses Fahrzeug gehört – unabhängig davon, wer die Buchung angelegt hat. Fahrzeuge, die der Website selbst und nicht einem Anbieter gehören, erzeugen keine. Der für diese Berechnung verwendete **Satz** wird über eine 4-stufige Hierarchie ermittelt – die spezifischste Ebene, die einen Wert hat, gewinnt, und jede leer gelassene Ebene wird einfach an die nächste weitergereicht.

---

## 🏗️ 1. Die Hierarchie der Sätze

| Priorität | Ebene | Wo er festgelegt wird | Gilt für |
|---|---|---|---|
| 1 (höchste) | **Fahrzeug-Überschreibung** | Fahrzeug-Bearbeitungsbildschirm → Metabox „Provisionssatz überschreiben“ | Ein einzelnes Fahrzeug |
| 2 | **Anbieter-Überschreibung** | Anbieterverwaltung → Anbieter-Detailseite → Feld „Provisionssatz überschreiben“ | Alle Buchungen eines Anbieters (sofern keine Fahrzeug-Überschreibung greift) |
| 3 | **Mengenrabattstufe** | Anbieterverwaltung → Tab „Provision“ → „Mengenrabattstufen“ | Anbieter, deren freigegebener Umsatz der letzten 30 Tage einen Schwellenwert überschreitet |
| 4 (niedrigste) | **Globaler Satz** | Anbieterverwaltung → Tab „Provision“ → aktueller Satz | Der plattformweite Standard; immer definiert |

:::tip Wie „leer“ funktioniert
Wenn du das Feld für die Fahrzeug- oder Anbieter-Überschreibung leer lässt, bedeutet das **nicht** „0 % Provision“ – es bedeutet „hier keine Überschreibung, prüfe die nächstniedrigere Ebene“. Ein tatsächlich eingetragenes `0` ist eine echte, bewusste Überschreibung (0 % Provision für dieses Fahrzeug bzw. diesen Anbieter).
:::

---

## 🚗 2. Überschreibung auf Fahrzeugebene

**Ort:** Ein beliebiges Fahrzeug bearbeiten → Seitenleiste → Metabox **Provisionssatz überschreiben**.

Lege einen Prozentsatz fest (0–100, Dezimalstellen erlaubt, z. B. `4.5`), um für die Buchungen dieses Fahrzeugs einen festen Provisionssatz zu berechnen – unabhängig vom eigenen Satz des Anbieters oder vom Stufen- bzw. globalen Satz der Plattform. Lass das Feld leer, um auf den Satz auf Anbieterebene (oder einer niedrigeren Ebene) zurückzufallen.

Dies ist die spezifischste Ebene – verwende sie für ein einzelnes Fahrzeug mit einer besonderen geschäftlichen Vereinbarung (z. B. ein Werbeangebot oder ein Partnerfahrzeug mit ausgehandeltem Satz).

---

## 🧑‍💼 3. Überschreibung auf Anbieterebene

**Ort:** Anbieterverwaltung → **Aktive Anbieter** → auf einen Anbieter klicken → Feld **Provisionssatz überschreiben** auf der Anbieter-Detailseite.

Lege einen Prozentsatz fest, um einen festen Provisionssatz auf alle Buchungen dieses Anbieters anzuwenden (jedes Fahrzeug ohne eigene Überschreibung). Lass das Feld leer, um auf die Mengenrabattstufe des Anbieters oder den globalen Satz zurückzufallen.

Verwende dies für individuell ausgehandelte Anbieterverträge, ohne jedes Fahrzeug anfassen zu müssen, das der Anbieter anbietet.

---

## 📉 4. Mengenrabattstufen

**Ort:** Anbieterverwaltung → Tab **Provision** → Abschnitt **Mengenrabattstufen**.

Anbieter ohne manuelle Überschreibung erhalten automatisch einen Rabatt auf den globalen Satz, sobald ihr **freigegebener Nettoumsatz** der letzten 30 Tage einen Schwellenwert überschreitet. Es gibt immer genau **3 Stufen** – die Schwellenwerte und Rabattbeträge (in Prozentpunkten) sind bearbeitbar, Stufen können aber nicht hinzugefügt oder entfernt werden.

| Standardstufe | Umsatzschwelle (30 Tage) | Rabatt |
|---|---|---|
| 1 | 30.000 | −6 Punkte |
| 2 | 15.000 | −4 Punkte |
| 3 | 5.000 | −2 Punkte |

Beispiel: Mit den obigen Standardwerten erhält ein Anbieter, dessen freigegebener Umsatz der letzten 30 Tage 18.000 beträgt, den Rabatt der Stufe 2 (−4 Punkte) auf den globalen Satz.

---

## 🌐 5. Globaler Satz

**Ort:** Anbieterverwaltung → Tab **Provision** → oberer Abschnitt.

Der plattformweite Standardsatz. Dies ist die einzige Ebene, die immer einen Wert hat – sie ist die Untergrenze, auf die jede Buchung zurückfällt, wenn keine Fahrzeug-Überschreibung, keine Anbieter-Überschreibung und kein Stufenrabatt greift. Eine Änderung erzeugt eine neue Version der Satzrichtlinie; bestehende, bereits gutgeschriebene Buchungen behalten den Satz, mit dem sie ursprünglich berechnet wurden (siehe [Auszahlungen & Ledger](/docs/vendor/payouts-ledger), wie Satz-Snapshots vergangene Transaktionen vor späteren Satzänderungen schützen).

---

## 📐 6. Durchgerechnetes Beispiel

Eine Buchung wird für ein Fahrzeug erfasst, dessen Anbieter keine Überschreibung auf Anbieterebene hat, für das Fahrzeug selbst ist jedoch eine Überschreibung von `4%` festgelegt:

1. **Fahrzeug-Überschreibung** → `4%` ist vorhanden → **dieser Satz wird verwendet**, keine niedrigere Ebene wird geprüft.

Hätte dasselbe Fahrzeug keine Überschreibung, der Anbieter aber eine Überschreibung von `10%`:

2. **Fahrzeug-Überschreibung** → leer → weiter zur nächsten Ebene.
3. **Anbieter-Überschreibung** → `10%` ist vorhanden → **dieser Satz wird verwendet**.

Hätten weder das Fahrzeug noch der Anbieter eine Überschreibung und beträgt der freigegebene Umsatz des Anbieters der letzten 30 Tage 20.000 (womit die Stufe bei 15.000 überschritten ist):

4. **Fahrzeug-Überschreibung** → leer → weiter zur nächsten Ebene.
5. **Anbieter-Überschreibung** → leer → weiter zur nächsten Ebene.
6. **Mengenrabattstufe** → entspricht Stufe 2 → der globale Satz minus 4 Punkte wird verwendet.

---

## Zusammenfassung des Abschnitts
- Die Hierarchie ergibt immer einen Wert – ein leeres Feld bedeutet „nächste Ebene prüfen“, niemals „0 %“.
- Überschreibungen auf **Fahrzeug**- und **Anbieter**ebene sind für einmalige, ausgehandelte Vereinbarungen gedacht.
- **Stufen** belohnen umsatzstarke Anbieter automatisch, ohne manuellen Aufwand pro Anbieter.
- Der **globale Satz** ist der dauerhafte Rückfallwert und die einzige Ebene, die niemals leer sein kann.

## Änderungsprotokoll
| Datum | Version | Hinweis |
| :--- | :--- | :--- |
| 18.11.2026 | Pro 6.5.0 | Die Gutschrift geht an den Anbieter, dem das gebuchte Fahrzeug gehört; die eigenen Fahrzeuge der Website erzeugen keine Provision. |
| 07.07.2026 | Unveröffentlicht | Erste Version – dokumentiert die Admin-Bildschirme für Fahrzeug-Überschreibung, Anbieter-Überschreibung und Mengenrabattstufen. |
