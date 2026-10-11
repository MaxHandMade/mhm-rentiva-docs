---
slug: rentiva-pro-v6.3.0-release
title: "Rentiva Pro 6.3.0 — Vendor IBANs and documents encrypted at rest, messages rebuilt as conversations, and every vendor setting in one place"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, security, messages, admin]
date: 2026-10-11T06:30
---

6.3.0 protects what vendors hand over: IBANs, identity documents and vehicle documents are encrypted and kept out of the media library. Messages are rebuilt as conversations, and Vendor Management gets a vendor detail page and one home for every vendor setting. **Update MHM Rentiva (Lite) to 6.2.0 first, then Pro.** Rentiva Pro 6.1.0 or older stops with an error on the vendor panel beside Rentiva 6.2.0, so do the two updates back to back.

<!--truncate-->

## Vendor IBANs and documents are encrypted at rest

- **IBANs and identity documents** (ID, driving licence, proof of address) are encrypted and stored outside the media library. Documents are accepted as JPG, PNG or PDF only and are checked for type and size. Administrators reveal an IBAN with Show / Copy / Hide and open documents through routes that record who looked; payout statements show a masked IBAN.
- **Vehicle registration and insurance documents** leave the public media library too. The vehicle edit screen has a Vehicle Documents box with a recorded viewer, and the administrator gets an e-mail when a vendor renews a document.
- **On update, existing IBANs and documents are converted, and the old document attachments are deleted from the media library once they have been copied** to the encrypted store. Gallery or cover entries that pointed at such a file are removed.

**Recommended:** without further setup the encryption keys come from the WordPress keys in `wp-config.php`, so changing those keys makes stored IBANs and documents unreadable. Define `MHM_RENTIVA_SENSITIVE_KEY` in `wp-config.php` to give the data a key of its own — an admin notice recommends it, explains where it goes and prints a ready `define()` line with a fresh key.

:::caution Known limitation
A vendor whose IBAN could not be read after the update — for example because the WordPress keys in `wp-config.php` were changed after the vendor was approved — **cannot request a payout until the IBAN is entered again, and 6.3.0 has no form for entering it.** The admin notice names and links each such vendor.
:::

## Messages, rebuilt as conversations

A conversation is one first message plus its replies. There is a new admin inbox and thread view — priority, last activity, customer, status and related booking — with side cards that fold and remember their state. Customers see only their own conversations, as plain text. The e-mail rules are clear: a status e-mail only for an administrator's single change, exactly one e-mail per administrator reply, none for bulk actions or the update, and an auto-reply only for a new conversation. Messages have their own permissions. Existing messages are converted once, on update, without sending e-mail. Messages e-mail notifications can now really be switched off.

## Vendor management

- **A vendor detail page:** figures, contact (city editable), payment and tax with the audited IBAN reveal, the approved application and its documents, reliability and badge, the effective commission and where it comes from, bookings and reviews on the vendor's vehicles, and suspend / reactivate.
- **Vendor Management opens on Active Vendors**, with e-mail, city, vehicle count, effective commission and rating per vendor, a counters strip, and a "Revenue by city" card. Approve, reject, IBAN and suspend actions confirm inside the page instead of a browser pop-up. An application is refused unless its three documents are attached.
- **Every vendor setting moves to Plugin Settings > Vendor Marketplace**, and Vendor Management loses its Settings tab. A new "Accept new vendor applications" switch is on by default. The listing-fee settings are now actually saved. The eight loose vendor options move there on update.
- On Rentiva's **Customers** screen, vendors carry a "Vendor" or "Suspended vendor" badge, and the **Bookings** screen gains a Vendor filter and column.

## Fixes

- **A fresh install with no commission rate saved no longer breaks WooCommerce payments, completions and refunds.** The commission is held with an order note and written at the rate saved later; an admin notice shows how many are held.
- One pending vendor application no longer empties the dashboard of every other logged-in customer.
- Vendor e-mails (13 templates and the payout statement) link to the matching section of the Vendor Panel instead of sending vendors back to My Account.
- Customer, vehicle and revenue reports count only completed and confirmed bookings, and simultaneous global-rate changes no longer overwrite each other.
- All six Pro Elementor widgets apply the settings saved in them, and settings that were saved but ignored now apply — for example Transfer Search's "Vertical" layout and Popular Routes' origin type filter, which now lists your stored location types. Settings that never did anything were removed from the Messages block, Transfer Results, Transfer Search and Popular Routes.

## For developers

Removed: the `mhmrentiva_message_read` action, the `mhmrentiva_account_vendor_panel` filter, the old message form handlers and methods such as `Message::mark_as_read()`, `VendorApplicationManager::encrypt_iban()` / `decrypt_iban()`, and the REST routes `GET/POST /vendors/settings`. `mhmrentiva_message_status_changed` now passes the conversation's first message id and `array( 'actor' => … )`. **Stored IBANs change format:** code reading the IBAN meta directly stops working. Five database steps run once on update.

---

**Where to get it.** Pro 6.3.0 is published on GitHub as `v6.3.0` and served through the Rentiva Pro download on wpalemi.com. Update [Rentiva to 6.2.0](/blog/rentiva-v6.2.0-release) first. The full changelog ships with the plugin in both languages.
