---
id: shortcodes-overview
title: All Shortcodes List
sidebar_label: All Shortcodes List
sidebar_position: 1
slug: /features-usage/shortcodes/overview
---
![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

The Shortcodes section is the central hub of the architecture that integrates all of MHM Rentiva's frontend functionality with WordPress. The system includes **24 active shortcodes** in total. You can place these anywhere on your site using either the classic text editor or page builder integrations.

---

## 🏗️ Gutenberg Blocks and Elementor Support

MHM Rentiva embraces modern WordPress architecture. All **24 listed shortcodes** here produce a standard "Render Output" under the hood.

- **Gutenberg Blocks:** All shortcodes are available as native drag-and-drop blocks in the Gutenberg editor — no manual shortcode entry required. Shortcode parameters are reflected in the block settings (Inspector) panel on the right.
- **Elementor Widgets:** The plugin's own components are available as widgets in the Elementor panel. When using Elementor, you can add the relevant component and configure its visual settings without entering a shortcode (`[rentiva_...]`).

In both cases, the rendering backend (Render Parity) is powered by a single source — the shortcode infrastructure on this page.

---

## 📋 24 Active Shortcodes and Their Usage

The system provides shortcodes organized into 6 main categories by function. Below you will find each shortcode with parameter examples.

### 1. Booking Module
Essential shortcodes for starting and completing the rental flow:

**1. Booking Form:** Form for selecting rental dates, insurance, and add-ons.
*   **Shortcode:** `[rentiva_booking_form]`
*   **Key Parameters:** `vehicle_id`, `show_payment_options`, `show_addons`
*   **Example:** `[rentiva_booking_form vehicle_id="101" show_payment_options="1" show_addons="1"]`

**2. Availability Calendar:** Renders the monthly or daily availability calendar for a vehicle.
*   **Shortcode:** `[rentiva_availability_calendar]`
*   **Key Parameters:** `vehicle_id`, `months_to_show`, `show_pricing`
*   **Example:** `[rentiva_availability_calendar vehicle_id="101" months_to_show="2" show_pricing="1"]`

**3. Booking Confirmation:** Payment and booking detail verification page.
*   **Shortcode:** `[rentiva_booking_confirmation]`
*   **Key Parameters:** `show_print_btn`, `show_download_pdf`
*   **Example:** `[rentiva_booking_confirmation show_print_btn="1" show_download_pdf="1"]`

### 2. Vehicle Listing & Search Module
Visualizes vehicle filtering and vehicle detail processes for customers:

**4. Vehicle Details:** Lists all attributes of a single vehicle.
*   **Shortcode:** `[rentiva_vehicle_details]`
*   **Key Parameters:** `vehicle_id`, `show_gallery`, `show_features`, `show_similar_vehicles`
*   **Example:** `[rentiva_vehicle_details vehicle_id="45" show_gallery="1"]`

**5. Vehicles List (List View):**
*   **Shortcode:** `[rentiva_vehicles_list]`
*   **Key Parameters:** `limit`, `category`, `orderby`, `order`
*   **Example:** `[rentiva_vehicles_list limit="10" order="asc"]`

**6. Featured Vehicles:**
*   **Shortcode:** `[rentiva_featured_vehicles]`
*   **Key Parameters:** `limit`, `autoplay`, `layout`
*   **Example:** `[rentiva_featured_vehicles limit="6" autoplay="1" layout="grid"]`

**7. Vehicles Grid (Grid View):**
*   **Shortcode:** `[rentiva_vehicles_grid]`
*   **Key Parameters:** `limit`, `columns`, `category`, `show_price`
*   **Example:** `[rentiva_vehicles_grid limit="12" columns="3" category="suv"]`

**8. Unified Search:** Combined rental search form.
*   **Shortcode:** `[rentiva_unified_search]`
*   **Key Parameters:** `default_tab`, `show_location_select`, `style`
*   **Example:** `[rentiva_unified_search default_tab="rental" style="glass"]`

**9. Search Results View:** Vehicle grid format returned from search.
*   **Shortcode:** `[rentiva_search_results]`
*   **Key Parameters:** `layout`, `results_per_page`, `show_filters`
*   **Example:** `[rentiva_search_results layout="grid" results_per_page="12"]`

**10. Vehicle Comparison:** Side-by-side feature comparison.
*   **Shortcode:** `[rentiva_vehicle_comparison]`
*   **Key Parameters:** `max_vehicles`, `show_technical_specs`
*   **Example:** `[rentiva_vehicle_comparison max_vehicles="4" show_technical_specs="1"]`

### 3. User Account Module
(**Auth=Yes** — only active for logged-in users):

**11. Customer Dashboard:** Customer summary screen.
*   **Shortcode:** `[rentiva_user_dashboard]`
*   **Key Parameters:** (Standard dashboard with no additional required parameters)
*   **Example:** `[rentiva_user_dashboard]`

**12. My Bookings:** Active or historical booking list.
*   **Shortcode:** `[rentiva_my_bookings]`
*   **Key Parameters:** `limit`, `status`
*   **Example:** `[rentiva_my_bookings limit="10" status="confirmed"]`

**13. My Favorites:** Vehicles saved to favorites by the user.
*   **Shortcode:** `[rentiva_my_favorites]`
*   **Key Parameters:** `limit`, `columns`, `show_availability_status`
*   **Example:** `[rentiva_my_favorites columns="4"]`

**14. Payment History:** Transaction receipts and records.
*   **Shortcode:** `[rentiva_payment_history]`
*   **Key Parameters:** `limit`, `show_invoice_download`
*   **Example:** `[rentiva_payment_history limit="20" show_invoice_download="1"]`

**15. Commission Resolver:** Affiliate / Vendor-specific system.
*   **Shortcode:** `[rentiva_commission_resolver]`
*   **Key Parameters:** -
*   **Example:** `[rentiva_commission_resolver]`

### 4. Transfer Services Module

**16. Transfer Search Form:** Passenger pickup / drop-off selection.
*   **Shortcode:** `[rentiva_transfer_search]`
*   **Key Parameters:** `show_pickup`, `show_dropoff`
*   **Example:** `[rentiva_transfer_search show_pickup="1" show_dropoff="1"]`

**17. Transfer Results:** Transfer tariff listing.
*   **Shortcode:** `[rentiva_transfer_results]`
*   **Key Parameters:** `limit`, `show_luggage_info`
*   **Example:** `[rentiva_transfer_results limit="10" show_luggage_info="1"]`

### 5. Support & Engagement Module

**18. Messages (Ticket System):**
*   **Shortcode:** `[rentiva_messages]`
*   **Key Parameters:** `limit_items`, `show_thread_preview`
*   **Example:** `[rentiva_messages limit_items="20"]`

**19. Contact Feedback Form:**
*   **Shortcode:** `[rentiva_contact]`
*   **Key Parameters:** `recipient_email`, `show_map`, `show_booking_id_field`
*   **Example:** `[rentiva_contact recipient_email="info@rentiva.com" show_map="1"]`

**20. Testimonials / Reviews:**
*   **Shortcode:** `[rentiva_testimonials]`
*   **Key Parameters:** `limit`, `columns`, `filter_rating`
*   **Example:** `[rentiva_testimonials limit="5" columns="3" filter_rating="5"]`

**21. Vehicle Rating & Review Form:**
*   **Shortcode:** `[rentiva_vehicle_rating_form]`
*   **Key Parameters:** `vehicle_id`, `require_booking`, `show_photo_upload`
*   **Example:** `[rentiva_vehicle_rating_form vehicle_id="45" require_booking="1"]`

**22. Home Page Proof of Concept (POC):**
*   **Shortcode:** `[rentiva_home_poc]`
*   **Key Parameters:** (Experimental)
*   **Example:** `[rentiva_home_poc]`

### 6. Vendor Module
For business partners who want to list their vehicles for rental on the platform:

**23. Vendor / Company Application Form:**
*   **Shortcode:** `[rentiva_vendor_apply]`
*   **Key Parameters:** -
*   **Example:** `[rentiva_vendor_apply]`

**24. Vehicle Submission Screen:**
*   **Shortcode:** `[rentiva_vehicle_submit]`
*   **Key Parameters:** (Account verification parameters)
*   **Example:** `[rentiva_vehicle_submit]`

---

## 🛠️ Management and Missing Page Check

The MHM Rentiva > Shortcode Pages (Dashboard screen) provides the following information to help admins:

*   **19 Active Page Messages:** When the plugin is installed, it automatically creates the **main URL pages linked to 19 of these shortcodes** (`/booking/`, `/support/`, etc.) and shows them as "Active". The remaining shortcodes can be added to extra pages as needed (e.g. `/vendor-panel/`).
*   **Debugging & Caching:** If a shortcode is accidentally removed from a page, the **"Missing Pages"** counter and the "Debug" button in the panel allow you to identify which function is no longer live.

### Section Summary
- **24 Shortcodes:** Covers every point in your project from bookings to B2B.
- **Single-Point Rendering:** Use shortcodes in the classic editor, Elementor, or Gutenberg — all are powered by the same core system.
- **Parametric Flexibility:** Pass external data to each shortcode to change layout, query limits, and more.


