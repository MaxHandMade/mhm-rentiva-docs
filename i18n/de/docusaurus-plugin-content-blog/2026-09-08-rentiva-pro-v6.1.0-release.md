---
slug: rentiva-pro-v6.1.0-release
title: "Rentiva Pro 6.1.0 — Eine Löschschaltfläche, die nur ein Kunde drücken kann"
authors: [maxhandmade]
tags: [release, rentiva, pro, privacy, gdpr, security, money]
date: 2026-09-08T02:00
---

In diesem Release geht es vor allem um eine Frage: Was passiert, wenn ein Konto gelöscht wird? Die Antwort war in 6.0.0 an drei verschiedenen Stellen schlechter, als sie hätte sein sollen — und eine davon vernichtete die Nachrichten eines Kunden auf Websites, die die Compliance-Funktion nie gekauft hatten. **Aktualisiere zuerst MHM Rentiva auf 6.1.4, dann Pro.** Diesmal gibt es keine Datenmigration und keine umbenannten Hooks.

<!--truncate-->

## Die Schaltfläche zur Selbstlöschung war für alle aktiv

Die DSGVO-Werkzeuge von Pro platzieren im Kundenkontobereich eine Schaltfläche „Meine Daten löschen“. Ihre einzige Voraussetzung war, angemeldet zu sein.

Jeder angemeldete Benutzer kam an sie heran — ein Redakteur, ein Shop-Manager, **ein Administrator**. Wer DELETE eintippte und bestätigte, löste die Kontolöschung von WordPress für das eigene Konto der aktuellen Sitzung aus. Alles, was dieses Konto verfasst hatte, verschwand mit, und Anhänge landen nicht im Papierkorb, sofern eine Website das nicht ausdrücklich aktiviert — die hochgeladenen Dateien wurden also endgültig vernichtet statt wiederherstellbar zu bleiben. Jeder andere Inhaltstyp, den das Konto verfasst hatte — darunter Elementor-Vorlagen —, wurde auf dieselbe Weise gelöscht.

Der Handler lehnt jetzt jedes Konto ab, das nicht ausschließlich die Kundenrolle hat. Ein Administrator, der die Schaltfläche drückt, erhält den Hinweis, dass das Konto nicht per Selbstbedienung gelöscht werden kann.

## Ein Schutz vor Datenverlust hinter der falschen Lizenz

Pro nimmt Anbieter, Auszahlungen und Nachrichten von einer Kontolöschung aus. Dieser Schutz war innerhalb der Funktion DSGVO-Werkzeuge eingebunden — doch der Inhaltstyp, den er am meisten schützt, die **Nachrichten**, wird von einer anderen Lizenzfunktion registriert.

Eine Website mit Lizenz für Nachrichten, aber *ohne* Lizenz für DSGVO-Werkzeuge registrierte also den Inhaltstyp für Nachrichten, band aber überhaupt keinen Schutz ein. Eine Nachricht hat einen Autor und ist weder Beitrag noch Seite, daher löscht WordPress sie endgültig, statt sie in den Papierkorb zu verschieben. Wurde dieser Kunde in der Kundenansicht des kostenlosen Plugins gelöscht, vernichtete das die Hälfte des Kunden in jeder Unterhaltung, an der er beteiligt war, ohne dass im Papierkorb etwas zum Wiederherstellen lag — und die Antworten der Gegenseite blieben in einem Verlauf zurück, der sich nicht mehr als solcher lesen lässt.

Der Schutz wird jetzt immer eingebunden, sobald Pro lädt, unabhängig von der Lizenz. Er ist ein Schild gegen Datenverlust, keine Funktion — er muss auch Löschungen abdecken, die Pro nicht selbst anstößt.

## Die Bereinigung nach Aufbewahrungsfrist fragte nicht, wem das Konto gehörte

