---
slug: rentiva-pro-v6.5.0-release
title: "Rentiva Pro 6.5.0 — Provision für den richtigen Anbieter, Datenschutzanfragen per E-Mail, ein funktionierender Anbietervertrag und Berichte in der Zeitzone der Website"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, privacy, security]
date: 2026-11-18T22:30
---

6.5.0 korrigiert den Umgang mit Anbietergeldern, Stornierungen und personenbezogenen Daten. Die Provision geht jetzt an den Anbieter, dem das gebuchte Fahrzeug gehört; bisher konnte sie an den Kunden gehen, der die Buchung vorgenommen hat. Eine Erstattung macht nur noch eine Provision rückgängig, die tatsächlich gutgeschrieben wurde. Nachrichten, Anbieterdaten und Einwilligungsnachweise erscheinen jetzt in den Datenschutz-Werkzeugen von WordPress, und die Buttons „Datenexport anfordern“ und „Datenlöschung anfordern“ unter „Mein Konto“ starten eine Datenschutzanfrage, die per E-Mail bestätigt wird. Wenn du „Anbietervertrag erforderlich“ aktivierst, wird jetzt immer ein Vertrag angezeigt – mit einer Startvorlage, wenn der Text leer ist. Berichte und Anbieteranalysen richten sich nach der Zeitzone der Website. **Pro 6.5.0 erfordert WordPress 7.0 oder neuer und Rentiva (Lite) 6.4.0 oder neuer: Aktualisiere zuerst Lite, dann Pro.**

<!--truncate-->

:::caution Provisionszeilen, die vor diesem Update geschrieben wurden, werden nicht korrigiert
Die Provision geht jetzt an den Eigentümer des gebuchten Fahrzeugs, und für die eigenen Fahrzeuge der Website wird keine Provisionszeile geschrieben. Zeilen, die vor diesem Update geschrieben wurden, werden nicht korrigiert.
:::

:::caution Die Datenschutz-Buttons unter „Mein Konto“ wirken nicht mehr sofort
„Datenexport anfordern“ und „Datenlöschung anfordern“ eröffnen jetzt eine WordPress-Datenschutzanfrage, die der Kunde per E-Mail bestätigt. Über den Button wird nichts heruntergeladen oder gelöscht.
:::

## Die Provision geht an den richtigen Anbieter

- **Die Provision wird dem Anbieter gutgeschrieben, dem das Fahrzeug gehört.** Bisher wurde sie dem Kunden gutgeschrieben, der die Buchung vorgenommen hat (oder niemandem), und eine Erstattung für ein eigenes Fahrzeug der Website belastete den Kunden. Jetzt belastet eine Erstattung den Anbieter, dessen Gutschrift sie rückgängig macht, und die Einnahmen sowie „Buchungen, letzte 30 Tage“ im Anbieter-Panel zählen die richtigen Buchungen.
- **Eine Erstattung erzeugt nur dann eine Zeile, wenn eine Gutschrift existiert.** Eine Erstattung, die vor der Bezahlung der Bestellung eintraf (zum Beispiel eine Banküberweisung, die noch in Bearbeitung war und erstattet wurde), hinterließ beim Anbieter eine Belastung für Geld, das nie gutgeschrieben worden war. Eine wartende Erstattung wird jetzt geschrieben, wenn die Zahlung abgeschlossen ist – zum Provisionssatz dieser Gutschrift.
- **Stornierungssperren gelten nur für Anbieterfahrzeuge.** Wenn ein Administrator eine Buchung für sein eigenes Fahrzeug im Bearbeitungsbildschirm der Buchung stornierte, wurden die Termine dieses Fahrzeugs für 30 Tage gesperrt. Die Sperre gilt jetzt nur noch für Fahrzeuge, die von einem Anbieter eingestellt wurden.
- **Der Zuverlässigkeitswert zählt die richtigen Stornierungen.** Er zählte jede Stornierung, die die Benutzer-ID des Anbieters trug – auch eine durch einen Administrator, der später Anbieter wurde, oder durch einen Anbieter, der seine eigene Miete unter „Mein Konto“ stornierte –, und er zählte nach dem Erstellungsdatum der Buchung, sodass eine vor sieben Monaten vorgenommene und gestern stornierte Buchung übersehen wurde. Jetzt zählt er nur Stornierungen, die als Anbieter vorgenommen wurden, nach dem Datum der Stornierung und in der Zeitzone der Website. Die Termine werden nicht mehr gesperrt, wenn ein Anbieter seine eigene Miete unter „Mein Konto“ storniert.
- **Ausgeblendete Einstellungen:** „Sperrzeitraum für stornierte Buchungen (Tage)“ und „Abgezogene Punkte pro Stornierung“ sind in den Einstellungen des Anbieter-Marktplatzes ausgeblendet, weil es noch keinen Bildschirm gibt, auf dem ein Anbieter die Buchung eines Kunden stornieren kann. Gespeicherte Werte bleiben erhalten und gelten weiterhin.
- **Strafsperrtage:** Strafsperrtage nach einer Anbieterstornierung gelten in der Fahrzeugsuche jetzt als gebucht und werden nach 30 Tagen (Stornierungstag plus 29) automatisch aufgehoben. „Auf alle anwenden“ und „Von allen entfernen“ kopieren oder löschen keine Strafsperrtage mehr. Termine, die du manuell gesperrt hast, bleiben erhalten.

