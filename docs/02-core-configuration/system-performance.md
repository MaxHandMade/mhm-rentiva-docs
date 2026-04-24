---
id: system-performance
title: System & Performance Settings
sidebar_label: System & Performance
sidebar_position: 11
slug: /core-configuration/system-performance
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The plugin's speed (caching) and security (WAF — Web Application Firewall) are managed from this hub. Configure all protection and speed optimizations from the **MHM Rentiva > Settings > System & Performance** tab.

---

## ⚡ System & Performance (Caching)

MHM Rentiva uses an advanced object caching layer to reduce database load.

- **Enable Object Cache:** When active, database queries are stored in memory, significantly increasing page load speed.
- **Cache TTL Durations:**
    - **Default:** Storage duration for general data (Hours).
    - **Lists:** Cache duration for vehicle and booking lists (Minutes).
    - **Reports & Charts:** How frequently statistics are refreshed (Minutes).
- **Meta Query Limit:** Maximum number of meta queries per request. Keeping this low keeps the system lighter.

---

### 🖼️ IMAGE: SYSTEM & PERFORMANCE SETTINGS
*(Settings > System & Performance tab, cache and TTL settings)*

---

## 🛡️ IP Control & Firewall

Apply IP-based and country-based restrictions to keep malicious users and spam bots away from your system.

- **Whitelist:** Add your office or management team's IP addresses here to ensure they are never blocked.
- **Blacklist:** Permanently block known malicious IPs.
- **Country Restriction:** Add only the countries you serve (e.g., TR, DE) to the allowed list and block the rest of the world with a single click.

---

## 🔓 Advanced Security Rules

Built-in protection rules against the most common attack types the system may face:

- **Brute-Force Protection:** Temporarily locks accounts against repeated incorrect password attempts.
- **SQL Injection & XSS Protection:** Sanitizes data coming from forms to ensure database security.
- **CSRF Protection:** Blocks forged requests and form manipulation.

---

### 🖼️ IMAGE: SECURITY & FIREWALL PANEL
*(Settings tab — IP restriction and security rules interface)*

---

## 🚥 Traffic Limits & Request Control (Rate Limiting)

Set per-IP, per-minute limits to prevent system resources from being abused.

| Limit Type | Description |
| :--- | :--- |
| **Global Request Limit** | Total call limit a user can make to plugin functions. |
| **Booking Request** | How many new booking attempts can be made from one IP per minute? |
| **Payment Request** | Limits payment gateway attempts to prevent fraudulent transactions. |

---

## 🩺 System Maintenance & Status

View your server's core information in real time from the **"System Status"** section at the bottom of the page:
- PHP / WordPress Versions
- Server Type (Apache, Nginx, etc.)
- **SQL Mode:** Checks whether you are running in `High Performance` mode for optimal performance.

### Section Summary
- **Object Cache** increases speed and reduces database load.
- **Rate Limiting** stops bot attacks and brute-force attempts.
- **WAF rules** provide a software-level security shield.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | System, Performance and Security (WAF) guide created. |
