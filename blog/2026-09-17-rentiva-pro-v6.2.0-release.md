---
slug: rentiva-pro-v6.2.0-release
title: "Rentiva Pro 6.2.0 — A vendor panel of its own, one ledger currency, and refunds that reverse commission exactly"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendor, payouts, money, security]
date: 2026-09-17T06:30
---

Vendors get a panel of their own, and the money behind it is put on one footing: one currency in the ledger, and refunds that take back exactly the commission that was credited. **Update MHM Rentiva to 6.1.5 first, then Pro.** If Pro finds an older Rentiva it switches itself off with a notice and creates nothing.

<!--truncate-->

## A panel vendors can work from

Pro creates a **Vendor Panel** page automatically, at the address `satici-panel`, with five sections: Panel, My listings, Bookings, Earnings & payouts and Reviews. The old vendor area under My Account now redirects there permanently.

- From **My listings** a vendor pauses, resumes, withdraws, renews and relists a listing. Only the actions the listing's current state allows are shown; a listing that was never approved shows none, and one waiting for its listing fee shows *Complete payment*. A rejected listing shows the rejection note, and a withdrawn listing keeps its booking history.
- From **Earnings & payouts** a vendor requests a payout. While a request is pending, the panel shows that request instead of the form.
- An administrator can open the panel to see what vendors see. A suspended vendor sees why their access stopped, and an applicant whose application is still pending sees its status instead of being sent back to the application form.

## One currency in the ledger

The vendor ledger now records every amount in **the store's base currency**, at the store's own decimal precision — even when a visitor paid in another currency through Currency Switcher. Commission from such an order is converted with **the exchange rate recorded on that order**, which is why this version needs Rentiva 6.1.5: 6.1.5 stops Rentiva's database cleanup from deleting exactly that recorded rate.

Balances and totals count base-currency amounts only. A balance a vendor still holds in another currency is named separately on the Available balance card rather than silently added in. The ledger's money columns are widened to four decimals by a one-time database update; the audit hash of every existing ledger row is unchanged.

## Refunds take back exactly what was credited

A refund now reverses commission **cumulatively**, tied to the commission it belongs to. Any series of partial refunds — including one recorded before the commission itself — takes back exactly what was credited, in that commission's currency. Refunds for the same order are handled one at a time, so two arriving together can no longer both reverse the full commission.

## "Total paid out" showed 0 after a real payout

Payouts approved from the Payouts screen were recorded under a type the totals did not recognise, and as *reserved* rather than paid — a state nothing ever moved them out of. The vendor's "Total paid out" read 0 and earnings counted the payout as negative. Payouts are now recorded as paid, and ones approved that way before this version are corrected on the next admin page load.

## Read this before updating

- **Security.** With listing fees enabled, a renew or relist request put the listing in the requesting vendor's cart **before checking the listing was theirs** — an active vendor could renew or relist another vendor's listing. Ownership is now checked first.
- With listing fees enabled, a paid renew or relist also took the fee **before** asking whether the listing could be renewed or relisted: a renewal past its grace period was paid for and stayed expired, and a relist skipped its cooldown. The rules are now checked before checkout and again when the payment completes.
- On a site where Rentiva was activated before Pro — the only order Pro allows — Pro's own tables (vendor ledger, payout audit, key registry, commission policy, vendor reports and the transfer tables) were never created, so **commission was not recorded and nothing said why**. Pro now creates any missing table on its next admin page load and keeps retrying until all of them exist.
- The ledger integrity check wrote its verdict inside its own read-only transaction, so a detected mismatch was never stored. It is stored now.

## Also in this release

Ledger dates show in your site's timezone instead of UTC. The vendor panel no longer fails when WooCommerce is switched off outside the plugin screen, and two visits arriving together on first load can no longer create two Vendor Panel pages. On Vendor Management and Vendor Reports, admin notices are in place when the screen first appears. The vendor panel and the listing-fee messages are translated into Turkish.

---

**Where to get it.** Pro 6.2.0 is published on GitHub as `v6.2.0` and served through the Rentiva Pro download on wpalemi.com. Update [Rentiva to 6.1.5](/blog/rentiva-v6.1.5-release) first. The full changelog ships with the plugin in both languages.
