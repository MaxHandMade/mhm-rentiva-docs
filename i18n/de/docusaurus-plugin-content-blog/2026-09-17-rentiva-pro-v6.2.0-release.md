---
slug: rentiva-pro-v6.2.0-release
title: "Rentiva Pro 6.2.0 — ein eigener Bereich für Anbieter, eine Währung im Hauptbuch und Erstattungen, die die Provision exakt zurückbuchen"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, payouts, money, security]
date: 2026-09-17T06:30
---

Anbieter erhalten einen eigenen Bereich, und das Geld dahinter steht auf einer einheitlichen Grundlage: eine Währung im Hauptbuch und Erstattungen, die genau die gutgeschriebene Provision zurücknehmen. **Aktualisiere zuerst MHM Rentiva auf 6.1.5, dann Pro.** Findet Pro eine ältere Rentiva-Version, deaktiviert es sich mit einem Hinweis und legt nichts an.

<!--truncate-->

## Ein Bereich, mit dem Anbieter arbeiten können

Pro legt automatisch eine Seite **Anbieterbereich** unter der Adresse `satici-panel` an, mit fünf Abschnitten: Übersicht, Meine Inserate, Buchungen, Einnahmen & Auszahlungen und Bewertungen. Der alte Anbieterbereich unter Mein Konto leitet jetzt dauerhaft dorthin weiter.

- Unter **Meine Inserate** kann ein Anbieter ein Inserat pausieren, fortsetzen, zurückziehen, verlängern und erneut einstellen. Angezeigt werden nur die Aktionen, die der aktuelle Status des Inserats zulässt; ein nie freigegebenes Inserat zeigt keine, und eines, das auf seine Inseratsgebühr wartet, zeigt *Zahlung abschließen*. Ein abgelehntes Inserat zeigt den Ablehnungshinweis, und ein zurückgezogenes Inserat behält seinen Buchungsverlauf.
- Unter **Einnahmen & Auszahlungen** fordert ein Anbieter eine Auszahlung an. Solange eine Anforderung aussteht, zeigt der Bereich diese Anforderung statt des Formulars.
- Ein Administrator kann den Bereich öffnen, um zu sehen, was Anbieter sehen. Ein gesperrter Anbieter sieht, warum sein Zugang beendet wurde, und ein Bewerber, dessen Bewerbung noch aussteht, sieht deren Status, statt zum Bewerbungsformular zurückgeschickt zu werden.

## Eine Währung im Hauptbuch

Das Anbieter-Hauptbuch erfasst jetzt jeden Betrag in **der Basiswährung des Shops**, mit der eigenen Dezimalgenauigkeit des Shops — auch wenn ein Besucher über Currency Switcher in einer anderen Währung bezahlt hat. Die Provision aus einer solchen Bestellung wird mit **dem in dieser Bestellung gespeicherten Wechselkurs** umgerechnet. Deshalb benötigt diese Version Rentiva 6.1.5: 6.1.5 verhindert, dass die Datenbankbereinigung von Rentiva genau diesen gespeicherten Kurs löscht.

Guthaben und Summen berücksichtigen nur Beträge in der Basiswährung. Ein Guthaben, das ein Anbieter noch in einer anderen Währung hat, wird auf der Karte „Verfügbares Guthaben“ gesondert aufgeführt, statt stillschweigend hinzugerechnet zu werden. Die Geldspalten des Hauptbuchs werden durch ein einmaliges Datenbank-Update auf vier Dezimalstellen erweitert; der Prüf-Hash jeder bestehenden Hauptbuchzeile bleibt unverändert.

## Erstattungen nehmen genau das zurück, was gutgeschrieben wurde

