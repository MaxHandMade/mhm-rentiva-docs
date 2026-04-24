---
id: comments
title: Reviews & Ratings (Settings)
sidebar_label: Reviews
sidebar_position: 7
slug: /core-configuration/comments
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Reviews tab is the hub for managing customer feedback, ratings, and spam protection after a vehicle rental experience. Access it via **MHM Rentiva > Settings > Reviews**.

---

## ⚙️ General Configuration

The core operating rules for the review system are set here:

- **Auto-Approve Reviews:** When checked, reviews are published immediately without going to admin moderation.
- **Login Required:** Restricts review submission to logged-in users only.
- **Allow Guest Reviews:** Allows non-registered users to submit a review with their name and email.

---

## 🎨 Display Settings

Frontend display preferences:

- **Reviews Per Page:** How many reviews are listed on a single page (e.g., 10).
- **Show Ratings:** Enables or disables the star-rating system.
- **Show Avatars:** Displays user profile pictures (Gravatar).
- **Edit and Delete:** Allows users to edit or delete their own reviews within a specified time period (Minutes).

---

## 🛡️ Spam & Security

Protects the system from malicious content and bots:

- **Spam Protection:** Enables the smart filtering system.
- **Enable Rate Limiting:** Prevents a single user from submitting too many reviews in a short period (e.g., a limit of 1 review per minute).
- **Blocked Words:** A blacklist of words that automatically block content if found in a review. Add entries separated by commas (e.g., spam, casino, viagra).

---

### 🖼️ IMAGE: REVIEWS SETTINGS PANEL
*(Settings > Reviews tab, accordion-structured settings groups)*

---

## ⚡ Cache & Performance

Used to reduce database load on high-traffic sites:

- **Enable Review Cache:** Stores review lists in temporary memory.
- **Cache Duration (Minutes):** How long the lists remain current (e.g., 5 min).

---

### Section Summary
- Use the **Approval Process** to monitor content quality.
- Use **Spam Filters** to maintain a clean feedback area.
- Use the **Rating System** to provide social proof to other customers.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | Reviews (Settings) documentation created based on panel screenshot and code analysis. |
