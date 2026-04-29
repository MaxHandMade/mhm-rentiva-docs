---
id: vendor-reports
title: Vendor Reports & Appeals
sidebar_label: Vendor Reports
sidebar_position: 12
slug: /features-usage/vendor-reports
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Pro](https://img.shields.io/badge/license-Pro-purple?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Vendor Report system gives vendors a structured channel to escalate issues to the platform administrator and to appeal automated actions (like withdrawal penalties). One custom table, one shared modal, one admin page — five different contexts trigger it. **Requires a Pro license.**

Introduced in [v4.35.0](/blog/rentiva-v4.35.0-release).

---

## What is a vendor report?

A vendor report is a structured message from a vendor to the platform administrator. It is **not** a customer-facing message and **not** a public review. The system supports five distinct contexts:

| Context | Used for | Where the trigger lives |
| :--- | :--- | :--- |
| `booking` | Customer issues (no-show, damage, dispute) | "Sorun Bildir" button on each vendor booking card |
| `vehicle` | Appeals against a paused/withdrawn vehicle | "İtiraz Et" button on listings page (paused/withdrawn states only) |
| `vehicle_action` | Reason capture during withdraw/pause — suspends the penalty | Modal opens automatically when the vendor clicks Withdraw or Pause |
| `penalty` | Appeal an already-applied penalty ledger entry | "Appeal" button on each row of the score history table |
| `general` | "Yöneticiye Yaz" — direct line to admin | Footer link on every vendor panel page |

All five share the same data structure (one row in `wp_mhm_rentiva_vendor_reports`) and the same admin UI. Side-effects on resolution differ per context.

---

## Vendor flow — submitting a report

### From the booking card

1. Vendor opens **Hesabım → Rezervasyonlar**
2. Each booking card has a "Sorun Bildir" button next to "View Details"
3. Click → modal opens with title and description fields
4. Submit → the report is saved with `context_type=booking`, `context_id=<booking_id>`, `status=open`
5. Email goes to the platform administrator

### Withdrawing a vehicle (the Not 2 augment)

The withdrawal flow is the most consequential context. By default, withdrawing a vehicle deducts 10 points from the vendor's reliability score and writes a debit entry to the financial ledger (the size depending on the vendor's withdrawal history — first one is free, then 10% / 25% of monthly average revenue).

With v4.35.0 the vendor can capture a reason while withdrawing:

1. Vendor opens **Hesabım → İlanlar**
2. Click "Çek" on an active vehicle
3. **The reason capture modal opens** (replacing the previous browser `confirm()` dialog)
4. Vendor enters a reason — minimum 20 characters required
5. Submit → two things happen in sequence:
   - A `vehicle_action` report is created with `status=open`
   - The withdrawal AJAX is called
6. Inside `VehicleLifecycleManager::withdraw()`, the new `mhm_rentiva_before_apply_penalty` filter runs. The `PenaltySuspensionHook` callback sees the open report and returns `false`. **Score deduction and ledger debit are skipped.**
7. The vehicle still transitions to `withdrawn` (post status, lifecycle meta, cooldown date all set), but the financial penalty is suspended pending admin review.

Same flow applies to pause actions.

### Appealing a past penalty

1. Vendor opens **Hesabım → Güvenilirlik & Cezalar → Score History**
2. Each row that represents a penalty (negative delta tied to a vehicle) has an "Appeal" button
3. Click → modal opens, title pre-filled with `Appeal: <event> on <vehicle>`
4. Submit → report saved with `context_type=penalty`, `context_id=<ledger_uuid>`

Note: penalty appeals do not currently reverse the applied ledger entry — that requires the compensating-entry helper landing in v4.36.0+. Resolution updates the report status, sends the vendor an email, and marks the appeal as upheld for record-keeping.

### Contacting the administrator

Every vendor panel page has a "Yöneticiye Yaz" link in the footer. This opens the modal with `context_type=general` (no `context_id`) and lets the vendor send a free-form message to the admin. Use this for feature suggestions, account questions, or anything that doesn't fit one of the other four contexts.

---

## Admin flow — resolving a report

### List page

**Yönetim → MHM Rentiva → Bayi Raporları** opens a paginated list filtered by status (default: `open`) and context. Columns:

- Report ID
- Vendor name + ID
- Context label (Rezervasyon / Araç / Araç işlemi / Ceza itirazı / Genel)
- Title (link to detail)
- Status pill
- Created date
- Action button (Open detail)

### Detail page

Clicking a report opens the detail view with:

- Report title (heading)
- Status, vendor, context (with context_id link if applicable)
- Submitted timestamp
- Full description in a styled block
- Existing admin note (if any)
- Action form (only for non-terminal reports):
  - Optional admin note textarea
  - Three submit buttons: **Mark as Resolved**, **Reject**, **Mark In Review**

### Resolution side-effects

