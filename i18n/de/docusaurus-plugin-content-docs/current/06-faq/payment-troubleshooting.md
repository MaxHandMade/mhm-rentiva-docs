---
id: payment-troubleshooting
title: "Fehlerbehebung bei Zahlungen und Finanzen"
sidebar_label: "Zahlungsprobleme"
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Eine technische Anleitung zur Diagnose und Behebung von Abweichungen zwischen Zahlungsprozessen (WooCommerce, iyzico, Stripe usw.) und dem Finanz-Ledger.
:::

# 💳 Fehlerbehebung bei Zahlungen und Finanzen

Zahlungsfehler entstehen in der Regel durch API-Verbindungen, Status-Zuordnungen oder Datenbanksperren.

---

## 🛑 1. Häufige Fehlercodes und Lösungen

### HTTP 400 / 401 (Bad Request / Unauthorized)
- **Grund:** API-Schlüssel (Public/Private Key) falsch eingegeben oder Test-/Live-Modus stimmen nicht überein.
- **Lösung:** Prüfe die Schlüssel und den „Betriebsmodus“ im Tab Rentiva > Zahlungseinstellungen.

### HTTP 403 (Access Denied)
- **Grund:** Die IP-Adressen des Zahlungsanbieters werden möglicherweise von der Server-Firewall (WAF/Cloudflare) blockiert.
- **Lösung:** Setze die IP-Bereiche des Zahlungsanbieters (z. B. iyzico, Stripe) auf die Whitelist.

### HTTP 500 (Server Error)
- **Grund:** Ein PHP-Fehler oder Datenbankkonflikt während des Callback-Vorgangs.
- **Lösung:** Untersuche die Datei `wp-content/debug.log` und debugge Fehler in der Methode `WooCommerceBridge::handle_webhook()`.

---

## 🔄 2. Probleme bei der Status-Zuordnung

### Zahlung „Abgeschlossen“, aber Buchung noch „Ausstehend“?
- **Prüfen:** Stelle sicher, dass der WooCommerce-Bestellstatus `processing` oder `completed` ist.
- **Technisches Detail:** Rentiva reagiert auf die WooCommerce-Status-Hooks (`woocommerce_order_status_changed`). Wenn die automatische Auslösung nicht erfolgt, liegt möglicherweise ein Plugin-Konflikt vor.
- **Lösung:** Aktualisiere die Bestellung manuell und teste, ob sich der Rentiva-Status synchronisiert.

---

## 📖 3. Ledger-Inkonsistenzen

### Versuche doppelter Ausgaben (Double-Spending)
- **Situation:** Eine Auszahlungsanfrage erscheint als genehmigt, aber das Guthaben wurde nicht verringert.
- **Grund:** `AtomicPayoutService` ist möglicherweise an einer Transaktionssperre hängen geblieben.
- **Lösung:** Prüfe per SQL, ob in der Tabelle `mhmrentiva_ledger` ein Eintrag mit der betreffenden `UUID` vorhanden ist.

### Provisionsgutschrift nicht erstellt?
- **Grund:** Die Provisions-Engine (`CommissionEngine`) verarbeitet nur Buchungen im Status `completed` (Fahrt beendet).
- **Lösung:** Vergewissere dich, dass die Buchung tatsächlich beendet ist und ihr Status `completed` ist.

---

## 🛠️ 4. API-Verbindungstest (Idempotenz)

Bei allen API-Aufrufen wird ein `idempotency`-Schlüssel verwendet:
- **Diagnose:** Es wird verhindert, dass dieselbe Zahlungsanfrage mehrfach gesendet wird.
- **Lösung:** Wenn du einen Callback-Fehler erhältst, suche in `AdvancedLogger` nach dem `transaction_id`-Wert des Zahlungsanbieters und prüfe, ob ein doppelter Eintrag vorhanden ist.

## 🙋 5. Warenkorb, Zahlungsseite und Gäste: Häufige Fragen

