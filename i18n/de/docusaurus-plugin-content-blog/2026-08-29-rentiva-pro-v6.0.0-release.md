---
slug: rentiva-pro-v6.0.0-release
title: "Rentiva Pro 6.0.0 — Alles ist einheitlich benannt, und Sperrung bedeutet endlich Sperrung"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendors, security, breaking]
date: 2026-08-29T05:00
---

Dies ist ein Major-Release und der erste Pro-Build seit 5.2.3 Ende Juli. Für die meisten Website-Betreiber reichen zwei Sätze: **Aktualisiere zuerst MHM Rentiva auf 6.1.3, dann Pro**, und deine Daten werden beim nächsten Öffnen des Adminbereichs automatisch übernommen. Alle anderen – also alle, die eigenen Code an Pro angebunden haben – sollten vorher eine kurze Liste lesen, denn 70 Hook-Namen haben sich geändert, und nichts warnt dich, wenn einer davon nicht mehr ausgelöst wird.

<!--truncate-->

## Lies das zuerst, wenn du eigenen Code hast

Die Bezeichner von Pro verwenden jetzt ein einheitliches Präfix, genauso wie die des kostenlosen Plugins in dessen eigener Version 6.0.0. Das ist gut, wenn man es einmal erledigt hat, und schlecht, wenn man es zufällig entdeckt – deshalb hier alles auf einen Blick.

**Die Hook-Regel besteht aus einem Schritt.** Ersetze `mhm_rentiva_` durch `mhmrentiva_`. Aus `mhm_rentiva_payout_approved` wird also `mhmrentiva_payout_approved`. Drei Nachrichten-Hooks verwendeten ein einfaches `mhm_`-Präfix und folgen derselben Regel: `mhm_message_created`, `mhm_message_read` und `mhm_message_status_changed`.

**Ein Hook, den die Regel nicht abdeckt.** `mhm_rentiva/currency_symbol` verwendete einen Schrägstrich, wo alle anderen Namen einen Unterstrich hatten. Er heißt jetzt `mhmrentiva_currency_symbol`.

**Ein Filter wurde entfernt statt umbenannt.** `mhm_rentiva_vendor_apply_endpoint_slug` wurde wie alles andere auf das neue Präfix umgestellt und jetzt vollständig entfernt – weil er nie funktioniert hat. Er wurde nur dort angewendet, wo die Weiterleitung nach dem Absenden erzeugt wird, während der Code, der den Endpunkt für Anbieter-Bewerbungen *registriert*, ihn nie ausgelesen hat, weder in dieser Version noch in 5.2.3. Wer ihn gesetzt hatte, wurde an eine Adresse weitergeleitet, von der WordPress nichts wusste, und landete auf einer 404-Seite. Wir haben ihn entfernt, statt ihn anzubinden, weil die Adresse eines Endpunkts hier ein Bezeichner ist, der an die Sprache deiner Website gebunden ist, und keine Beschriftung, die anderer Code umschreiben soll.

**Was die Leute wirklich erwischt, sind nicht unsere Hook-Namen.** Die drei Inhaltstypen von Pro wurden umbenannt, und das ändert die davon abgeleiteten WordPress-Hooks:

| Bisher | Jetzt |
| --- | --- |
| `mhm_message` | `mhmrentiva_message` |
| `mhm_payout` | `mhmrentiva_payout` |
| `mhm_vendor_app` | `mhmrentiva_vendor` |

Aus `save_post_mhm_payout` wird also `save_post_mhmrentiva_payout`, und dasselbe gilt für die `add_meta_boxes_*`- und `manage_*_posts_columns`-Familien. Jede `WP_Query`-, `get_posts`- oder `pre_get_posts`-Prüfung, die einen alten Typ nennt, trifft jetzt auf gar nichts mehr zu – und zwar stillschweigend.