| Context | "Mark as Resolved" | "Reject" |
| :--- | :--- | :--- |
| `booking` | Status update + email to vendor | Same |
| `vehicle` | Same | Same |
| `vehicle_action` | **No-op** — penalty was already suspended at withdrawal time, vendor keeps their score | **`apply_deferred_penalty()` runs** — `ReliabilityScoreCalculator::update()` recomputes (the withdrawal is in state, so score drops) and `PenaltyRecorder::record_penalty()` writes the deferred ledger debit |
| `penalty` | (v4.36.0+ — ledger compensating entry helper) | No-op (penalty already applied; rejection just closes the appeal) |
| `general` | Status update + email | Same |

Both resolutions send the vendor an email (`vendor_report_resolved` template) with the admin note and the new status.

### Mark In Review

Sets `status=in_review`. Penalty suspension stays active (in_review counts as "open" for the filter callback). No vendor email — this is an internal flag for triage.

---

## The penalty filter — `mhm_rentiva_before_apply_penalty`

Two filter hook points wrap the score deduction and the ledger entry. Plugins or themes can hook this filter to introduce additional suspension reasons beyond vendor reports:

```php
/**
 * @param bool   $apply      Whether to apply the penalty. Default true.
 * @param int    $vehicle_id Vehicle post ID.
 * @param int    $vendor_id  Vendor user ID.
 * @param string $reason     Penalty reason ('withdrawal').
 * @param float  $penalty    Pre-calculated penalty amount.
 */
add_filter('mhm_rentiva_before_apply_penalty', function ($apply, $vehicle_id, $vendor_id, $reason, $penalty) {
    if ($reason === 'withdrawal' && my_holiday_freeze_active()) {
        return false; // suspend penalties during a platform-wide freeze
    }
    return $apply;
}, 20, 5);
```

The plugin's own `PenaltySuspensionHook` registers at priority 10. Any filter callback that returns `false` blocks the penalty for that hook fire; an open vendor_action report is just one of multiple possible reasons.

---

## Database

New custom table `{prefix}mhm_rentiva_vendor_reports`:

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED AUTO_INCREMENT | Primary key |
| `vendor_id` | BIGINT UNSIGNED | Indexed |
| `context_type` | VARCHAR(20) | `booking` / `vehicle` / `vehicle_action` / `penalty` / `general` |
| `context_id` | VARCHAR(64) | Integer ID, ledger UUID, or NULL |
| `title` | VARCHAR(255) | |
| `description` | LONGTEXT | Min 20 chars enforced at service layer |
| `status` | VARCHAR(20) | `open` / `in_review` / `resolved` / `rejected` |
| `admin_note` | LONGTEXT | NULL until first admin action |
| `admin_user_id` | BIGINT UNSIGNED | NULL until first admin action |
| `created_at` | DATETIME | |
| `updated_at` | DATETIME | |
| `resolved_at` | DATETIME | Set when status transitions to terminal (resolved/rejected) |

Indexes: `vendor_id`, `context_type`, `context_id`, `status`, composite `(vendor_id, status)`, composite `(context_type, context_id, status)` (the open-report lookup hot path), `created_at`.

Migration class: `src/Core/Database/Migrations/VendorReportsMigration.php`. Registered in `DatabaseMigrator::run_migrations()`. `DatabaseMigrator::CURRENT_VERSION` bumped 3.5.0 → 3.6.0 to trigger the migration on existing installs.

---

## Lite vs Pro

The entire vendor report system is gated by `Mode::canUseVendorMarketplace()`. On Lite plans:

- The admin "Bayi Raporları" submenu is not registered.
- The AJAX handler returns 403.
- The shared modal is not enqueued.
- The penalty filter callback is still registered but always returns `apply` unchanged (no open reports because vendors can't file any).

In effect, Lite vendors withdraw vehicles the old way — direct penalty, no reason capture, no appeal path. Pro upgrade unlocks the full system.

For local testing without a real Pro token, add `define('MHM_RENTIVA_DEV_PRO', true);` to `wp-config.php` (works only when `WP_DEBUG=true`).

---

## Developer extension points

| Hook / Class | Purpose |
| :--- | :--- |
| `mhm_rentiva_before_apply_penalty` | Filter — gate the score deduction and ledger entry. 5-arg signature. |
| `mhm_rentiva_vendor_report_created` | Action — fires after a report is persisted. Email subsystem listens. 3 args. |
| `mhm_rentiva_vendor_report_resolved` | Action — fires after status changes to terminal. 3 args (report_id, vendor_id, new_status). |
| `VendorReportRepository` | Public API: `create()`, `find()`, `update_status()`, `find_by_vendor()`, `has_open_report_for()`, `reset_has_open_cache()` |
| `VendorReportService` | Public API: `create_report()`, `resolve_report()`, `reject_report()` |

---

## See also

- [v4.35.0 release notes](/blog/rentiva-v4.35.0-release) — feature introduction
- [Vehicle Lifecycle](./vehicle-lifecycle) — pause/withdraw/expire flow that the `vehicle_action` context integrates with
- [Vendor Apply](./shortcodes/vendor-apply) — how vendors join the marketplace in the first place
