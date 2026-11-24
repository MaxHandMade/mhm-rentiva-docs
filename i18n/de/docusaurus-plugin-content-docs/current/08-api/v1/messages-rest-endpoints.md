---
id: messages-rest-endpoints
title: "Nachrichten- und Kommunikations-API (Messages REST)"
sidebar_label: "Nachrichten-REST"
sidebar_position: 70
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Zweck
Die Nachrichten-API beschreibt die Endpunkte, mit denen die Kommunikation zwischen Kunden, Anbietern und Systemadministratoren verwaltet wird.
:::

# 💬 Nachrichten- und Kommunikations-API

Das Nachrichtensystem von Rentiva basiert auf einer asynchronen „Thread“-Architektur. Alle Endpunkte verwenden die Service-Klasse `Messages` und die Helfer `MessageFormatter`.

---

## 🏗️ 1. Modularchitektur

Registrierungspunkt: `MHMRentiva\Admin\Messages\REST\Messages::register()`

Das System stellt seine Dienste über zwei Haupt-Namespaces bereit:
- **Admin-Endpunkte:** `/v1/admin/messages/*`
- **Kunden-/Anbieter-Endpunkte:** `/v1/portal/messages/*`

---

## 👨‍💼 2. Admin-Endpunkte

Der Bereich, in dem Systemadministratoren den gesamten Kommunikationsverkehr überwachen und darauf antworten.

| Endpunkt | Methode | Funktion |
|---|---|---|
| `/admin/messages` | `GET` | Listet alle Nachrichten-Threads auf. |
| `/admin/messages/{id}` | `GET` | Gibt den vollständigen Nachrichtenverlauf eines bestimmten Threads zurück. |
| `/admin/messages/{id}/reply` | `POST` | Sendet im Namen des Administrators eine Antwort an den Thread. |
| `/admin/messages/{id}/status`| `PUT` | Markiert den Thread als „Geschlossen“ oder „Erledigt“. |

---

## 👤 3. Kunden- und Anbieter-Endpunkte

Der Bereich, in dem Benutzer miteinander oder mit dem Support-Team kommunizieren.

| Endpunkt | Methode | Funktion |
|---|---|---|
| `/portal/messages/create` | `POST` | Startet einen neuen Nachrichten-Thread. |
| `/portal/messages/threads` | `GET` | Listet die aktiven Threads auf, an denen der Benutzer beteiligt ist. |
| `/portal/messages/reply` | `POST` | Fügt einem bestehenden Thread eine neue Nachricht hinzu. |

---

## 🛡️ 4. Berechtigung und Sicherheit (Eigentümerschaft)

Das Nachrichtensystem wendet über die Authentifizierung hinaus eine **Eigentümerschafts**-Prüfung an:

1. **Eigentümerschaftsprüfung:** Bevor die Nachrichten eines Threads abgerufen werden, prüft `Messages::verify_access()`, ob der anfragende Benutzer an diesem Thread beteiligt ist (Absender oder Empfänger).
2. **Rollenprüfung:** Admin-Endpunkte sind nur für Benutzer mit der Berechtigung `manage_options` zugänglich.
3. **Bereinigung der Inhalte:** Alle Nachrichteninhalte werden vor dem Speichern mit `wp_kses()` bereinigt, um schädliche HTML-Tags zu entfernen.

---

## 📤 5. Antwortbeispiel (formatierte Nachricht)

```json
{
  "success": true,
  "data": {
    "thread_id": 45,
    "subject": "Regarding Vehicle Booking",
    "messages": [
      {
        "author_name": "Ahmet Y.",
        "content": "Is a child seat available in the vehicle?",
        "created_at": "2026-03-19 14:30:00",
        "is_read": true
      }
    ]
  }
}
```

## Zusammenfassung des Abschnitts
- Die Nachrichten-API bietet ein Thread-basiertes Kommunikationsmodell.
- Die Zuständigkeiten von Admin und Portal/Kunden sind klar voneinander abgegrenzt.
- Datensicherheit und Datenschutz werden über die Schicht `verify_access()` auf höchstem Niveau gewährleistet.

## Änderungsprotokoll
| Datum | Version | Hinweis |
|---|---|---|
| 23.04.2026 | 4.27.2 | Englische Übersetzung hinzugefügt. |
| 19.03.2026 | 4.21.2 | Thread-Architektur, Eigentümerschaftsprüfung und formatierte Antwortstruktur hinzugefügt. |
