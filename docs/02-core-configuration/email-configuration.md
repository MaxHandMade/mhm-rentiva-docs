---
id: email-configuration
title: Email Configuration
sidebar_label: Email Configuration
sidebar_position: 8
slug: /core-configuration/email-configuration
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

The Email Configuration tab is where you define the sender identity, design details, and delivery modes of automated notifications sent by the system. Access it via **MHM Rentiva > Settings > Email Configuration**.

:::info WooCommerce Integration
When WooCommerce is installed, primary transactional emails (order confirmations, etc.) are managed through WooCommerce. The settings here apply to plugin-specific internal notifications (admin alerts, custom customer messages, etc.).
:::

---

## 📧 Sender & Design Settings

Define how emails appear to customers:

- **Sender Name:** The name shown in the "From" field of emails (e.g., Rentiva Fleet).
- **Sender Email:** The address emails are sent from (e.g., info@site.com).
- **Reply-To Address:** The address where replies go when a customer responds to an email.
- **Primary Color:** Sets the button, heading, and accent colors in email templates.
- **Footer Text:** The copyright and contact note that appears at the bottom of all emails.

---

## 🛠️ Delivery & Testing Tools

- **Send Test Connection Email:** Sends you an instant test message to verify your configuration is working correctly.
- **Enable Outgoing Emails:** Toggles the system's permission to send automated emails.
- **Production Sandbox (Test Mode):** When active, no emails are delivered to customers — all messages are redirected to the designated "Test Email Address".

---

## ⚙️ Advanced Technical Settings

- **Template Override Path:** The folder path used when you want to customize email designs through your theme (Default: `mhm-rentiva/emails/`).
- **Async Background Sending:** Queues emails in the background (asynchronously) to avoid affecting page load speed.
- **Communication Logs:** Stores a copy of all sent emails in the database.
- **Log Retention Period:** Defines how many days before records are automatically deleted (e.g., 30 Days).

---

### 🖼️ IMAGE: EMAIL CONFIGURATION PANEL
*(Settings > Email Configuration tab, sender and log settings area)*

---

### Section Summary
- Set the sender name and colors to match your **Brand Identity**.
- Use **Test Mode** to safely verify notifications before going live.
- Use **Background Sending** to maintain your site's performance.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Email Configuration documentation created based on panel screenshot and code analysis. |
