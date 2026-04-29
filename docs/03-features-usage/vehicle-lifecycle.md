---
id: vehicle-lifecycle
title: Vehicle Lifecycle Management
sidebar_label: Lifecycle
sidebar_position: 4
slug: /features-usage/vehicle-lifecycle
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Vehicle Lifecycle Management controls the entire lifespan of each vehicle on the platform — from activation to expiry, from withdrawal to re-listing — through a rule-based state machine. **Requires a Pro license.**

---

## State Machine

Each vehicle exists in one of the following 5 states:

| State | Description |
|-------|-------------|
| `pending_review` | Vehicle awaiting review, not yet live |
| `active` | Vehicle is active; customers can view and rent it |
| `paused` | Vendor has temporarily paused it; vehicle is hidden |
| `expired` | 90-day listing period has elapsed; vehicle is unlisted |
| `withdrawn` | Vendor has withdrawn it; vehicle has left the platform |

### Allowed Transitions

```
pending_review → active         (admin approval)
active         → paused         (vendor pause)
active         → withdrawn      (vendor withdraw)
paused         → active         (vendor resume)
paused         → withdrawn      (vendor withdraw)
expired        → active         (vendor renew)
withdrawn      → active         (vendor re-list)
```

Undefined transitions are rejected by `VehicleLifecycleManager`.

---

## 90-Day Listing Period

- When a vehicle transitions to `active`, a **90-day countdown** begins.
- A daily cron identifies vehicles whose time has elapsed and moves them to `expired`.
- Warning emails are automatically sent to the vendor:
  - **10 days** before expiry
  - **3 days** before expiry

> A vendor can restart a new 90-day period for an expired vehicle using the **"Renew"** action.

---

## Vendor Self-Service Actions

Vendors can manage their vehicles without admin intervention:

### Pause
The active vehicle is temporarily unlisted. This does not affect pending bookings — the vehicle simply cannot receive new bookings.

### Resume
The paused vehicle is reactivated. The remaining listing time continues (time does not count down while the vehicle is paused).

### Withdraw
The vehicle is permanently removed from the platform. **A penalty may apply** (see below).

### Renew
An expired vehicle is reactivated and a new 90-day period begins.

### Re-list
A withdrawn vehicle is added back to the platform. The historical penalty counter is preserved.

---

## Withdrawal Penalty System

A graduated penalty is applied to discourage arbitrary vehicle withdrawals by vendors:

| Withdrawal Count | Penalty Rate |
|------------------|--------------|
| 1st withdrawal | Free |
| 2nd withdrawal | **10%** of monthly average revenue |
| 3rd and beyond | **25%** of monthly average revenue |

**12-month rolling window:** The penalty counter counts withdrawals within the last 12 months. Withdrawals older than 12 months are excluded from the count.

Deductions are automatically recorded in the ledger and subtracted from the next payout calculation.

### Withdrawal reason capture & appeal (v4.35.0)

Since [v4.35.0](/blog/rentiva-v4.35.0-release), vendors can capture a reason while withdrawing a vehicle. The previous browser `confirm()` dialog has been replaced by the shared **vendor report modal** that prompts for a reason (minimum 20 characters). When a reason is provided:

1. A `vehicle_action` report is filed with `status=open` before the withdrawal AJAX runs.
2. Inside `VehicleLifecycleManager::withdraw()`, the new `mhm_rentiva_before_apply_penalty` filter checks for the open report. The `PenaltySuspensionHook` callback returns `false`, **suspending both the score deduction and the ledger debit**.
3. The vehicle still transitions to `withdrawn` (post status, lifecycle meta, cooldown date all set), but the financial penalty is paused pending admin review.

The admin reviews the appeal in **MHM Rentiva → Bayi Raporları**:

- **Resolved** (vendor's reason accepted) → no-op. Score and ledger were never touched. Vendor lost zero points and zero TL.
- **Rejected** (admin upholds the penalty) → `apply_deferred_penalty()` runs: `ReliabilityScoreCalculator::update()` recomputes (the withdrawal is in state, so score drops), and `PenaltyRecorder::record_penalty()` writes the deferred ledger debit. The penalty applies retroactively.

Submissions without a `reason` POST parameter remain backwards compatible — they apply the penalty immediately as before. See the [Vendor Reports](./vendor-reports) page for the full system documentation.

---

## Anti-Gaming: Blocked Date Protection

To prevent price manipulation:

- A vendor cannot cancel a vehicle that has an active booking and re-list it for the same dates at a higher price.
- Dates of bookings cancelled by the vendor remain closed to new bookings for **30 days**.
- `AntiGamingBlocker` stores these blocks using the `_mhm_anti_gaming_blocks` meta key.

---

## Vendor Reliability Score

A reliability score between 0–100 is calculated for each vendor:

- Recalculated daily by `ReliabilityScoreCalculator`.
- **Factors included in the formula:**
  - Completed booking rate (positive)
  - Cancellation rate (negative)
  - Withdrawal frequency (negative)
  - Pause duration (mildly negative)

| Score | Interpretation |
|-------|----------------|
| 80–100 | Reliable vendor |
| 60–79 | Average |
| 40–59 | Needs attention |
| 0–39 | High risk |

The admin sees each vendor's current score in the user list.

---

## Lifecycle Email Notifications

Automatic email templates exist for all state transitions:

| Event | Recipient |
|-------|-----------|
| Vehicle activated | Vendor |
| Vehicle paused | Vendor |
| Pause resumed | Vendor |
| Vehicle withdrawn | Vendor + Admin |
| 10-day warning | Vendor |
| 3-day warning | Vendor |
| Listing period expired | Vendor + Admin |
| Vehicle renewed | Vendor |
| Vehicle re-listed | Vendor |

---

## Admin Interface

### Vehicle List Column
Each vehicle's lifecycle status is displayed with a color-coded badge:
- Green Active
- Yellow Paused
- Red Expired
- Black Withdrawn

### Vehicle Edit Meta Box
The **"Lifecycle"** meta box on the vehicle editing screen shows:
- Current status indicator
- Status transition button (allowed transitions)
- Listing period expiry date
- Withdrawal penalty counter

### User List
A reliability score column has been added to vendor rows.

---

## Frontend Active Filter

6 frontend shortcodes now automatically filter out vehicles under maintenance or in a passive state:

- `[rentiva_vehicles_grid]`
- `[rentiva_vehicles_list]`
- `[rentiva_featured_vehicles]`
- `[rentiva_vehicle_details]`
- `[rentiva_search_results]`
- `[rentiva_transfer_results]`

Vehicles in `expired` or `withdrawn` state are automatically excluded from queries via `MetaQueryHelper`.

---

> **Note:** Vehicle Lifecycle Management requires a **Pro** license. In the Lite edition, vehicles are managed only by WordPress post status (`publish`/`draft`); the state machine, penalty system, and reliability score features are not available.