Pro kann Daten inaktiver Kunden nach einer Aufbewahrungsfrist löschen. In 6.0.0 stellte die Abfrage, die die Konten auswählte, drei Fragen: Ist dieses Konto lange genug inaktiv, wurde es lange genug vorher registriert, und hat es keine Buchungen? Sie fragte nicht, **wessen Konto es war**, und auch in der Schleife gab es nirgends eine Rollenprüfung.

Ein inaktives Konto ohne Buchung war daher ein Kandidat, ganz gleich, was es war: ein Anbieter, ein Shop-Manager, ein Administrator.

Die Abfrage schränkt jetzt auf dieselbe Weise ein, und ein zweiter Durchlauf behält nur Konten, deren Rollen ausschließlich die Kundenrolle sind. Im Zweifel wird nicht gelöscht — die richtige Richtung für Code, dessen Aufgabe es ist, Daten zu vernichten.

Drei weitere Punkte im selben Subsystem:

- **Die Aufbewahrungsfrist kann nicht kürzer als ein Jahr sein.** Jeder kleinere Wert, ob konfiguriert oder übergeben, wird auf 365 Tage angehoben, und die Ersetzung wird ins Protokoll geschrieben.
- **Geplante Löschung löscht jetzt tatsächlich.** Die Kontolöschfunktion von WordPress liegt in einer reinen Admin-Datei, die ein geplanter Lauf nie lädt; auf dem Cron-Pfad hatte der Löschschritt daher stillschweigend gar nichts getan. In einem echten Cron-Kontext gemessen: Vor der Korrektur fehlte die Funktion, danach war sie vorhanden.
- **Die E-Mail-Adresse des gelöschten Kunden ist nicht mehr Teil dessen, was die Bereinigung protokolliert.** Erfasst wird nur die Konto-ID. Außerdem wurden zwei Sicherheitswarnungen — darunter die, die ausgelöst wird, wenn ein Konto nicht gelöscht werden konnte und stattdessen anonymisiert wurde — auf einer Stufe geschrieben, die die Standardkonfiguration verwirft. Sie sind jetzt Fehler und werden daher tatsächlich erfasst.

## In einem Multisite-Netzwerk schlägt die Löschung jetzt ehrlich fehl

WordPress kann ein Konto nicht aus einer einzelnen Website heraus aus einem Netzwerk entfernen — sein Löschaufruf entfernt den Benutzer nur von dieser einen Website, und das Konto samt Adresse bleibt netzwerkweit bestehen.

Die Anfrage wurde beantwortet, als wäre sie ausgeführt worden. Jetzt wird sie mit einer Fehlermeldung abgelehnt, die besagt, dass die Kontolöschung auf dieser Installation nicht verfügbar ist.

Das ist eine Verhaltensänderung: Wer früher „Datenlöschung abgeschlossen“ sah, sieht jetzt einen Fehler. Der Fehler ist die wahrheitsgemäße Antwort. Gelöscht wurde vorher ebenfalls nichts.

**Eine Sache, die sich nicht geändert hat und die du kennen solltest:** Wenn sich ein Kunde selbst löscht, verschwinden seine eigenen Buchungen mit dem Konto. Er ist Gegenstand der Anfrage, daher werden sie gelöscht statt aufbewahrt — endgültig, nicht in den Papierkorb. Der oben beschriebene Schutz deckt Anbieter, Auszahlungen und Nachrichten ab, nicht die eigenen Buchungen des Anfragenden. In 6.1.0 gibt es dafür keinen Schalter pro Website. Eine Version, die die Buchung anonymisiert, statt sie zu entfernen, ist der nächste Schritt dieser Arbeit.

## Eine einzige Instanz für die Währung

Zehn Stellen in Pro bestimmten die Währung selbst, wenn WooCommerce nicht verfügbar war — und widersprachen einander. Sechs sagten TRY und eine USD; das Symbol wurde zweimal als Lira-Zeichen und einmal als Dollarzeichen geschrieben.