## Datenschutz-Werkzeuge

- **Drei Pro-Einträge in den Datenschutz-Werkzeugen von WordPress.** Werkzeuge > Personenbezogene Daten exportieren und Personenbezogene Daten löschen enthalten jetzt Nachrichten (die Konversationen des Kunden), Anbieterdaten (Bewerbungen, Profil, Auszahlungen, Berichte und Zuverlässigkeitswert, auch von abgelehnten Bewerbern) und Einwilligungsnachweise. Sie funktionieren auch, wenn die Lizenz abgelaufen ist. Bankkonten werden nur mit ihren letzten vier Ziffern exportiert. Anbieterdatensätze bleiben beim Löschen erhalten (gesetzliche Aufbewahrungspflicht), und das Ergebnis weist darauf hin. Der vorgeschlagene Text für die Datenschutzerklärung erhält einen Pro-Abschnitt.
- **Der Anbieterexport ist vollständig.** Er blättert jetzt durch alle Bewerbungen, Auszahlungen und Berichte; bisher stoppte er bei 20 Bewerbungen und 500 Auszahlungen bzw. Berichten, meldete trotzdem immer, er sei fertig, und abgelehnte Auszahlungen fehlten.
- **Anfragen unter „Mein Konto“ werden per E-Mail bestätigt** (siehe Hinweis oben). Die Bestätigungs-E-Mail wird für dasselbe Konto und dieselbe Aktion innerhalb von 10 Minuten nicht erneut gesendet, und der alte Export, der auch Sitzungstoken und die verschlüsselte IBAN enthielt, ist entfernt.
- **Eine einzige Einwilligungsantwort.** Die Datenschutz-Einwilligungskarte unter „Mein Konto“ und die Buchungsprüfung lasen unterschiedliche Antworten, sodass ein Kunde, der die Karte akzeptiert hatte, trotzdem als nicht einwilligend behandelt werden konnte. Beide lesen jetzt dieselbe Antwort.
- **Türkisch:** Der Einwilligungshinweis nennt KVKK (Gesetz Nr. 6698) statt der DSGVO.

## Ein Anbietervertrag, der immer angezeigt wird

