---
id: messages
title: Messaging System
sidebar_position: 12
slug: /features-usage/messages
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Messaging System is a centralized support channel that lets you communicate directly and securely with your customers before or after a rental. Manage all incoming requests via **MHM Rentiva > Messages**.

---

## 📩 Message List and Filtering

The inbox is organized by urgency and type of request. The list includes the following main columns:

- **Subject & Labels:** New (NEW) messages are highlighted with an orange label.
- **Priority:** Urgency level set to "Low", "Normal", or "High".
- **Category:** The topic of the message (General, Support, Booking Issue, etc.).
- **Status:** Status tracking as "Pending", "Replied", or "Closed".

---

## 💬 Communication and Reply Flow

Clicking a message opens a detail page that presents the dialogue with the customer in a thread structure:

1.  **Customer Identity:** The username and email address of the sender appear at the top.
2.  **Message Content:** The actual text sent by the customer and the send time (e.g. "3 weeks ago").
3.  **Reply Button:** Allows you to instantly write a reply to the customer from the admin panel.

<div style={{ border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', background: '#f9fafb', marginBottom: '20px' }}>
  <strong>📸 IMAGE: MESSAGE DETAILS AND REPLY FLOW</strong><br/>
  <em>mhm-rentiva-message-details-reply</em>
</div>

---

## ⚙️ Technical Management and Booking Association

The message editing screen has a critical feature for maintaining operational context: **Booking Association.**

- **Category and Status Change:** The admin can manually update the message type and its status (e.g. from Pending to Replied).
- **Booking Mapping:** You can link an incoming message to an existing booking number (such as #3037). This way, when you view the booking details, you can see all historical correspondence related to that transaction.

---

### Section Summary
- Organize support requests with **Message Filtering**.
- Improve customer satisfaction with **Reply Flow**.
- Match communication history with operational data using **Booking Association**.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 19.03.2026 | 4.21.2 | Message documentation updated with reply flow and booking association features against the real interface. |
| 26.02.2026 | 4.21.0 | Initial version created. |
