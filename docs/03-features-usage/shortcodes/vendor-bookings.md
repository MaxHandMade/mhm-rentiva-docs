---
title: Vendor bookings list
description: Usage guide and technical reference for the vendor-side booking inbox shortcode — lists every reservation made on the current vendor's vehicles.
sidebar_position: 28
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page documents the `[rentiva_vendor_bookings]` shortcode — the vendor-side inbox that lists every reservation customers have made on the current vendor's vehicles. Used in the vendor panel (`/panel/`); not for public placement.
:::

# 📥 Vendor Bookings (vendor panel inbox)

## Contents
- What this shortcode is
- Authentication & role gate
- Frontend usage
- Attribute reference
- Empty states
- Where this fits in the vendor panel

## What this shortcode is

`[rentiva_vendor_bookings]` is a **vendor-only panel widget**. The current logged-in user must hold the `rentiva_vendor` role; otherwise the shortcode returns an empty string. The output is a list of `vehicle_booking` posts whose underlying vehicle's `post_author` matches the current user — in other words, every reservation a customer has made on a car this vendor owns.

This is **not** the customer-side "my bookings" list (`[rentiva_my_bookings]` is for that). Customer "my bookings" reads bookings the **current user made**; vendor bookings reads bookings the **current user owns the inventory for**. The two are intentionally separate shortcodes because vendor-side queries also need to surface the customer's identity, whereas customer-side queries surface the vehicle and the vendor.

Used internally by the vendor panel page at `/panel/` (the dashboard switches between Listings, Booking Requests, and Ledger & Payouts). Authors building a custom vendor panel layout can drop this shortcode into a Pro-gated page as needed.

## Authentication & role gate

Two layers protect the output:

1. **Auth required.** `requires_auth = true` in the registry — non-logged-in visitors see an "Auth error" notice via the `mhm_rentiva_shortcode_auth_error` filter (default: "Please login to view this content.").
2. **Role required.** The handler bails with `error => 'not_vendor'` when the current user is missing the `rentiva_vendor` role. The template renders nothing for that branch.

Pro gate is **inherited from the page** — typical placement is `/panel/`, which already requires the `vendor_marketplace` Pro feature. Lite vendors do not have access to the panel page in the first place.

## Frontend usage

```shortcode
[rentiva_vendor_bookings]
```

The shortcode reads only one attribute, `limit`:

```shortcode
[rentiva_vendor_bookings limit="10"]
```

The query path:

1. Fetch all `vehicle` IDs owned by the current vendor (`post_author = $user_id`, `post_status` in `[publish, pending]`).
2. Run a `vehicle_booking` query joining to those vehicle IDs via `_mhm_vehicle_id` meta.
3. Render the resulting list with customer identity, vehicle, dates, and status.

Pagination is server-side and reads `?paged=N` from the request.

## Attribute reference

| Attribute | Default | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `limit` | `10` | int | Number of bookings to render per page. |

## Empty states

| State | Render |
| :--- | :--- |
| Vendor with zero owned vehicles | Empty list with "no inventory yet" hint |
| Vendor with vehicles but zero bookings | Empty list with "no bookings yet" hint |
| Non-vendor user | Empty string (silent) |
| Logged-out user | Auth error notice (filtered via `mhm_rentiva_shortcode_auth_error`) |

## Where this fits in the vendor panel

The vendor panel at `/panel/` is composed of three sections (the customer's `/hesabim/` and the vendor's `/panel/` are deliberately separate routes):

| Panel section | Shortcode |
| :--- | :--- |
| Listings | `[rentiva_vehicle_submit]` (add/edit) + native vendor vehicle list |
| Booking Requests | `[rentiva_vendor_bookings]` ← **this page** |
| Ledger & Payouts | `[rentiva_vendor_ledger]` ([reference](./vendor-ledger)) |

Customer-side equivalent is `[rentiva_my_bookings]` ([reference](./my-bookings)) — that one runs against `_mhm_customer_user_id` meta, this one runs against the vehicle's author.

## See also

- [Vendor ledger shortcode](./vendor-ledger) — vendor financial transactions list
- [Vendor application form](./vendor-apply) — onboarding
- [Vendor public profile](./vendor-profile) — the public-facing trust page
- [Customer "my bookings" shortcode](./my-bookings) — the customer-side counterpart (different query path)
- [Vendor onboarding](/docs/vendor/onboarding) — operational guide