### Warum sieht mein Warenkorb oder meine Zahlungsseite „klassisch“ aus, obwohl ich den Warenkorb-/Kasse-Block verwende?
Solange sich eine Miete im Warenkorb befindet, zeigt Rentiva den klassischen Warenkorb von WooCommerce und die klassische Zahlungsseite an, damit die Buchungsschritte, die Anzahlung und der Restbetrag erscheinen. Ein Warenkorb, der nur Shop-Produkte enthält, behält den Warenkorb-Block. Um den Warenkorb-Block beizubehalten, deaktiviere **Klassische Warenkorb-Seite** unter MHM Rentiva > Einstellungen > Tab „Zahlung“; siehe [Zahlungseinstellungen](../02-core-configuration/payments.md).

### Warum gibt es bei einer Miete keine „Nachnahme“?
Sie wird bei einer Buchung nie angeboten: Eine an der Haustür bezahlte Anzahlung ist keine Anzahlung, und der Restbetrag wird ohnehin bei der Abholung bezahlt. Reine Shop-Bestellungen behalten sie. Wenn Nachnahme deine einzige aktivierte Zahlungsart ist, aktiviere Karte oder Banküberweisung unter WooCommerce > Einstellungen > Zahlungen. Falls sie trotzdem gewählt wird (zum Beispiel im Kasse-Block bei deaktivierter Einstellung für den klassischen Warenkorb), wird sie zwar angezeigt, bei Auswahl aber abgelehnt mit „Nachnahme ist für eine Buchung nicht verfügbar. Bitte wähle eine andere Zahlungsart.“

### Warum gibt es im Warenkorb zwei Zeilen für dasselbe Fahrzeug, oder warum hat sich eine Zeile geändert?
Wird dasselbe Fahrzeug erneut für sich überschneidende Daten gewählt (zum Beispiel nach dem Zurück-Button des Browsers), ersetzt dies die frühere Zeile, und der Kunde erhält den Hinweis „Dein Warenkorb enthielt bereits ... Er enthält jetzt deine neueste Auswahl“. Der Betrag wird nicht verdoppelt. Ein anderes Fahrzeug oder direkt aufeinanderfolgende Daten bleiben getrennte Zeilen. Enthält ein Warenkorb dennoch dasselbe Fahrzeug zweimal für sich überschneidende Daten, zeigt die Zahlungsseite „Dein Warenkorb enthält ... mehr als einmal für sich überschneidende Daten. Entferne die zusätzliche Zeile, um fortzufahren.“ an, und der Kunde entfernt die zusätzliche Zeile.

### Ein Kunde sagt, das Fahrzeug sei bei der Zahlung nicht mehr verfügbar gewesen.
Ein anderer Kunde hat diese Daten zuerst gebucht. Der Kunde sieht eine Meldung, dass das Fahrzeug für die Daten nicht mehr verfügbar ist, und auf der Warenkorb-Seite wird die Zeile mit dieser Begründung entfernt. Er kann andere Daten oder ein anderes Fahrzeug wählen.

### Auf einem Button steht „Verstanden, nicht mehr anzeigen“. Was bewirkt er?
Er blendet den Hinweis zu blockbasierten Warenkorb- oder Zahlungsseiten nur für dich aus; andere Administratoren sehen ihn weiterhin. Der Hinweis erscheint nur auf Rentiva-Bildschirmen und auf der Plugins-Seite.

### Der Kunde ist ein Gast. Wie sieht er seine Reservierung?
Auf der Zahlungsseite sieht ein Gast das WooCommerce-Feld **Ein Kundenkonto anlegen?**, solange sich eine Miete im Warenkorb befindet. Legt er ein Konto an, erscheint die Buchung unter **Mein Konto**. Ohne Konto gibt es für ihn keine Seite „Mein Konto“; die Danke-Seite und die E-Mails enthalten die Buchungsdetails.

## Checkliste
1. Gültigkeit der API-Schlüssel (Test vs. Live).
2. Blockierungen durch die Firewall (WAF).
3. Korrektheit der Webhook-/Callback-URL.
4. Synchronisierung des WooCommerce-Status.
5. Für Mieten ist eine andere Zahlungsart als Nachnahme aktiviert.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 18.11.2026 | 6.4.0 | Fragen zu Warenkorb, Zahlungsseite und Gästen hinzugefügt. |
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | API-Fehlercodes, Status-Zuordnung und Details zur Ledger-Konsistenz hinzugefügt. |
