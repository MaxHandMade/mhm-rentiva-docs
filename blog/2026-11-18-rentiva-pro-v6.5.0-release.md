---
slug: rentiva-pro-v6.5.0-release
title: "Rentiva Pro 6.5.0 — Commission credited to the right vendor, privacy requests by e-mail, a working vendor agreement and reports in the site timezone"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, privacy, security]
date: 2026-11-18T22:30
---

6.5.0 fixes how vendor money, cancellations and personal data are handled. Commission now goes to the vendor who owns the booked vehicle; before, it could go to the customer who made the booking. A refund only reverses a commission that was actually credited. Messages, vendor data and consent records now appear in the WordPress privacy tools, and the My Account "Request Data Export" and "Request Data Erasure" buttons start a privacy request confirmed by e-mail. Switching on "Require vendor agreement" now always shows an agreement, with a starting template when the text is empty. Reports and vendor analytics follow the site timezone. **Pro 6.5.0 requires WordPress 7.0 or newer and Rentiva (Lite) 6.4.0 or newer: update Lite first, then Pro.**

<!--truncate-->

:::caution Commission rows written before this update are not corrected
Commission now goes to the owner of the booked vehicle, and the site's own vehicles write no commission row. Rows written before this update are not corrected.
:::

:::caution The My Account privacy buttons no longer act at once
"Request Data Export" and "Request Data Erasure" now open a WordPress privacy request that the customer confirms by e-mail. Nothing is downloaded or deleted from the button.
:::

## Commission goes to the right vendor

- **Commission is credited to the vendor who owns the vehicle.** It was credited to the customer who made the booking (or to nobody), and a refund on the site's own vehicle debited the customer. Now a refund debits the vendor whose credit it reverses, and the vendor panel's earnings and "bookings, last 30 days" count the right bookings.
- **A refund creates a row only against an existing credit.** A refund that arrived before the order was paid (for example a bank transfer refunded while still processing) left the vendor with a debit for money that was never credited. A refund that is waiting is now written when the payment is completed, at that credit's commission rate.
- **Cancellation locks apply only to vendor vehicles.** An administrator cancelling a booking on their own vehicle from the booking edit screen locked that vehicle's dates for 30 days. The lock now applies only to vehicles listed by a vendor.
- **The reliability score counts the right cancellations.** It counted any cancellation that carried the vendor's user ID, including one made by an administrator who later became a vendor or by a vendor cancelling their own rental from My Account, and it counted by the booking's creation date, so a booking made seven months ago and cancelled yesterday was missed. It now counts only cancellations made as a vendor, by the date of the cancellation, in the site timezone. The dates are no longer locked when a vendor cancels their own rental from My Account.
- **Settings hidden:** "Cancelled Booking Re-block Period (Days)" and "Points Deducted per Cancellation" are hidden from the Vendor Marketplace settings, because no screen lets a vendor cancel a customer's booking yet. Saved values are kept and still apply.
- **Penalty days:** vendor cancellation penalty days now count as booked in vehicle search and lift automatically after 30 days (the cancellation day plus 29). "Apply to all" and "Remove from all" no longer copy or wipe penalty days. Dates you blocked by hand are kept.

## Privacy tools

- **Three Pro entries in the WordPress privacy tools.** Tools > Export Personal Data and Erase Personal Data now include Messages (the customer's threads), Vendor data (applications, profile, payouts, reports and reliability score, including rejected applicants) and Consent records. They work even when the licence has expired. Bank accounts are exported as their last four digits only. Vendor records are kept when erasing (legal retention) and the result says so. The suggested privacy policy text gains a Pro section.
- **The vendor export is complete.** It now pages through every application, payout and report; before, it stopped at 20 applications and 500 payouts or reports and always reported it was finished, and rejected payouts were left out.
- **My Account requests are confirmed by e-mail** (see the box above). The confirmation e-mail is not sent again within 10 minutes for the same account and action, and the old export that also included session tokens and the encrypted IBAN is gone.
- **One consent answer.** The privacy consent card in My Account and the booking check read different answers, so a customer who accepted the card could still be treated as not having consented. Both now read one answer.
- **Turkish:** the consent notice names KVKK (Law No. 6698) instead of GDPR.

## A vendor agreement that always shows

With "Require vendor agreement" on and the text empty, applicants saw no agreement and the admin saw no warning. An empty text now shows a built-in, translatable template covering listings, bookings, commission and payouts, cancellations, damage and insurance, personal data, suspension and termination, and changes. It is a starting point to review, not legal advice. The agreement also shows light formatting (# headings, **bold**, - lists, --- rules) instead of raw symbols.

## Reports in the site timezone

Booking dates in the Customer and Booking reports and the CSV export, the vehicle report's booked days, the default report ranges, the cancellation block's expiry and the vendor analytics day buckets now follow the site timezone, so a booking near midnight no longer lands on the wrong day.

## Fixes and tidying

- **Backslashes are kept.** A backslash typed in the vendor vehicle form (title, description, brand, model, colour, mileage, plate, city), in vendor application fields and the rejection note, in a payout's external reference ("BANK\6" was saved as "BANK6"), in transfer add-on lines, and in the vendor score history was lost on saving.
- **The vendor table:** changing a filter on page 2 sent page 2 with the new filter and then page 1, and a slow answer could overwrite a newer one. Page and filters now change together in one request, the table and pager stay visible while loading, and "Loading…" shows only before the first answer.
- **Vehicle Edit screen.** It shows the Pro boxes in the order of the new design, after Lite's side boxes (unless you arranged the boxes yourself), each with a "Pro" label. The Lifecycle box shows the status as a coloured pill with a warning at 10 days left or fewer, and its colours are readable on white. The Documents and Transfer boxes use the same styles, and "rental only" hides the transfer fields at once instead of sliding.
- **A transfer-only vehicle's card** no longer has a compare button, so the comparison only holds vehicles that can be rented.
- **Works with Lite 6.4.0.** Pro works with the redesigned booking form, My Account, comparison, calendar, contact and reviews in Lite 6.4.0. The transfer add-on window shows the site currency symbol on its own, and the vendor bookings page loads its own styles. Changing locations or running a transfer import refreshes the cached location list.
- **Licence reminder.** In the last 14 days it names the expiry date, links the licence page and offers "Remind me in 3 days"; it shows on the Rentiva screens, Plugins and the WordPress dashboard instead of on every admin page.
- **Turkish:** "Details" is "Ayrıntı" everywhere, as in Lite, and the vendor directory's filter panel heading reads "Filtre" and the vendor ledger's apply button "Filtrele".

## What to check after updating

- **Update order:** Rentiva (Lite) 6.4.0 first, then Pro 6.5.0. Both need WordPress 7.0 or newer (it was 6.7).
- **Commission:** rows written before this update are not corrected; look over past vendor earnings with that in mind.
- **Vendor agreement:** if "Require vendor agreement" is on, read the text applicants now see, especially if yours was empty.
- **Privacy requests:** tell your customers the My Account buttons now send a confirmation e-mail.
- **Vendor Marketplace settings:** the two cancellation settings are hidden but their saved values still apply.

---

**Where to get it.** Pro 6.5.0 is available from the same place as before, for licence holders on wpalemi.com. Update [Rentiva to 6.4.0](/blog/rentiva-v6.4.0-release) first. The full changelog ships with the plugin in both languages.
