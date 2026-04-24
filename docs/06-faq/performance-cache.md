---
id: performance-cache
title: Performance & Cache Management
sidebar_label: Performance & Cache
sidebar_position: 40
---

![Version](https://img.shields.io/badge/version-4.27.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-23.04.2026-orange?style=flat-square)

:::info Purpose
Explains the caching architecture Rentiva uses to operate efficiently on high-traffic vehicle rental sites, and how to resolve common performance issues.
:::

# ⚡ Performance & Cache Management

The system provides optimization across three main layers: Object Cache, Transients, and Page Cache.

---

## 🛠️ 1. Caching Layers

### WordPress Transients (Database Level)
- **Usage:** Price calculations, complex vehicle listing queries, and vendor analytics.
- **TTL (Lifetime):** Typically 15 minutes (`900 seconds`) for critical data.
- **Important:** If Transients accumulate in the database without being cleared, they can cause site-wide slowdowns. Use `mhm_rentiva_flush_cache` for manual cleanup.

### Object Cache (Memory Level)
- **Usage:** If Redis or Memcached is active, the system retrieves all object data from memory.
- **Advantage:** Reduces SQL query count by up to 80%.
- **Caution:** If you are experiencing data inconsistencies, temporarily disable Redis and test the issue.

---

## 🐢 2. Common Performance Issues

### Slow Vehicle Search Results
- **Reason:** Searching across too many `WP_Query` meta keys.
- **Fix:** Activate the Rentiva "Meta Optimizer" feature. Consider storing frequently used meta data (Make, Model, Year, etc.) in a separate table or an optimized index structure.

### Slow Admin Panel Management Pages
- **Reason:** A large volume of booking data (10k+) being listed at the same time.
- **Fix:** Reduce the pagination count (Default: 20). Disable unnecessary columns from the "Screen Options" menu.

---

## 🕒 3. Stale Data Issues

### I changed a setting but it's not reflecting on the frontend?
- **Possible Reasons:**
    1. **Page Cache:** The page cache of plugins like WP Rocket or LiteSpeed is out of date.
    2. **Fragment Cache:** Areas like the pricing table or FAQ may have independent caches.
- **Fix:** Press the Cache Reset button at Rentiva > Quick Actions > Reset Cache.

---

## 📈 4. Monitoring & Measurement

Monitor the following to track your site's performance:
- **TTFB (Time to First Byte):** Server speed and PHP execution time.
- **Query Count (SQL Queries):** Use the "Query Monitor" plugin to see Rentiva queries as a share of the total.
- **Cron Jobs:** Check whether financial updates or cleanup tasks are running on schedule.

## Checklist
1. Check Redis/Memcached status.
2. Verify page cache exclusions (the checkout page must be excluded).
3. Optimize unnecessary meta queries.
4. Perform periodic "Database Cleanup".

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Object Cache, Transients, and Stale Data scenarios added. |
