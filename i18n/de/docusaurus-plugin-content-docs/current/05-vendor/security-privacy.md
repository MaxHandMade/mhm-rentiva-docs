---
id: security-privacy
title: "Sicherheits- und Datenschutzarchitektur für Anbieter"
sidebar_label: "Sicherheit & Datenschutz"
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro-Funktion
Diese Seite dokumentiert eine Funktion des Add-ons **MHM Rentiva Pro**. Sie ist nicht Teil der kostenlosen
Lite-Edition auf WordPress.org und erfordert, dass Pro zusammen mit Lite installiert ist, sowie eine gültige Lizenz.
Die vollständige Aufteilung findest du unter [Editionen — Lite vs. Pro](/docs/), Pro erhältst du unter [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

:::info Zweck
MHM Rentiva nutzt eine mehrschichtige Sicherheitsarchitektur (Defense-in-Depth), um die Finanzdaten und persönlichen Informationen der Anbieter zu schützen. Diese Seite erklärt Verschlüsselungsmethoden, Datenisolierung und Mechanismen für das Audit-Protokoll.
:::

# 🛡️ Sicherheits- und Datenschutzebenen

Anbieterdaten werden durch vier Hauptebenen geschützt – von der Datenbankebene bis zur Anwendungsoberfläche.

---

## 🔒 1. Verschlüsselung von Finanzdaten (IBAN-Sicherheit)

Die IBAN-Daten der Anbieter werden niemals als Klartext in der Datenbank gespeichert.

### AES-256-CBC-Verschlüsselung
- **Algorithmus:** Branchenstandard `AES-256-CBC`.
- **Schlüsselverwaltung:** Die Schlüssel werden aus den WordPress-Konstanten `AUTH_KEY` und `SECURE_AUTH_SALT` abgeleitet.
- **Fail-Safe:** Ist die Verschlüsselungsbibliothek (OpenSSL) nicht verfügbar, gibt das System einen leeren Wert zurück und bricht das Speichern ab, um ein Datenleck zu verhindern.

```php
// VendorApplicationManager::encrypt_iban();
// Encrypted data is stored using base64_encode().
```

:::warning Kritische Warnung
Wenn du die Sicherheitsschlüssel in `wp-config.php` änderst, werden alle vorhandenen verschlüsselten IBAN-Daten unlesbar. Diese Schlüssel müssen immer gesichert werden.
:::

---

## 🚦 2. Freigabe von Änderungen an hochkritischen Feldern

Änderungen des Anbieters an kritischen Feldern wie der IBAN werden nicht sofort wirksam – stattdessen wird ein **Admin-Freigabeprozess** ausgelöst.

### Ablauf einer IBAN-Änderung
1. **Anfrage:** Der Anbieter gibt eine neue IBAN ein.
2. **Zwischenspeicherung:** Die neue IBAN wird verschlüsselt und im Meta-Feld `_mhmrentiva_pending_iban` gespeichert.
3. **Admin-Benachrichtigung:** Im Admin-Bereich erscheint ein Zähler-Badge.
4. **Genehmigen/Ablehnen:** Genehmigt der Admin die Änderung, wird die temporäre IBAN in das Haupt-IBAN-Feld übernommen. Bei Ablehnung werden die temporären Daten gelöscht und der Anbieter erhält eine E-Mail.

---

## 📁 3. Daten- und Medienisolierung

Anbieter können nicht auf die Daten oder Mediendateien anderer Benutzer zugreifen.

- **Medienisolierung:** Der Filter `ajax_query_attachments_args` beschränkt Anbieter darauf, nur die von ihnen selbst hochgeladenen Bilder zu sehen.
- **Dashboard-Isolierung:** Die Klasse `VendorOwnershipEnforcer` fügt allen Datenbankabfragen automatisch einen `post_author`-Filter hinzu und verhindert so unbefugten Zugriff.

---

## 📝 4. Audit-Protokoll

Alle kritischen Sicherheitsereignisse werden über `AdvancedLogger` protokolliert.

| Ereignis | Inhalt | Stufe |
|---|---|---|
| IBAN-Änderung | „Anbieter #X hat eine IBAN-Änderung angefordert.“ | `INFO` |
| Anmeldeversuch | Fehlgeschlagene Anmeldeversuche am Anbieter-Dashboard. | `WARNING` |
| Freigabe einer Auszahlung | „Admin #Y hat eine Auszahlung für Anbieter #X genehmigt.“ | `CRITICAL` |

Die Protokolle können im Bereich **System Logs** des Admin-Bereichs überwacht werden und werden anhand der Einstellung `mhmrentiva_log_retention_days` automatisch bereinigt.

---

## ⚙️ 5. Technische Sicherheitsübersicht

| Mechanismus | Schutzart | Detail |
|---|---|---|
| **Nonce (CSRF)** | Formularsicherheit | Eindeutiges Token für jeden AJAX- und Formularvorgang. |
| **Capability** | Autorisierung | Zugriff außerhalb der Rolle `rentiva_vendor` wird blockiert. |
| **Maskierung** | Datenschutz | In der Oberfläche werden nur die letzten 4 Ziffern der IBAN angezeigt. |

## Zusammenfassung des Abschnitts
- IBAN-Daten werden mit `AES-256-CBC` verschlüsselt gespeichert.
- Kritische Änderungen unterliegen der Freigabe durch einen Admin.
- Eine mehrschichtige Isolierung hält die Daten der Anbieter voneinander getrennt.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Details zu Datenverschlüsselung, IBAN-Freigabeprozess und Medienisolierung hinzugefügt. |
