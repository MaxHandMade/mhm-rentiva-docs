---
id: maintenance
title: Maintenance & Database Cleanup
sidebar_label: Database Cleanup
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

Periodically removing unnecessary data and optimizing database tables is critical for the system's long-term performance. These operations are managed from the **MHM Rentiva > Settings > Database Cleanup** tab.

---

## 🧹 Database Cleanup Tools

The panel has six buttons you can run with a single click:

1.  **Analyze Database:** Scans the database and fills in the **Database Cleanup Report** below (the button then reads *Analyze Integrity*).
2.  **Clean Orphaned Meta:** Removes meta data left behind by deleted vehicles or bookings.
3.  **Clean Expired Transients:** Deletes expired temporary (transient) system data.
4.  **Optimize Autoload:** Optimizes the `autoload` options WordPress loads on every request, improving speed.
5.  **Optimize Tables:** Reclaims overhead in MySQL tables and refreshes indexes.
6.  **Purge Old Logs:** Permanently deletes logs and queue entries older than 30 days.

**Invalid meta keys** are cleaned from the report itself: after an analysis, the *Invalid Meta Keys* row shows a **Clean** button when there is something to remove. Since 6.1.5 this cleanup leaves keys under `_mhmcs_` alone — they belong to MHM Currency Switcher (each product's fixed prices and, where orders are stored as posts, the currency and exchange rate recorded on each order), not to Rentiva.

:::info No backup, no deletion (6.1.5)
The invalid-meta, orphaned-meta and old-log cleanups copy what they are about to remove into a backup table first. If that backup table cannot be created or filled, the cleanup **deletes nothing**, tells you why, and removes the backup table it could not fill. The backups each run makes are listed under **Incremental Cleanup Backups**.
:::

---

### 🖼️ IMAGE: DATABASE CLEANUP PANEL
*(Settings > Database Cleanup tab and cleanup report table)*

---

## 💾 System Snapshot (Backup)

Before performing any critical operation, you can take a full backup of all your rental data (Vehicles, Definitions, Bookings).

- **Secure Storage:** Backups are stored in a protected directory with no public web access.
- **Restore (Rollback):** If an error occurs, you can revert to a previous state with a single click from the "Incremental Cleanup Backups" list.

:::caution Critical Warning
Cleanup operations cannot be undone. Always create a copy of your system using the **"Initialize Snapshot"** button before proceeding.
:::

---

## 📊 Database Cleanup Report

After an operation, the system provides a detailed report showing how much data (by count and size) was cleaned in each category.

### Custom Table Tracking
You can monitor the row count and disk size of plugin-specific tables such as `payment_log`, `transfer_routes`, and `message_logs` in real time from this screen.

---

## Uninstall & Table Cleanup

When the plugin is completely removed (deleted), the uninstaller deletes its content and drops its own tables.

**Content it deletes.** Vehicles, bookings, additional services, contact messages and the two log types are WordPress posts, not tables, and they are deleted as posts: `mhmrentiva_vehicle`, `mhmrentiva_booking`, `mhmrentiva_addon`, `mhmrentiva_contact`, `mhmrentiva_app_log`, `mhmrentiva_email_log`. Records still carrying the pre-6.0.0 post types `vehicle` and `vehicle_booking` are deleted with them.

**Tables it drops.**

- Queue and reports: `mhmrentiva_queue`, `mhmrentiva_report_queue`, `mhmrentiva_notification_queue`
- Ratings: `mhmrentiva_ratings`
- Payment records: `mhmrentiva_payment_log`
- Sessions: `mhmrentiva_sessions`
- Message logs: `mhmrentiva_message_logs`
- Multi-site bookkeeping: `mhmrentiva_tenants`, `mhmrentiva_usage_metrics`
- Recovery copies: `mhmrentiva_backup_records`
- Transfer locations: `rentiva_transfer_locations` (+ legacy `mhm_rentiva_transfer_locations`)
- Transfer routes: `rentiva_transfer_routes` (+ legacy `mhm_rentiva_transfer_routes`)

Pre-6.0.0 spellings of these names are dropped too, and anything else left behind under the plugin's own `mhmrentiva_` table prefix is swept up after them.

:::info The add-on's six tables are NOT dropped
The commission ledger, commission policy, vendor reports, background jobs, payout audit trail and key registry belong to the paid add-on, and removing Lite leaves them untouched. They hold append-only financial history, and a site removing Lite may be about to reinstall it. Each plugin removes its own data; uninstall the add-on to remove those.
:::

:::caution
The uninstall operation cannot be undone. Vehicle, booking and transfer data is permanently deleted.

**Customer accounts survive.** Customers are WordPress users, and the uninstaller does not delete users or their profile data — only the bookings that referenced them.
:::

---

## Cache Management

The system cache is managed from the **Cache** accordion under the **Maintenance** tab. This section is rendered by `MaintenanceSettings::render_group_cache()` and provides a single control point (the duplicate render issue was resolved in v4.22.1).

---

### Section Summary
- Perform **periodic cleanup** to prevent database bloat.
- The **Snapshot** system provides a safety net before every operation.
- Logs can be configured to be automatically cleaned up after 30 days.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 17.09.2026 | 6.1.5 | Tool labels match the screen; invalid-meta cleanup, Currency Switcher keys and the no-backup-no-deletion rule documented. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | 5 missing tables added to uninstaller. Cache section documented as the single render point. |
| 19.03.2026 | 4.21.2 | Database cleanup and backup details added. |
