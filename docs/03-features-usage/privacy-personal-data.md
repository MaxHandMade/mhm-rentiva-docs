---
id: privacy-personal-data
title: Privacy and Personal Data
sidebar_label: Privacy and Personal Data
sidebar_position: 17
slug: /features-usage/privacy-personal-data
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-usage_guide-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva plugs into WordPress's own personal data tools. When a customer asks what you hold about them, or asks you to erase it, you handle the request from **Tools > Export Personal Data** and **Tools > Erase Personal Data**, and Rentiva adds its data to both. It also adds a ready-made section to your privacy policy guide.

> Parts marked **(Pro)** need **MHM Rentiva Pro**. They keep working after a license ends, because the data and the customer's rights over it remain.

---

## Export Personal Data

Enter the customer's e-mail address; the export gathers the following (WordPress's own tools export the WordPress account and WooCommerce's the billing fields):

| Group | What is included |
| :--- | :--- |
| **MHM Rentiva bookings** | Every booking of the person, guest bookings included (matched by e-mail address): number, status, vehicle, pick-up and return dates, name, e-mail, phone, notes, total, payment status, cancellation and refund details, payment receipt link and note, the **Rental agreement accepted** line (date and text version) and the booking's history notes, staff notes included. Who cancelled it and the internal action log are left out. |
| **MHM Rentiva contact messages** | Date, type, name, e-mail, phone, company, message, consent, IP address, browser and attachment name. |
| **MHM Rentiva e-mail log** | Date and subject of the e-mails sent. |
| **MHM Rentiva account details** | Phone, address, favourite vehicles, vehicles to compare, last login and activity, and the notification choices (welcome e-mail, booking notifications, marketing e-mails). |
| **MHM Rentiva Pro messages (Pro)** | The person's message conversations. |
| **MHM Rentiva Pro vendor data (Pro)** | Vendor profile, every application, every payout (rejected ones included, with their status) and the reports, page by page. The bank account (IBAN) appears as its **last 4 digits only**. |
| **MHM Rentiva Pro consent records (Pro)** | When privacy consent was given or withdrawn. |

---

## Erase Personal Data

The erasure follows these rules:

- **Bookings:** completed, cancelled, refunded and no-show bookings are **anonymised**: name, contact details and notes are removed; the date, vehicle and amount stay for your accounts, and the copy on the linked WooCommerce order line is anonymised too. Bookings that are pending, confirmed or in progress are **kept** and listed in the result, because a running rental still needs someone to reach. Run the erasure again once they end. If a booking cannot be fully anonymised the result says so; run it again in 15 minutes.
- **Contact messages, e-mail log and application log:** deleted.
- **Account details:** Rentiva's account details are deleted. The WordPress user account is **not** deleted; delete it from **Users** if you need to. If the customer had switched an e-mail notification **off**, that choice is kept so the deleted account does not start receiving e-mails again.
- **Linked WooCommerce orders** keep their billing details according to your WooCommerce privacy setting.
- **Messages (Pro):** the person's conversations are deleted completely, your replies included.
- **Vendor data (Pro):** applications, payouts, the ledger and reports are **kept** for legal retention, and the result says so.
- **Consent records (Pro):** erased. The result also reminds you that copies in report caches are refreshed within 24 hours.

---

## Policy guide text

Under **Settings > Privacy** (the policy guide) Rentiva adds two suggestions that you copy into your own privacy policy. Keep what applies to your site and adjust the retention periods:

- **MHM Rentiva:** sections for **Bookings**, **Contact form**, **E-mails and logs** and **Your account**, plus a reminder that database backups made with Rentiva's database tools contain this data and are not changed by an erasure request: delete old backups yourself.
- **MHM Rentiva Pro (Pro):** sections for **Messages**, **Vendors** and **Consent**, plus a reminder that report caches hold copies of customer names and e-mail addresses for up to 24 hours, that report CSV files saved in `uploads/mhm-rentiva-exports/` are not deleted automatically (delete them when you no longer need them), and that the administrator audit log, which records which staff member viewed bank or document details, is kept.

---

## My Account privacy controls (Pro)

Customers see these in **My Account**:

- **Privacy consent card:** while the customer has not given consent, a card with **Accept** and **Decline** appears at the top of the My Account dashboard, inside the page. It is not a pop-up over other pages any more.
- **Privacy Controls** section: **Request Data Export**, **Request Data Erasure** and, only after the customer has given consent, **Withdraw Consent**.

**Request Data Export** and **Request Data Erasure** open a standard WordPress request that the customer confirms by e-mail (a new confirmation e-mail can be sent every 10 minutes). Once confirmed, you process the request from the **Tools** screens above. The consent shown on the card is the same answer the booking form's consent check reads.

:::info Changed in 6.4.0
The personal data export and erasure, the policy guide text and the My Account requests are new in 6.4.0. **Withdraw Consent** now appears only after the customer has given consent, and the consent card sits on top of the My Account dashboard instead of opening in a box over the page.
:::

---

### Section Summary
- Use **Tools > Export / Erase Personal Data**; Rentiva adds bookings, contact messages, e-mail log, account details and the application log (erase only). Pro adds messages, vendor data and consent records.
- Closed bookings are anonymised, running ones are kept.
- Copy the policy guide sections into your privacy policy.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 18.11.2026 | 6.4.0 / Pro 6.5.0 | Page created: personal data export and erasure, policy guide text, My Account privacy controls. |
