---
id: installation
title: Installation & Getting Started
sidebar_label: Installation
sidebar_position: 2
slug: /getting-started/installation
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

MHM Rentiva is a professional plugin designed to turn your WordPress site into a powerful vehicle rental platform. This guide walks you through installing the plugin from scratch and completing the initial configuration steps.

:::tip Tutorial Video
Click the video box below to watch a step-by-step installation walkthrough.
<div className="video-placeholder" style={{ border: '2px dashed #0f766e', padding: '40px', textAlign: 'center', borderRadius: '8px', background: '#f0fdfa', marginBottom: '20px' }}>
  <p><strong>🎥 Tutorial Video Coming Soon</strong></p>
  <small>It will be available here once published on our official YouTube channel.</small>
</div>
:::

---

## 1. System Requirements

For stable operation, your server and WordPress installation must meet the following minimum requirements:

| Requirement | Minimum Version | Notes |
| :-- | :-- | :-- |
| **WordPress** | 6.7+ | The latest stable release is recommended. |
| **PHP** | 8.1+ | Required for security and performance. |
| **WooCommerce** | 8.0+ | **Required** for all frontend payment flows. |
| **SSL Certificate** | HTTPS | Required for payment gateways (Stripe, iyzico, etc.) to work. |
| **Permalink Structure** | Post Name | `%postname%` is recommended for SEO and routing. |

---

## 2. Step-by-Step Installation

MHM Rentiva is published on the [WordPress.org plugin directory](https://wordpress.org/plugins/mhm-rentiva/), so the ordinary route is the one WordPress offers itself. The other two methods are for installing a **specific build** rather than the current release.

### Method A: From the WordPress.org directory (Recommended)
1. From your WordPress dashboard, go to **Plugins > Add New**.
2. Search for **MHM Rentiva**.
3. Click **Install Now** and, once the process completes, click **Activate**.

From here on WordPress keeps the plugin up to date the same way it updates any other directory plugin — you do not need to download anything by hand again.

---

### 🖼️ IMAGE: PLUGIN SEARCH SCREEN
*(Screenshot showing the Plugins > Add New search results with MHM Rentiva listed)*

---

### Method B: Uploading a ZIP file
Use this when you need a particular build — for example a version from the [GitHub releases page](https://github.com/MaxHandMade/mhm-rentiva/releases) — rather than the one currently in the directory.

1. Go to **Plugins > Add New** and click the **Upload Plugin** button.
2. Choose the ZIP file and click **Install Now**.
3. Once the process completes, click **Activate Plugin**.

---

### 🖼️ IMAGE: PLUGIN ACTIVATION CONFIRMATION
*(The screen showing the "Activate Plugin" button after a successful upload)*

---

### Method C: Via FTP/SFTP
1. Extract the plugin ZIP file into a folder on your computer.
2. Connect to your server with an FTP client (such as FileZilla).
3. Upload the extracted folder to the `/wp-content/plugins/` directory.
4. Activate the plugin from your WordPress dashboard.

---

## 3. Automatic Post-Install Actions

When the plugin is activated, the following actions run automatically in the background:

1. **Database Tables:** Functional tables such as `payment_log`, `sessions`, and `transfer_routes` are created.
2. **CPT Registration:** The `mhmrentiva_vehicle`, `mhmrentiva_booking` and `mhmrentiva_addon` custom post types and their related taxonomies are registered.
3. **Customer Role:** A custom user role named `mhmrentiva_customer` is added.
4. **Rewrite Rules:** Permalinks are automatically refreshed for vehicle pages.

---

## 4. Initial Setup Wizard

The first time you activate the plugin, the system automatically redirects you to the **Setup Wizard**. This wizard:
- Collects your basic company information.
- Automatically creates the required pages (Search, Vehicle Detail, Checkout, etc.).
- Verifies the WooCommerce integration.

:::info Manual Navigation
If the wizard does not open automatically, you can start it manually via **MHM Rentiva > Setup Wizard** in the WordPress admin menu.
:::

---

## Technical Details (For Developers)

During activation, the plugin uses `register_activation_hook` to fire the `mhmrentiva_single_site_activation()` function. That function keeps the database schema up to date through the `DatabaseMigrator` class.

When `WP_DEBUG` is enabled during development, installation errors will surface in the PHP logs or in the error notice boxes at the top of the screen.

---

### Section Summary
- **PHP 8.1+** and **WooCommerce** are required.
- The **Setup Wizard** must be completed after installation.
- Database tables are created automatically on activation.

### Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 23.08.2026 | 6.0.7 | Installation now starts at the WordPress.org directory; post-activation identifiers updated for the 6.0.0 renames. |
| 23.04.2026 | 4.27.2 | Documentation synchronized with the current plugin release. |
| 18.03.2026 | 4.21.2 | Design revision and expanded content. |
| 26.02.2026 | 4.21.0 | Initial version created. |
