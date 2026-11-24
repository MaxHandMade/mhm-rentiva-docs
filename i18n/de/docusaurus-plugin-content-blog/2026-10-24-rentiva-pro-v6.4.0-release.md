---
slug: rentiva-pro-v6.4.0-release
title: "Rentiva Pro 6.4.0 — Transfers nutzen deine eingestellte Anzahlung, der Transfer-Warenkorb wird auf dem Server berechnet, sichere Editor-Vorschauen"
authors: [maxhandmade]
tags: [release, rentiva, pro, transfer, payments, elementor, security]
date: 2026-10-24T06:30
---

Mit 6.4.0 berechnen Transfers das, was in deinen Einstellungen steht. Der Transfer-Warenkorb ermittelt jetzt den Preis jedes Transfers auf dem Server und berechnet die unter Einstellungen > Transfer festgelegte Anzahlung; bisher übernahm er den Preis aus dem Browser und berechnete immer den vollen Betrag. Pro-Widgets zeigen in den Editoren sichere Vorschauen, und Pro-E-Mails erhalten übersetzte Namen und die Website-Sprache. Beim Update läuft kein Datenbankschritt. **Aktualisiere zuerst MHM Rentiva (Lite) auf 6.3.0, dann Pro.** Neben Rentiva 6.2.1 oder älter schaltet Pro 6.4.0 seine Funktionen ab, bis Rentiva aktualisiert ist – führe die beiden Updates also direkt nacheinander durch.

<!--truncate-->

:::caution Prüfe deine Transfer-Anzahlungen
Transfers berechnen jetzt die unter **Einstellungen > Transfer** festgelegte Anzahlung statt des vollen Betrags. **Der eigene Anzahlungssatz eines Fahrzeugs hat Vorrang:** Ein Fahrzeug, das einen eigenen Satz gespeichert hat (der alte Standard hat 10 eingetragen), berechnet diese Anzahlung auch bei Transfers, selbst wenn die Transfer-Einstellung „Vollständige Zahlung erforderlich“ lautet. Leere das Anzahlungsfeld des Fahrzeugs, damit es der Transfer-Einstellung folgt. **Die Anbieter-Provision wird auf den online berechneten Betrag ermittelt**, bei einem solchen Transfer also auf die Anzahlung; ein offline kassierter Restbetrag erzeugt keinen Provisionseintrag.
:::

## Transfers berechnen, was in deinen Einstellungen steht

- **Die Transfer-Anzahlungseinstellung wird angewendet.** Egal, was unter Einstellungen > Transfer („Zahlungsart“ / „Anzahlungssatz (%)“) gewählt war, Transfers wurden bisher vollständig berechnet. Der Warenkorb berechnet jetzt die von dir festgelegte Anzahlung.
- **Der eigene Anzahlungssatz eines Fahrzeugs überschreibt die Transfer-Einstellung**, wie bei Vermietungen – siehe den Kasten oben.
- **Anbieter-Fahrzeuge** erhalten keine feste Anzahlung von 20 % mehr; sie folgen der websiteweiten Einstellung.
- Unter Einstellungen > Transfer beginnt das Feld für den Anzahlungssatz bei 1 (wähle „Vollständige Zahlung erforderlich“ für keine Anzahlung), und die Seite erklärt, dass der eigene Satz eines Fahrzeugs Vorrang hat.
- Benutzerdefinierte Standorttypen, die im Tab „Transfer“ gespeichert wurden, werden jetzt wirksam; ein älterer gespeicherter Wert blendet sie nicht mehr aus.

## Ein auf dem Server berechneter Transfer-Warenkorb

- **Jeder Transfer wird auf dem Server berechnet.** Ein vom Browser gesendeter Preis wird ignoriert.
- **Ein Fahrzeug, das die Transfersuche für diese Route nicht anbietet, kann nicht hinzugefügt werden** – nicht für Transfers angeboten, belegt, Route nicht zugewiesen oder zu klein.
- **Das Anbieter-Fahrzeugformular akzeptiert keinen Anzahlungswert mehr, den es nicht anzeigt.** Ein Anbieter konnte einen solchen Wert manuell senden und so sowohl die Anzahlung als auch die Provisionsbasis senken.
- **Warenkorb- und Bestellpositionen lauten „VIP Transfer: A ➝ B“** im Block-Warenkorb, im Mini-Warenkorb und in der gespeicherten Bestellung statt des allgemeinen Buchungsnamens. Jede Zusatzleistung wird einmal mit ihrem Preis aufgeführt, die zusätzliche Zeile „Zusatzleistungen gesamt“ entfällt, die Zeile mit dem Rückgabedatum ist in jeder Website-Sprache ausgeblendet, und die Zeile „Dauer“ in Bestellungen heißt jetzt „Geschätzte Dauer“, wie im Warenkorb.

## Elementor und die Editoren

