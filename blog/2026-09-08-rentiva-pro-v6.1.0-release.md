---
slug: rentiva-pro-v6.1.0-release
title: "Rentiva Pro 6.1.0 — A deletion button only a customer can press"
authors: [maxhandmade]
tags: [release, rentiva, pro, privacy, gdpr, security, money]
date: 2026-09-08T02:00
---

This release is mostly about one question: what happens when an account is deleted. The answer, in 6.0.0, was worse than it should have been in three separate places — and one of them destroyed a customer's messages on sites that had never bought the compliance feature at all. **Update MHM Rentiva to 6.1.4 first, then Pro.** There is no data migration and no hook renames this time.

<!--truncate-->

## The self-service deletion button was live for everyone

Pro's GDPR tools put a "delete my data" button on the customer account area. It was gated on being logged in, and on nothing else.

Any logged-in user reached it — an editor, a shop manager, **an administrator**. Typing DELETE and confirming ran WordPress's account deletion against the current session's own account. Everything that account had authored went with it, and attachments are not sent to the trash unless a site explicitly turns that on, so the uploaded files were destroyed outright rather than recoverable. Any other content type the account authored — Elementor templates among them — was deleted the same way.

The handler now refuses any account that does not wear the customer role and nothing else. An administrator who presses it is told the account cannot be erased through self-service.

## A data-loss guard that was sitting behind the wrong licence

Pro keeps vendors, payouts and messages out of an account deletion. That protection was bound inside the GDPR-tools feature — but the content type it protects most, **messages**, is registered by a different licence feature.

So a site licensed for messaging and *not* for GDPR tools registered the message content type and bound no guard at all. A message has an author and is neither a post nor a page, which means WordPress deletes it outright instead of trashing it. Deleting that customer from the free plugin's Customers screen destroyed the customer's half of every conversation they had taken part in, with nothing in the trash to restore, and left the other party's replies sitting in a thread that no longer reads as one.

The guard is now bound whenever Pro loads, whatever the licence says. It is a data-loss shield, not a feature — it has to cover deletions Pro does not itself start.

## The retention cleanup was not asking who the account belonged to

Pro can delete inactive customer data after a retention period. In 6.0.0 the query that chose the accounts asked three things: has this account been inactive long enough, was it registered long enough ago, and does it have no bookings. It did not ask **whose account it was**, and there was no role check anywhere in the loop either.

An inactive account without a booking was therefore a candidate whatever it was: a vendor, a shop manager, an administrator.

The query narrows the same way now, and a second pass keeps only accounts whose roles are the customer role and nothing else. It errs towards not deleting, which is the right direction for code whose job is to destroy data.

Three more things in the same subsystem:

- **The retention period cannot be shorter than a year.** Any smaller value, configured or passed in, is raised to 365 days and the substitution is written to the log.
- **Scheduled erasure actually erases now.** WordPress's account-deletion function lives in an admin-only file that a scheduled run never loads, so on the cron path the deletion step had been doing nothing at all, silently. Measured in a real cron context: the function was absent before the fix and present after it.
- **The erased customer's e-mail address is no longer part of what the cleanup logs.** Only the account id is recorded. And two safety warnings — including the one that fires when an account could not be deleted and was anonymised instead — were being written at a level the default configuration discards. They are errors now, so they are actually recorded.

## On a multisite network, deletion now fails honestly

WordPress cannot remove an account from a network from inside a single site — its deletion call only removes the user from that one site, and the account and its address survive network-wide.

The request was being answered as though it had been carried out. It now refuses, with an error saying account deletion is not available on this installation.

This is a behaviour change: someone who used to see "Data deletion completed" will now see an error. The error is the truthful answer. Nothing was being deleted before either.

**One thing that has not changed, and is worth knowing:** when a customer erases themselves, their own bookings go with the account. They are the subject of the request, so they are deleted rather than retained — permanently, not to the trash. The guard above covers vendors, payouts and messages, not the requester's own bookings. There is no per-site switch for this in 6.1.0. A version that anonymises the booking instead of removing it is the next slice of this work.

## One authority for the currency

Ten places in Pro decided the currency for themselves when WooCommerce was not available — and disagreed with each other. Six said TRY and one said USD; the symbol was written as the lira sign twice and the dollar sign once.

These are fallbacks, so they run exactly when the condition they guard is true: a scheduled run, a deactivated store, a payment callback that arrives before WooCommerce has booted. In that window a single payout could be stamped USD while the CSV export, the penalty ledger entry, the webhook callback and the printed statement covering the same money all said TRY.

All ten now ask the same helper, which consults WooCommerce when it is active and the plugin's own currency setting when it is not. The pre-release audit then found five more surfaces of the same class — the vendor analytics panel, the printed statement's own missing-currency fallback, the penalty-reversal ledger entry, the statement-ready e-mail, and the price hint on the vendor vehicle form — and those went onto the helper too.

Two money bugs were fixed along the way, and both reached a vendor:

- **A penalty e-mailed to a vendor read like a credit.** Where WooCommerce was unavailable the notification formatted the amount itself and took its absolute value. Penalties are carried as negative amounts, so the vendor was sent the size of the deduction with no sign on it — the same string a payment produces.
- **The printed payout statement could be wrong by a factor of a thousand.** Its figures come from stored data, and a value already formatted as `1.234.567,89` was being cast straight to a number, which yields `1.234` — silently, on the document a vendor keeps.

## Four shortcuts are back on the dashboard

Reports, Vendors, Messages and Export left the dashboard with the free plugin's WordPress.org separation on 8 August, and nothing could put them back until the free plugin opened a seam for it. The pages stayed in the admin menu the whole time; they had simply lost their shortcuts.

Each is contributed per licence feature, so a licence that cannot open a screen is not handed a link to it, and an unlicensed install contributes none at all. Transfer is deliberately not among them — it leads to locations and routes, which are configured once and left alone.

This is also why **Pro now requires MHM Rentiva 6.1.4 or newer**, raised from 6.1.3 during the pre-release audit: the shortcuts bind a filter the free plugin does not open until 6.1.4. On a 6.1.3 site the pairing would have been accepted and the shortcuts would simply never have appeared, with nothing to say why. If Pro finds an older free plugin it switches itself off with a notice and touches no data.

## Also in this release

The monitoring subsystem was removed — a message logger, a monitoring manager and a performance monitor, about 1,400 lines that no code path could reach. The shared MHM interface library moved from 0.4 to 0.9.4, in step with the free plugin.

---

The full changelog ships with the plugin in both languages.