Das sind Fallbacks, sie laufen also genau dann, wenn die Bedingung zutrifft, gegen die sie absichern: bei einem geplanten Lauf, einem deaktivierten Shop, einem Zahlungs-Callback, der eintrifft, bevor WooCommerce gestartet ist. In diesem Zeitfenster konnte eine einzelne Auszahlung mit USD versehen werden, während der CSV-Export, der Buchungseintrag der Strafe, der Webhook-Callback und die gedruckte Abrechnung über dasselbe Geld alle TRY angaben.

Alle zehn fragen jetzt denselben Helfer, der WooCommerce heranzieht, wenn es aktiv ist, und andernfalls die Währungseinstellung des Plugins. Die Prüfung vor dem Release fand dann fünf weitere Stellen derselben Art — das Analytics-Panel für Anbieter, den eigenen Fallback der gedruckten Abrechnung bei fehlender Währung, den Buchungseintrag für die Stornierung einer Strafe, die E-Mail „Abrechnung bereit“ und den Preishinweis im Fahrzeugformular für Anbieter —, und auch diese nutzen jetzt den Helfer.

Nebenbei wurden zwei Geldfehler behoben, und beide erreichten einen Anbieter:

- **Eine per E-Mail an einen Anbieter gemeldete Strafe las sich wie eine Gutschrift.** Wo WooCommerce nicht verfügbar war, formatierte die Benachrichtigung den Betrag selbst und nahm dessen Absolutwert. Strafen werden als negative Beträge geführt, daher erhielt der Anbieter die Höhe des Abzugs ohne Vorzeichen — dieselbe Zeichenkette, die eine Zahlung erzeugt.
- **Die gedruckte Auszahlungsabrechnung konnte um den Faktor tausend falsch sein.** Ihre Zahlen stammen aus gespeicherten Daten, und ein bereits als `1.234.567,89` formatierter Wert wurde direkt in eine Zahl umgewandelt, was `1.234` ergibt — stillschweigend, auf dem Dokument, das ein Anbieter aufbewahrt.

## Vier Verknüpfungen sind zurück im Dashboard

Berichte, Anbieter, Nachrichten und Export verschwanden am 8. August mit der WordPress.org-Trennung des kostenlosen Plugins aus dem Dashboard, und nichts konnte sie zurückbringen, bis das kostenlose Plugin eine Schnittstelle dafür öffnete. Die Seiten blieben die ganze Zeit im Admin-Menü; sie hatten lediglich ihre Verknüpfungen verloren.

Jede wird pro Lizenzfunktion beigesteuert, sodass eine Lizenz, die eine Ansicht nicht öffnen kann, auch keinen Link darauf erhält, und eine nicht lizenzierte Installation steuert überhaupt keine bei. Transfer ist bewusst nicht darunter — er führt zu Standorten und Routen, die einmal konfiguriert und dann in Ruhe gelassen werden.

Deshalb **erfordert Pro jetzt MHM Rentiva 6.1.4 oder neuer**, während der Prüfung vor dem Release von 6.1.3 angehoben: Die Verknüpfungen binden einen Filter, den das kostenlose Plugin erst ab 6.1.4 öffnet. Auf einer Website mit 6.1.3 wäre die Kombination akzeptiert worden, und die Verknüpfungen wären einfach nie erschienen, ohne dass etwas den Grund verraten hätte. Findet Pro ein älteres kostenloses Plugin vor, deaktiviert es sich mit einem Hinweis und rührt keine Daten an.

## Außerdem in diesem Release

Das Monitoring-Subsystem wurde entfernt — ein Nachrichten-Logger, ein Monitoring-Manager und ein Performance-Monitor, rund 1.400 Zeilen, die kein Codepfad erreichen konnte. Die gemeinsame MHM-Oberflächenbibliothek wurde im Gleichschritt mit dem kostenlosen Plugin von 0.4 auf 0.9.4 angehoben.

---

Das vollständige Änderungsprotokoll wird mit dem Plugin in beiden Sprachen ausgeliefert.
