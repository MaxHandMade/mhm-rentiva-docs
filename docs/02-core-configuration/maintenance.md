---
id: maintenance
title: Maintenance & Database Cleanup
sidebar_label: Database Cleanup
sidebar_position: 14
slug: /core-configuration/maintenance
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

Periodically removing unnecessary data and optimizing database tables is critical for the system's long-term performance. These operations are managed from the **MHM Rentiva > Settings > Database Cleanup** tab.

---

## 🧹 Database Cleanup Tools

The panel provides 6 core maintenance tools you can run with a single click:

1.  **Analyze Integrity:** Scans the database for inconsistencies and missing tables.
2.  **Clean Orphan Meta:** Removes orphaned meta data belonging to deleted vehicles or bookings.
3.  **Clear System Cache:** Resets transient system data.
4.  **Optimize Autoload:** Optimizes the `autoload` options WordPress loads on every request, improving speed.
5.  **Optimize Tables:** Reclaims overhead in MySQL tables and refreshes indexes.
6.  **Clean Old Logs:** Permanently deletes operation records and logs older than 30 days.

---

### 🖼️ IMAGE: DATABASE CLEANUP PANEL
*(Settings > Database Cleanup tab and cleanup report table)*

---

## 💾 System Snapshot (Backup)

Before performing any critical operation, you can take a full backup of all your rental data (Vehicles, Definitions, Bookings).

- **Secure Storage:** Backups are stored in a protected directory with no public web access.
- **Restore (Rollback):** If an error occurs, you can revert to a previous state with a single click from the "Incremental Cleanup Backups" list.

:::caution Critical Warning
Cleanup operations cannot be undone. Always create a copy of your system using the **"Start Snapshot"** button before proceeding.
:::

---

## 📊 Database Cleanup Report

After an operation, the system provides a detailed report showing how much data (by count and size) was cleaned in each category.

### Custom Table Tracking
You can monitor the row count and disk size of plugin-specific tables such as `payment_log`, `transfer_routes`, and `message_logs` in real time from this screen.

---

## Uninstall & Table Cleanup

When the plugin is completely removed (deleted), all custom tables it created are also cleaned up. As of v4.22.1, the tables cleaned by the uninstaller are:

- Core tables: `mhm_vehicles`, `mhm_bookings`, `mhm_customers`, `mhm_addons`, etc.
- Notification queue: `mhm_notification_queue`
- Payment records: `mhm_payment_log`
- Sessions: `mhm_sessions`
- Transfer locations: `rentiva_transfer_locations` (+ legacy `mhm_rentiva_transfer_locations`)
- Transfer routes: `rentiva_transfer_routes` (+ legacy `mhm_rentiva_transfer_routes`)

:::caution
The uninstall operation cannot be undone. All vehicle, booking, customer, and transfer data is permanently deleted.
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
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.22.1 | 5 missing tables added to uninstaller. Cache section documented as the single render point. |
| 19.03.2026 | 4.21.2 | Database cleanup and backup details added. |
