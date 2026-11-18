---
title: Contact form
description: Usage guide and technical reference for the Contact Form module.
sidebar_position: 10
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page describes the Contact Form module as a standard reference, covering both technical and operational aspects.
:::

# 🚗 Contact Form

## Contents
- Usage
- Parameters
- Spam protection
- Reading the messages
- Developer Notes

The Contact Form lets visitors write to you from your site. Each message is stored under **MHM Rentiva > Contact Messages** and e-mailed to you.

## Usage

:::tip IMAGE COMING SOON
A screenshot showing the frontend (visitor-facing) appearance of this module will be added here.
:::

To add this module to any page or post, use the shortcode below:

```shortcode
[rentiva_contact]
```

You can also insert it visually from the Gutenberg block editor by selecting **"MHM Rentiva → Contact Form"**. The Setup Wizard creates a Contact Form page for you.

### Parameters

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `type` | `general` | Form type: `general`, `booking`, `support` or `feedback`. |
| `show_topic_selector` | `1` | Lets the visitor choose the topic. Set to `0` to keep `type` fixed. |
| `title` | empty | Custom title. |
| `description` | empty | Custom description. |
| `show_phone` | `1` | Show the phone field. |
| `show_company` | `0` | Show the company field. |
| `show_vehicle_selector` | `0` | Show a vehicle selector (for booking enquiries). |
| `show_priority` | `0` | Show the priority selector (for support requests). |
| `show_attachment` | `1` | Show the file attachment field. |
| `show_booking_id_field` | `0` | Show the booking number field. |
| `show_company_info` | `1` | Show the contact information box (filled in under **Settings > General > Brand & Contact Information**). |
| `redirect_url` | empty | Page to open after a successful send (same site only). |
| `success_message` | empty | Replaces the default success text. |
| `email_to` | empty | Sends this form's messages to another address instead of the default recipient. |
| `auto_reply` | `1` | Send the visitor an automatic reply. |
| `theme` | `default` | `default`, `compact` or `detailed`. |
| `class` | empty | Extra CSS class. |

## Spam protection

The form needs no set-up and shows the visitor nothing to solve. A message that looks like spam is saved with the **Spam** status and no e-mail or automatic reply goes out; the visitor sees the normal "received" answer, so a bot learns nothing. A message is treated as spam when:

- a hidden trap field is filled in;
- it is sent too soon after the page opened;
- it matches your WordPress **Settings > Discussion > Disallowed Comment Keys** list;
- it holds more links than allowed;
- the same message came from the same address in the last 10 minutes;
- Akismet, if it is installed and has a key, marks it as spam.

Two limits are set under **MHM Rentiva > Settings > General > Brand & Contact Information**:

- **Minimum Seconds Before Sending** (default 3, 0 turns it off): a form or new review sent sooner than this after the page opened counts as a bot.
- **Maximum Links in a Message** (default 3): a message with more links than this goes to Spam. With 0, any link does.

The same section holds **Privacy Notice Consent**: when it is on, senders must tick a privacy notice box before sending.

## Reading the messages

Open **MHM Rentiva > Contact Messages**. Messages are listed as New, Read or Replied; caught messages are under the **Spam** filter, with the reason shown on each one. If a message is not spam, use **Not spam** and it becomes a normal new message (nothing is e-mailed at that point). The type filter offers the same types as the form; Technical support appears only once a message of that type exists. A message sent by a signed-in customer for one of their own bookings shows the selected booking.

## Features

### 📱 Responsive Design
- **Mobile:** Single-column layout.
- **Tablet (under 782px):** Optimized view.
- **Desktop:** Full view at the configured column count or width.

### 🚀 Performance-Focused
- **Conditional Loading:** Static assets are only enqueued on pages where the module is used.
- The form carries a security token, so it is not stored in the HTML page cache.

## Developer Notes

- **HTML Structure:** All containers start with the `.mhm-rentiva-contact-wrapper` class.
- **Customization:** CSS variables (`--mhm-color-primary`, etc.) are inherited from the global `css-variables.css` file.
- **Filters:** `mhmrentiva_contact_min_seconds`, `mhmrentiva_contact_max_links`, `mhmrentiva_contact_spam_reason` and `mhmrentiva_contact_attachment_max_bytes`.

## Section Summary
- The form is spam-protected out of the box; check the **Spam** filter if a message seems missing.

## Changelog
| Date | Version | Note |
|---|---|---|
| 18.11.2026 | 6.4.0 | Spam protection, privacy consent option, spam filter and booking link in Contact Messages; parameter table completed. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.0-docs | Page alphabetized and image placeholder added. |