Eine Erstattung bucht die Provision jetzt **kumulativ** zurück, verknüpft mit der Provision, zu der sie gehört. Jede Folge von Teilerstattungen — auch eine, die vor der Provision selbst erfasst wurde — nimmt genau das zurück, was gutgeschrieben wurde, in der Währung dieser Provision. Erstattungen für dieselbe Bestellung werden nacheinander verarbeitet, sodass zwei gleichzeitig eingehende nicht mehr beide die volle Provision zurückbuchen können.

## „Insgesamt ausgezahlt“ zeigte nach einer echten Auszahlung 0

Auszahlungen, die auf der Seite „Auszahlungen“ freigegeben wurden, wurden unter einem Typ erfasst, den die Summen nicht erkannten, und als *reserviert* statt als bezahlt — ein Status, aus dem sie nie herausgeholt wurden. „Insgesamt ausgezahlt“ zeigte beim Anbieter 0, und die Einnahmen zählten die Auszahlung als negativ. Auszahlungen werden jetzt als bezahlt erfasst, und auf diese Weise vor dieser Version freigegebene werden beim nächsten Laden einer Admin-Seite korrigiert.

## Lies das vor dem Update

- **Sicherheit.** Bei aktivierten Inseratsgebühren legte eine Anfrage zum Verlängern oder erneuten Einstellen das Inserat in den Warenkorb des anfragenden Anbieters, **bevor geprüft wurde, ob das Inserat ihm gehört** — ein aktiver Anbieter konnte so das Inserat eines anderen Anbieters verlängern oder erneut einstellen. Die Eigentümerschaft wird jetzt zuerst geprüft.
- Bei aktivierten Inseratsgebühren wurde bei einer kostenpflichtigen Verlängerung oder Neueinstellung außerdem die Gebühr erhoben, **bevor** geprüft wurde, ob das Inserat verlängert oder erneut eingestellt werden konnte: Eine Verlängerung nach Ablauf der Kulanzfrist wurde bezahlt und blieb abgelaufen, und eine Neueinstellung übersprang ihre Wartezeit. Die Regeln werden jetzt vor dem Checkout und erneut beim Abschluss der Zahlung geprüft.
- Auf einer Website, auf der Rentiva vor Pro aktiviert wurde — die einzige Reihenfolge, die Pro zulässt —, wurden die eigenen Tabellen von Pro (Anbieter-Hauptbuch, Auszahlungsprotokoll, Schlüsselregister, Provisionsrichtlinie, Anbieterberichte und die Transfer-Tabellen) nie angelegt, sodass **keine Provision erfasst wurde und nichts den Grund nannte**. Pro legt jetzt beim nächsten Laden einer Admin-Seite jede fehlende Tabelle an und versucht es weiter, bis alle vorhanden sind.
- Die Integritätsprüfung des Hauptbuchs schrieb ihr Ergebnis innerhalb ihrer eigenen schreibgeschützten Transaktion, sodass eine festgestellte Abweichung nie gespeichert wurde. Jetzt wird sie gespeichert.

## Außerdem in diesem Release

Daten im Hauptbuch werden in der Zeitzone deiner Website statt in UTC angezeigt. Der Anbieterbereich schlägt nicht mehr fehl, wenn WooCommerce außerhalb der Plugin-Seite deaktiviert wird, und zwei gleichzeitige Aufrufe beim ersten Laden können nicht mehr zwei Anbieterbereich-Seiten anlegen. Auf „Anbieterverwaltung“ und „Anbieterberichte“ sind Admin-Hinweise bereits vorhanden, wenn die Seite zum ersten Mal erscheint. Der Anbieterbereich und die Meldungen zu Inseratsgebühren sind ins Türkische übersetzt.

---

**Wo du es bekommst.** Pro 6.2.0 ist auf GitHub als `v6.2.0` veröffentlicht und wird über den Rentiva-Pro-Download auf wpalemi.com bereitgestellt. Aktualisiere zuerst [Rentiva auf 6.1.5](/blog/rentiva-v6.1.5-release). Das vollständige Änderungsprotokoll wird in beiden Sprachen mit dem Plugin ausgeliefert.