War „Anbietervertrag erforderlich“ aktiviert und der Text leer, sahen Bewerber keinen Vertrag und der Administrator keine Warnung. Bei leerem Text wird jetzt eine integrierte, übersetzbare Vorlage angezeigt, die Inserate, Buchungen, Provision und Auszahlungen, Stornierungen, Schäden und Versicherung, personenbezogene Daten, Sperrung und Kündigung sowie Änderungen abdeckt. Sie ist ein Ausgangspunkt zur Überprüfung, keine Rechtsberatung. Der Vertrag zeigt außerdem einfache Formatierungen (# Überschriften, **fett**, - Listen, --- Trennlinien) statt roher Symbole.

## Berichte in der Zeitzone der Website

Buchungsdaten in den Kunden- und Buchungsberichten und im CSV-Export, die gebuchten Tage im Fahrzeugbericht, die Standardzeiträume der Berichte, der Ablauf der Stornierungssperre und die Tageseinteilung der Anbieteranalysen richten sich jetzt nach der Zeitzone der Website, sodass eine Buchung kurz vor oder nach Mitternacht nicht mehr am falschen Tag landet.

## Fehlerbehebungen und Aufräumarbeiten

- **Backslashes bleiben erhalten.** Ein Backslash, der im Fahrzeugformular für Anbieter (Titel, Beschreibung, Marke, Modell, Farbe, Kilometerstand, Kennzeichen, Stadt), in Feldern der Anbieterbewerbung und der Ablehnungsnotiz, in der externen Referenz einer Auszahlung („BANK\6“ wurde als „BANK6“ gespeichert), in Zeilen der Transfer-Zusatzleistungen und im Verlauf des Anbieterwerts eingegeben wurde, ging beim Speichern verloren.
- **Die Anbietertabelle:** Wenn du auf Seite 2 einen Filter geändert hast, wurde Seite 2 mit dem neuen Filter und danach Seite 1 gesendet, und eine langsame Antwort konnte eine neuere überschreiben. Seite und Filter ändern sich jetzt gemeinsam in einer Anfrage, Tabelle und Seitennavigation bleiben während des Ladens sichtbar, und „Wird geladen …“ erscheint nur vor der ersten Antwort.
- **Bildschirm „Fahrzeug bearbeiten“.** Er zeigt die Pro-Boxen in der Reihenfolge des neuen Designs nach den Seitenboxen von Lite (sofern du die Boxen nicht selbst angeordnet hast), jeweils mit einem „Pro“-Label. Die Box „Lebenszyklus“ zeigt den Status als farbige Pille mit einer Warnung, wenn noch 10 Tage oder weniger verbleiben, und ihre Farben sind auf Weiß gut lesbar. Die Boxen „Dokumente“ und „Transfer“ verwenden dieselben Stile, und „nur Vermietung“ blendet die Transfer-Felder sofort aus, statt sie wegzuschieben.
- **Die Karte eines reinen Transfer-Fahrzeugs** hat keinen Vergleichen-Button mehr, sodass der Vergleich nur Fahrzeuge enthält, die gemietet werden können.
- **Funktioniert mit Lite 6.4.0.** Pro funktioniert mit dem neu gestalteten Buchungsformular, „Mein Konto“, Vergleich, Kalender, Kontakt und Bewertungen in Lite 6.4.0. Das Fenster für Transfer-Zusatzleistungen zeigt das Währungssymbol der Website für sich allein, und die Seite mit den Anbieterbuchungen lädt ihre eigenen Stile. Wenn du Standorte änderst oder einen Transfer-Import ausführst, wird die zwischengespeicherte Standortliste aktualisiert.
- **Lizenzerinnerung.** In den letzten 14 Tagen nennt sie das Ablaufdatum, verlinkt die Lizenzseite und bietet „In 3 Tagen erinnern“ an; sie erscheint auf den Rentiva-Bildschirmen, unter Plugins und im WordPress-Dashboard statt auf jeder Admin-Seite.
- **Türkisch:** „Details“ heißt überall „Ayrıntı“, wie in Lite, die Überschrift des Filterbereichs im Anbieterverzeichnis lautet „Filtre“ und der Anwenden-Button im Anbieter-Kontobuch „Filtrele“.

## Was du nach dem Update prüfen solltest

- **Update-Reihenfolge:** zuerst Rentiva (Lite) 6.4.0, dann Pro 6.5.0. Beide benötigen WordPress 7.0 oder neuer (bisher 6.7).
- **Provision:** Zeilen, die vor diesem Update geschrieben wurden, werden nicht korrigiert; berücksichtige das, wenn du frühere Anbietereinnahmen durchsiehst.
- **Anbietervertrag:** Wenn „Anbietervertrag erforderlich“ aktiviert ist, lies den Text, den Bewerber jetzt sehen – besonders, wenn deiner leer war.
- **Datenschutzanfragen:** Informiere deine Kunden, dass die Buttons unter „Mein Konto“ jetzt eine Bestätigungs-E-Mail senden.
- **Einstellungen des Anbieter-Marktplatzes:** Die beiden Stornierungseinstellungen sind ausgeblendet, ihre gespeicherten Werte gelten aber weiterhin.

---

**Wo du es bekommst.** Pro 6.5.0 ist für Lizenzinhaber an derselben Stelle wie bisher auf wpalemi.com erhältlich. Aktualisiere zuerst [Rentiva auf 6.4.0](/blog/rentiva-v6.4.0-release). Das vollständige Änderungsprotokoll liegt dem Plugin in beiden Sprachen bei.