- **Die Elementor-Widgets „Transfer Results“ (11 Einstellungen) und „Meine Nachrichten“ (1 Einstellung)** haben einen Abschnitt „Zusätzliche Einstellungen“ mit denselben Einstellungen wie ihre Blöcke. Die Standardwerte entsprechen der heutigen Ausgabe, gespeicherte Seiten sehen also gleich aus.
- **Sichere Vorschauen.** Im Elementor- und im Block-Editor werden Transfer Results, Vendor Profile, Meine Nachrichten, Transfer Search, Beliebte Routen und Vendor Directory im selben Vorschaurahmen dargestellt wie die Widgets von Rentiva. Solange du keine Suchstandorte oder keinen Anbieter auswählst, zeigen sie Beispiel-Transfers, einen Beispiel-Anbieter und Beispiel-Nachrichtenverläufe mit einem Hinweis; ausgewählte Standorte führen eine echte Suche aus, und ein ausgewählter Anbieter zeigt dessen Profil. Deine eigenen Nachrichten erscheinen nie, und die Formulare sind inaktiv. Vendor Profile erklärt, wenn kein Anbieter gefunden wird, statt einen leeren Kasten anzuzeigen.
- **Pro-Blöcke sind übersetzt** und befinden sich zusammen mit den Rentiva-Blöcken in der Kategorie „Rentiva“. Das Präfix „MHM “ wurde aus den Namen der Pro-Widgets und -Blöcke entfernt, und zwei Blocktitel haben sich geändert: „Nachrichten“ heißt jetzt „Meine Nachrichten“ und „Beliebte Transferrouten“ heißt jetzt „Beliebte Routen“.

## E-Mails

- **Die E-Mail-Vorschau listet alle 31 Pro-Vorlagen mit übersetztem Namen auf** (sie zeigten „Vendor approved“, „Payout approved“ usw. auf Englisch), jeweils gefüllt mit Beispieldaten zu Anbieter, Auszahlung, Provision, Bericht und Nachricht statt leerer Lücken.
- **Pro-E-Mails verwenden die Website-Sprache**, zusammen mit denen von Rentiva, auch während ein Admin mit einer anderen Profilsprache arbeitet.

## Fehlerbehebungen

- Der Export personenbezogener Daten enthält wieder die Lieblingsfahrzeuge des Kunden.
- Fehlermeldungen auf der Seite „Meine Nachrichten“ zeigen ihren Text an; vier davon waren leer.
- Transfer Results liefert kein veraltetes zwischengespeichertes Ergebnis mehr, wenn sich Einstellungen zweimal innerhalb derselben Sekunde ändern, und seine Einstellung `columns` hat ein Minimum von 1, sodass 0 oder ein nicht numerischer Wert kein leeres Raster mehr erzeugt.
- Die Einheit der Transferdauer („Min.“) ist übersetzt.
- **Türkisch:** „Deposit Rate (%)“ lautet jetzt „Kapora oranı“, „Full Payment Required“ lautet „Tam ödeme gerekli“, E-Mail-Texte sagen „etkin“, und die Formulierungen für Abholung / Rückgabe wurden zu „Teslim alma / Dönüş“ hin angepasst.

:::caution Bekannte Einschränkung (unverändert seit 6.3.0)
Ein Anbieter, dessen IBAN nach dem Update auf 6.3.0 nicht gelesen werden konnte, kann keine Auszahlung anfordern, bis die IBAN erneut eingegeben wird, und 6.4.0 hat noch immer kein Formular zur Eingabe. Der Admin-Hinweis listet jeden betroffenen Anbieter auf.
:::

## Für Entwickler

Erfordert MHM Rentiva 6.3.0 (angehoben von 6.2.0). Entfernt: eine alte Transfer-Einstellungsseite, die über kein Menü und keinen Link erreichbar war, ihr Speicher-Handler und die Action `admin_post_mhmrentiva_save_transfer_settings`. Der Transfer-Warenkorb liest nur noch die `mhmrentiva_transfer_deposit_*`-Schlüssel des Tabs „Transfer“, nicht mehr `rentiva_transfer_deposit_*`. Pro hängt sich in Rentivas `mhmrentiva_cart_item_name`, `mhmrentiva_email_template_labels`, `mhmrentiva_email_preview_context` und `mhmrentiva_parity_labels` ein. Die `_html`-Filter von Vendor Directory, Vendor Profile und Beliebte Routen erhalten jetzt auch die frühen leeren Ausgaben, mit normalisierten Attributen.

---

**Bezugsquelle.** Pro 6.4.0 ist auf GitHub als `v6.4.0` veröffentlicht und wird über den Rentiva-Pro-Download auf wpalemi.com bereitgestellt. Aktualisiere zuerst [Rentiva auf 6.3.0](/blog/rentiva-v6.3.0-release). Das vollständige Änderungsprotokoll wird in beiden Sprachen mit dem Plugin ausgeliefert.
