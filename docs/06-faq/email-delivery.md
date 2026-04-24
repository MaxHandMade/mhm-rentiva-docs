---
id: email-delivery
title: Email Sending & Delivery Issues
sidebar_label: Email Delivery
sidebar_position: 20
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
MHM Rentiva relies heavily on the email system for booking confirmations and vendor notifications. This page covers how to diagnose and resolve email sending failures.
:::

# 📧 Email Sending & Delivery Issues

System emails (`Mailer::send`) use the default WordPress `wp_mail()` function. Delivery issues are generally related to server configuration or the email service provider.

---

## ❌ 1. Emails Not Sent at All (System Errors)

### Log Check
- **Diagnose:** Check email errors from the Rentiva > System Logs (AdvancedLogger) tab. The `EmailLog` post type records every sending attempt.
- **Fix:** Update your SMTP settings based on the error message returned by the `Mailer` class.

### SMTP Configuration
- **Reason:** The PHP `mail()` function is blocked on many modern servers.
- **Fix:** Configure a SMTP provider (SendGrid, Mailgun, etc.) using a plugin like "WP Mail SMTP" or directly from Rentiva settings.

---

## 📂 2. Emails Landing in Spam

### SPF, DKIM, and DMARC Records
- **Reason:** Your domain's email-sending authorization may not be correctly defined.
- **Fix:** Verify the following records from your DNS settings:
    - **SPF:** Must include the IP address of the email-sending server.
    - **DKIM:** Enables digital signing of emails.
    - **DMARC:** Sets a policy against spoofed emails.

### Sender Address Mismatch
- **Reason:** The "Sender Email" in settings may not match the email on the SMTP account.
- **Fix:** Make the sender address (`From:`) match the authorized SMTP address.

---

## 🕒 3. Delayed Delivery & Queue Issues

### WordPress Cron (WP-Cron) Status
- **Reason:** The system processes bulk emails or delayed notifications through WP-Cron. If your site receives no traffic, Cron may not run.
- **Fix:** Set up a real server-side Cron job to trigger `wp-cron.php` every minute.

### Service Provider Limits
- **Reason:** Shared hosting plans may enforce hourly email limits.
- **Fix:** Check your limits or switch to a professional email delivery service.

---

## 🛠️ 4. Test Mode & Debugging

### Email Test Mode
- **Check:** If the `mhm_rentiva_email_test_mode` setting is enabled, emails are only logged to `AdvancedLogger` instead of being sent to real recipients.
- **Fix:** Make sure test mode is off before going live.

### Template Errors
- **Reason:** If a custom HTML template (`EmailTemplates`) is used, faulty PHP code can stop delivery.
- **Fix:** Test sending using the default template.

## Checklist
1. Check the `EmailLog` post type.
2. Test the SMTP connection.
3. Verify domain DNS records (SPF/DKIM).
4. Confirm test mode is disabled.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | SMTP, DNS (SPF/DKIM), and Test Mode details added. |
