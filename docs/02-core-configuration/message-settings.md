---
id: message-settings
title: Message Settings
sidebar_label: Message Settings
sidebar_position: 10
slug: /core-configuration/message-settings
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split, or get Pro at [wpalemi.com/rentiva](https://wpalemi.com/rentiva/).
:::

The Message Settings tab is where you configure the internal chat system between customers and staff, notification preferences, and workflow categories. Access it via **MHM Rentiva > Settings > Message Settings**.

:::important Pro Feature
The messaging system is available as part of the Premium package. Your license must support this feature for the settings to be active.
:::

---

## 🛠️ Management Tools

- **Reset Conversations:** Permanently clears all message history from the database (used for operational cleanup).
- **Reset This Tab:** Restores message settings to their default factory values.

---

## 📂 Settings Tabs

The messaging system is configured under four main headings:

### 1. Notifications
- **Management Email:** The target address for staff alerts (if left blank, the global admin email is used).
- **Outgoing Name:** The sender name displayed in message notification emails (if left blank, the site name is used).
- **Alert staff on new client messages:** Sends staff an email alert when a new customer message arrives.
- **Notify clients on staff replies:** Sends the customer an email when staff replies to a message.

### 2. System Rules
- **Dashboard Visibility:** Enables the message widget on the WordPress Dashboard.
- **Widget Capacity:** Defines how many recent messages are listed on the Dashboard (Default: 5, from 1 to 20).
- **Auto-Responder:** Sends the customer an automatic acknowledgment email when they send a message (off by default).

### 3. Categories
Allows messages to be classified by topic. Default categories are:
- General, Booking, Payment, Technical Support, Complaint, Suggestion.
- *You can rename or delete categories and add new ones with **Add Category**.*

### 4. Workflow Statuses
Used to track the lifecycle of messages:
- Pending, Answered, Closed.
- *The three states are fixed; you can rename how each is displayed. Urgency is set with the message priority (Normal, High, Urgent), not with a status.*

:::note Contact form messages
Messages sent through the website's contact form are a separate list (**MHM Rentiva > Contact Messages**) with their own spam protection; see [Contact form](../03-features-usage/shortcodes/contact.md).
:::

---

### 🖼️ IMAGE: MESSAGE SETTINGS PANEL
*(Settings > Message Settings tab, category and notification management area)*

---

### Section Summary
- Use **Notifications** to maximize your potential for instant responses to customer inquiries.
- Use **Categories** to route incoming requests to the relevant departments (Sales, Support, etc.).
- Use **Workflow** to ensure no customer request goes unanswered.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.5.0 | Field names, categories and the fixed workflow statuses corrected to match the screen; pointer to Contact Messages and spam protection added. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Message Settings documentation created with 4 sub-tabs and category management details. |