Beachte die dritte Zeile. `mhm_vendor_app` wurde **nicht** zu `mhmrentiva_vendor_app` – dieser Name hat 21 Zeichen, und WordPress speichert einen Inhaltstyp in einer Spalte mit 20 Zeichen. Die Registrierung schlägt dann komplett fehl, und der Inhaltstyp würde schlicht nicht mehr existieren. Er heißt `mhmrentiva_vendor`.

**Durchsuche vor dem Update deinen eigenen Code nach** `mhm_rentiva`, `mhm_message_`, `save_post_mhm_payout` sowie den Werten in Anführungszeichen `'mhm_message'`, `'mhm_payout'` und `'mhm_vendor_app'`.

**Deine Shortcodes wurden bewusst nicht angetastet.** `rentiva_vendor_profile`, `rentiva_vendor_directory`, `rentiva_vendor_ledger`, `rentiva_transfer_search`, `rentiva_transfer_results`, `rentiva_popular_routes` und `rentiva_messages` behalten die Namen, die sie schon immer hatten, weil diese Namen im Inhalt deiner Seiten gespeichert sind. Eine Umbenennung hätte Live-Seiten geleert. Seiten, die damit erstellt wurden, brauchen keine Aufmerksamkeit.

## Deine Daten werden automatisch übernommen

Zwanzig Einstellungen, vier Datenbanktabellen – das Provisionsjournal, die Provisionsrichtlinie, die Anbieterberichte und die Warteschlange für Hintergrundaufgaben –, zehn geplante Aufgaben und die benutzerdefinierten Felder der Pro-Inhaltstypen werden durch eine Migration auf die neuen Namen umgestellt. Sie läuft einmalig, sobald nach dem Update zum ersten Mal ein Administrator, WP-CLI oder eine geplante Aufgabe auf die Website zugreift. Nichts wird gelöscht, und nichts muss neu eingegeben werden.

## Aktualisiere zuerst das kostenlose Plugin

Pro hat schon immer angegeben, welche Version von MHM Rentiva es benötigt. Bisher wurde das aber nie geprüft: Der einzige Test fragte, ob das kostenlose Plugin installiert ist, nie, ob es aktuell genug ist.

Jetzt wird es geprüft, und es wird **6.1.1 oder neuer** benötigt. Darunter registriert Pro nichts, rührt keine Daten an und zeigt einen Hinweis mit beiden Versionen an – deshalb ist ein Update in der falschen Reihenfolge auch sicher statt zerstörerisch. Pro wartet einfach. In 5.2.3 führte dieselbe Unstimmigkeit im Anbieter-Panel zu einem fatalen Fehler statt zu einer Meldung.

## Sperrung bedeutet jetzt Sperrung

Hier lagen drei Fehler gleichzeitig vor, und zusammen sorgten sie dafür, dass ein gesperrter Anbieter weniger gesperrt war, als der Bildschirm behauptete.

Ein gesperrter Anbieter **behielt die Möglichkeit, seine eigenen Fahrzeugeinträge zu bearbeiten und zu löschen**. Die Sperrung entzieht die Anbieter-Rolle und setzt diese Einträge auf Entwurf, aber ein Berechtigungsfilter gab Bearbeitungs- und Löschrechte für jedes Fahrzeug zurück, dessen Autor der Aufrufende war. Einschließlich der Buchungshistorie. Der Teil dieses Filters, der Rechte gewährt, fragt jetzt, ob der Anbieter aktiv ist; der Teil, der einschränkt, bleibt genauso weit gefasst wie bisher.

Die Sperrung war außerdem **eine Einbahnstraße**. Sie funktionierte, aber jeder spätere Versuch, sie aufzuheben, schlug mit „Anbieter nicht gefunden“ fehl – dauerhaft –, während der Bildschirm den Anbieter weiterhin als gesperrt auflistete und weiterhin die Schaltfläche anbot. Fünf Endpunkte fragten nach einer Rolle, die durch die Sperrung entfernt wird. Ein Betreiber konnte auch die Stadt oder den Provisionssatz eines gesperrten Anbieters nicht korrigieren.

