---
title: Vendor ledger
description: Usage guide and technical reference for the vendor-side financial ledger shortcode — paginated transaction history with filtering.
sidebar_position: 29
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split.
:::

:::info Purpose
This page documents the `[rentiva_vendor_ledger]` shortcode — the vendor-side financial ledger that lists every transaction (booking commission credits, refunds, payouts) on the current vendor's account. Used in the vendor panel (`/panel/`); not for public placement.
:::

# 📊 Vendor Ledger (financial transactions)

## Contents
- What this shortcode is
- Authentication & role gate
- Transaction kinds rendered
- Frontend usage (URL filters)
- Pagination
- Empty states
- Where this fits in the vendor panel

## What this shortcode is

`[rentiva_vendor_ledger]` renders the vendor's financial transaction history — credits earned per booking, refunds reversed, and payouts disbursed — backed by the central `Ledger` service. Each row shows transaction type, related booking (when applicable), amount (formatted via WooCommerce currency settings), and timestamp.

This is the **transparent record** behind the vendor's earnings number on the dashboard. When a customer books a vehicle, a credit entry lands here automatically. When admin processes a payout, a corresponding debit lands here. When a booking is refunded, `PayoutService::create_refund_entry()` writes a reverse entry so the ledger never goes out of balance.

## Authentication & role gate

The shortcode runs two checks:

1. `is_user_logged_in()` — anonymous visitors get an empty string.
2. The current user must have the `rentiva_vendor` role — non-vendor users see an "Access Denied. Only vendors can view the financial ledger." notice.

Pro gate is **inherited from the page** — typical placement is `/panel/`, which already requires the `vendor_marketplace` Pro feature.

## Transaction kinds rendered

| Kind | Source | Direction |
| :--- | :--- | :--- |
| Booking commission | `OrderManager` writes via `Ledger::credit()` when a booking is paid | Credit (+) |
| Refund | `PayoutService::create_refund_entry()` writes a reverse entry on cancellation/refund | Debit (−) |
| Payout | Admin payout dispatch writes via `Ledger::debit()` | Debit (−) |
| Manual adjustment | Admin-side manual ledger entries (rare) | Either |

The running balance shown on the vendor dashboard is `SUM(credits) - SUM(debits)` over the vendor's ledger.

## Frontend usage

```shortcode
[rentiva_vendor_ledger]
```

No shortcode attributes — the shortcode reads filters from the URL query string instead, which keeps every filter combination shareable / bookmarkable / linkable from a vendor pagination control:

| Query param | Purpose |
| :--- | :--- |
| `paged` | Page number (server-side, default 1) |
| Other filter args | Type, date range, booking ID — handled inside `Ledger::query()` |

The shortcode validates each query parameter via dedicated `get_query_int()` / `get_query_string()` helpers; the docblock notes "complex shortcode wrappers limiting inputs securely via GET processing."

## Pagination

Server-side. Default page size is **15 entries** per page; `?paged=N` advances. The pagination control at the bottom of the rendered grid carries any active URL filters forward, so navigating to page 2 keeps the date range or type filter the user had applied on page 1.

## Empty states

| State | Render |
| :--- | :--- |
| Vendor with no transactions yet | "No transactions yet" placeholder (e.g. brand-new vendor) |
| Filter excludes all rows | "No transactions match these filters" with a "Clear filters" link |
| Non-vendor user | "Access Denied. Only vendors can view the financial ledger." notice |
| Logged-out user | Empty string (silent) |

## Where this fits in the vendor panel

The vendor panel at `/panel/` has three sections; this shortcode owns the financial third:

| Panel section | Shortcode |
| :--- | :--- |
| Listings | `[rentiva_vehicle_submit]` (add/edit) + native vendor vehicle list |
| Booking Requests | `[rentiva_vendor_bookings]` ([reference](./vendor-bookings)) |
| Ledger & Payouts | `[rentiva_vendor_ledger]` ← **this page** |

The customer-side equivalent for transaction history is `[rentiva_payment_history]` ([reference](./payment-history)), which surfaces the customer's payments rather than the vendor's earnings.

## Related architecture

- **`Ledger` service** (`MHMRentiva\Core\Financial\Ledger`) — the single source of truth for vendor transactions. All ledger writes go through this class so the running balance never drifts.
- **`PayoutService::create_refund_entry()`** — writes the reverse-direction ledger entry when a booking is refunded so the audit trail stays bidirectional.
- **`OrderManager`** — credits the ledger when a booking order completes (the same hook that issues a license key for license-based plugins also credits the vendor on the rental side).

## See also

- [Vendor bookings shortcode](./vendor-bookings) — vendor-side booking inbox
- [Customer payment history shortcode](./payment-history) — the customer-side counterpart
- [Vendor onboarding](/docs/vendor/onboarding) — operational guide
- [Payouts ledger documentation](/docs/vendor/payouts-ledger) — admin-side payout flow + accounting model
