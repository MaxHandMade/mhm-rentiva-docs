---
id: messages-rest-endpoints
title: Messaging and Communication API (Messages REST)
sidebar_label: Messaging REST
sidebar_position: 70
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
The Messaging API describes the endpoints used to manage communication between customers, vendors, and system administrators.
:::

# 💬 Messaging and Communication API

The Rentiva messaging system is built on an asynchronous "Thread" architecture. All endpoints use the `Messages` service class and `MessageFormatter` helpers.

---

## 🏗️ 1. Module Architecture

Registration point: `MHMRentiva\Admin\Messages\REST\Messages::register()`

The system serves through two main namespaces:
- **Admin Endpoints:** `/v1/admin/messages/*`
- **Customer/Vendor Endpoints:** `/v1/portal/messages/*`

---

## 👨‍💼 2. Admin Endpoints

The section where system administrators monitor and respond to all communication traffic.

| Endpoint | Method | Function |
|---|---|---|
| `/admin/messages` | `GET` | Lists all message threads. |
| `/admin/messages/{id}` | `GET` | Returns the full message history for a specific thread. |
| `/admin/messages/{id}/reply` | `POST` | Sends a reply to the thread on behalf of the administrator. |
| `/admin/messages/{id}/status`| `PUT` | Marks the thread as "Closed" or "Resolved". |

---

## 👤 3. Customer and Vendor Endpoints

The section where users communicate with each other or with the support team.

| Endpoint | Method | Function |
|---|---|---|
| `/portal/messages/create` | `POST` | Starts a new message thread. |
| `/portal/messages/threads` | `GET` | Lists active threads the user is part of. |
| `/portal/messages/reply` | `POST` | Adds a new message to an existing thread. |

---

## 🛡️ 4. Permission and Security (Ownership)

The messaging system applies **Ownership** control beyond authentication:

1. **Ownership Check:** Before fetching a thread's messages, `Messages::verify_access()` verifies that the requesting user is a party to that thread (Sender or Recipient).
2. **Role Verification:** Admin endpoints are only accessible to users with the `manage_options` capability.
3. **Content Sanitization:** All message content is sanitized with `wp_kses()` to remove harmful HTML tags before being saved.

---

## 📤 5. Response Example (Formatted Message)

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

## Section Summary
- The Messaging API provides a thread-based communication model.
- Admin and portal/customer responsibilities are separated by clear boundaries.
- Data security and privacy are maintained at the highest level via the `verify_access()` layer.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Thread architecture, Ownership control, and formatted response structure added. |