Und die **ausstehende Anfrage eines gesperrten Anbieters zur Änderung des Bankkontos verschwand** aus dem Tab des Betreibers und aus dessen Zähler, weil auch diese nach Rolle auflisteten. Eine Anfrage, die kurz vor einer Sperrung eingegangen ist, kann jetzt trotzdem bearbeitet werden.

Unabhängig davon übernahmen zwei ältere Formular-Handler eine Benutzer-ID direkt aus der Anfrage und schrieben den Anbieterstatus darauf – auf ein beliebiges Konto gerichtet, konnte man damit einen Fremden als gesperrten Anbieter markieren und alles, was er verfasst hatte, auf Entwurf setzen. Nichts im Plugin erzeugt die Tokens, die diese Handler verlangen, sodass sie in der Praxis nicht erreichbar waren, aber es handelte sich um denselben Vorgang hinter einer schwächeren Sperre als bei den tatsächlich verwendeten Routen. Beide prüfen jetzt das Ziel und lehnen sichtbar ab.

## Fünf Admin-Seiten, die nicht funktionierten

Fünf Pro-Admin-Seiten lasen die Liste der REST-Endpunkte des kostenlosen Plugins, die die eigenen Endpunkte von Pro nicht beschreibt – daher wurde jede dieser Seiten geladen und schlug dann fehl. Pro liefert jetzt eine eigene Zuordnung mit, und eine Prüfung gleicht diese Zuordnung mit den tatsächlich registrierten Routen ab. Zwei weitere Seiten, die bei fehlenden Daten leer blieben, statt einen Fehler anzuzeigen, sind jetzt abgesichert, sodass der Rest der Seite erhalten bleibt.

Auch das Anbieter-Dashboard ist repariert: Ein Anbieter mit gültiger Lizenz wurde als Kunde erkannt, wodurch ihm Navigation und Panel fehlten, und die Finanzzahlen oben zeigten null an, statt aus dem Provisionsjournal zu lesen.

## Du wirst jetzt informiert, wenn es ein neues Pro gibt

Pro wird über wpalemi.com vertrieben und nicht über das WordPress.org-Verzeichnis, daher hatte die WordPress-eigene Update-Prüfung nie etwas dazu zu sagen – und bisher wir auch nicht. Der Plugins-Bildschirm zeigt jetzt eine eigene Zeile von uns an, wenn eine neuere Version verfügbar ist. Sie wird nicht in den Update-Ablauf von WordPress eingebunden; sie informiert dich nur.

## Außerdem behoben

Eine Reihe kostenpflichtiger Funktionen hatte nicht mehr funktioniert, nachdem das kostenlose Plugin Code entfernt hatte, den Pro mitbenutzt hatte: der Kontextbereich für Zusatzleistungen, der Bereich für Fahrzeugzuverlässigkeit und Strafen, die E-Mail-Texte für Nachrichtenbenachrichtigungen, die verschobenen E-Mail-Vorlagen samt aller von dir gespeicherten Überschreibungen, die Attributdefinitionen der kostenpflichtigen Shortcodes, das Premium-Stylesheet für Transfer-Ergebnisse und die Anbieter-Rolle selbst.

Außerdem lud Pro seinen eigenen Übersetzungskatalog nicht, sodass seine türkische Übersetzung nie erschien. Zusatzleistungen, die nur für Transfers gedacht sind, wurden auf der Vermietungsseite angeboten. Die Berichtsseite schrieb eine übersetzte Bezeichnung in das Statusfeld einer Buchung. Und die Datenbankmigrationen laufen jetzt sowohl unter MySQL 8 als auch unter MariaDB.

---

Das vollständige Änderungsprotokoll liegt dem Plugin in beiden Sprachen bei. Wenn du von 5.2.3 aktualisierst, ist alles oben Genannte in der Zwischenzeit passiert.
