---
id: commission-rates
title: Commission Rate Configuration
sidebar_label: Commission Rates
sidebar_position: 11
slug: /vendor/commission-rates
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Pro feature
This page documents a capability of the **MHM Rentiva Pro** add-on. It is not part of the free
Lite edition on WordPress.org and requires Pro installed alongside Lite plus a valid licence.
See [Editions — Lite vs Pro](/docs/) for the full split.
:::

:::info Purpose
This document explains how MHM Rentiva decides **which commission rate** applies to a given booking, and where each of the four configuration screens lives in wp-admin. For how the resulting `commission_credit` ledger entry is created, cleared, and paid out, see [Payouts & Ledger](/docs/vendor/payouts-ledger).
:::

# 💰 Commission Rate Configuration

Every completed booking generates a commission credit for the vendor. The **rate** used for that calculation is resolved through a 4-layer hierarchy — the most specific layer that has a value wins, and any layer left empty simply falls through to the next one.

---

## 🏗️ 1. The Rate Hierarchy

| Priority | Layer | Where it's set | Applies to |
|---|---|---|---|
| 1 (highest) | **Vehicle Override** | Vehicle edit screen → "Commission Rate Override" metabox | A single vehicle |
| 2 | **Vendor Override** | Vendor Management → vendor detail page → "Commission Rate Override" field | All of one vendor's bookings (unless a vehicle override applies) |
| 3 | **Volume Discount Tier** | Vendor Management → Commission tab → "Volume Discount Tiers" | Vendors whose trailing 30-day cleared revenue crosses a threshold |
| 4 (lowest) | **Global Rate** | Vendor Management → Commission tab → current rate | The platform-wide default; always defined |

:::tip How "empty" works
Leaving the Vehicle Override or Vendor Override field blank does **not** mean "0% commission" — it means "no override here, check the next layer down." A literal `0` is a real, deliberate override (0% commission for that vehicle/vendor).
:::

---

## 🚗 2. Vehicle-Level Override

**Location:** Edit any vehicle → sidebar → **Commission Rate Override** metabox.

Set a percentage (0–100, decimals allowed, e.g. `4.5`) to charge that vehicle's bookings a fixed commission rate regardless of the vendor's own rate or the platform's tier/global rate. Leave the field empty to fall back to the vendor-level (or lower) rate.

This is the most specific layer — use it for a single vehicle that has a special commercial arrangement (e.g. a promotional listing, a partner vehicle with a negotiated rate).

---

## 🧑‍💼 3. Vendor-Level Override

**Location:** Vendor Management → **Active Vendors** → click a vendor → **Commission Rate Override** field on the vendor detail page.

Set a percentage to apply a fixed commission rate to all of that vendor's bookings (any vehicle without its own override). Leave empty to fall back to the vendor's volume-discount tier or the global rate.

Use this for individually-negotiated vendor contracts, without needing to touch every vehicle they list.

---

## 📉 4. Volume Discount Tiers

**Location:** Vendor Management → **Commission** tab → **Volume Discount Tiers** section.

Vendors without a manual override automatically receive a discount off the global rate once their trailing 30-day **net cleared revenue** crosses a threshold. There are always exactly **3 tiers** — the thresholds and discount amounts (in percentage points) are editable, but tiers cannot be added or removed.

| Default Tier | 30-Day Revenue Threshold | Discount |
|---|---|---|
| 1 | 30,000 | −6 points |
| 2 | 15,000 | −4 points |
| 3 | 5,000 | −2 points |

Example: with the defaults above, a vendor whose last 30 days of cleared revenue is 18,000 receives the tier-2 discount (−4 points) off the global rate.

---

## 🌐 5. Global Rate

**Location:** Vendor Management → **Commission** tab → top section.

The platform-wide default rate. This is the only layer that always has a value — it's the floor every booking falls back to when no vehicle override, vendor override, or tier discount applies. Changing it creates a new rate policy version; existing, already-credited bookings keep the rate they were originally calculated at (see [Payouts & Ledger](/docs/vendor/payouts-ledger) for how rate snapshots protect past transactions from later rate changes).

---

## 📐 6. Worked Example

A booking is captured for a vehicle whose vendor has no vendor-level override, but the vehicle itself has a `4%` override set:

1. **Vehicle Override** → `4%` is present → **this rate is used**, no lower layer is checked.

If that same vehicle had no override, but the vendor had a `10%` override:

2. **Vehicle Override** → empty → fall through.
3. **Vendor Override** → `10%` is present → **this rate is used**.

If neither the vehicle nor the vendor had an override, and the vendor's 30-day cleared revenue is 20,000 (crossing the 15,000 tier):

4. **Vehicle Override** → empty → fall through.
5. **Vendor Override** → empty → fall through.
6. **Volume Discount Tier** → matches tier 2 → global rate minus 4 points is used.

---

## Section Summary
- The hierarchy always resolves to a value — an empty field means "check the next layer," never "0%."
- **Vehicle** and **Vendor** overrides are for one-off, negotiated arrangements.
- **Tiers** reward high-volume vendors automatically, without manual per-vendor work.
- The **Global Rate** is the permanent fallback and the only layer that can never be empty.

## Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 07.07.2026 | Unreleased | Initial version — documents the Vehicle Override, Vendor Override, and Volume Discount Tier admin screens. |
