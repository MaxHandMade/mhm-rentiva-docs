---
sidebar_position: 2
title: REST API
description: MHM Rentiva REST API Documentation
---

# REST API Documentation

MHM Rentiva plugin offers a comprehensive REST API for vehicle availability checks, message management, and integration with third-party applications.

## 🛡️ Security & Rate Limiting

:::warning Security Notice
This API is protected by the **Integration Settings** configured in the WordPress Admin Panel (`Rentiva > Settings > Integration`).
:::

*   **Rate Limiting:** IP-based rate limiting is active. Exceeding the configured limit (default: 60/min) will result in a `429 Too Many Requests` response.
*   **IP Restrictions:** If the **IP Whitelist** or **IP Blacklist** is configured in the settings, requests from unauthorized IPs will be rejected with a `403 Forbidden` error.
*   **HTTPS Enforcement:** If enabled, non-SSL requests will be rejected.

---

## Availability Endpoints

These endpoints are **public** but strictly rate-limited and monitored. They are used for checking vehicle availability and price calculation.

### Check Availability
Calculates price and availability for a specific vehicle.

*   **Endpoint:** `GET /mhm-rentiva/v1/availability`
*   **Method:** `GET` or `POST`
*   **Access:** Public (Rate Limited)

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `vehicle_id` | Integer | Yes | ID of the vehicle to check. |
| `pickup_date` | String | Yes | Pickup date (YYYY-MM-DD). |
| `pickup_time` | String | Yes | Pickup time (HH:mm). |
| `dropoff_date` | String | Yes | Dropoff date (YYYY-MM-DD). |
| `dropoff_time` | String | Yes | Dropoff time (HH:mm). |

### Check Availability (With Alternatives)
Checks availability and suggests alternative vehicles if the selected one is unavailable.

*   **Endpoint:** `GET /mhm-rentiva/v1/availability/with-alternatives`
*   **Method:** `GET` or `POST`
*   **Access:** Public (Rate Limited)

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `vehicle_id` | Integer | Yes | ID of the vehicle to check. |
| `pickup_date` | String | Yes | Pickup date (YYYY-MM-DD). |
| `pickup_time` | String | Yes | Pickup time (HH:mm). |
| `dropoff_date` | String | Yes | Dropoff date (YYYY-MM-DD). |
| `dropoff_time` | String | Yes | Dropoff time (HH:mm). |
| `limit` | Integer | No | Max number of alternatives (Default: 5). |

---

## Messaging Endpoints (Admin)

These endpoints allow administrators to manage customer messages. Requires `manage_options` capability (Admin).

### List Messages
active list of messages.

*   **Endpoint:** `GET /mhm-rentiva/v1/messages`
*   **Access:** Admin

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | String | No | Filter by status (new, read, replied, closed). |
| `category` | String | No | Filter by category (general, booking, support). |
| `per_page` | Integer | No | Items per page (Default: 20). |
| `page` | Integer | No | Page number. |

### Get Message Details
*   **Endpoint:** `GET /mhm-rentiva/v1/messages/{id}`
*   **Access:** Admin

### Reply to Message
*   **Endpoint:** `POST /mhm-rentiva/v1/messages/{id}/reply`
*   **Access:** Admin

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `message` | String | Yes | The reply content. |
| `close_thread` | Boolean | No | Close the thread after replying? (Default: false). |

### Update Message Status
*   **Endpoint:** `POST /mhm-rentiva/v1/messages/{id}/status`
*   **Access:** Admin

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | String | Yes | New status (new, read, replied, closed). |

---

## Messaging Endpoints (Customer)

These endpoints are for logged-in WordPress users (Customers).

### Get Messages (My Messages)
*   **Endpoint:** `GET /mhm-rentiva/v1/customer/messages`
*   **Access:** Logged-in User

### Create New Message
*   **Endpoint:** `POST /mhm-rentiva/v1/customer/messages`
*   **Access:** Logged-in User

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `subject` | String | Yes | Message subject. |
| `message` | String | Yes | Message content. |
| `category` | String | Yes | Category (general, booking, support). |
| `booking_id` | Integer | No | Associated booking ID. |
| `priority` | String | No | normal, high, urgent. |

### Get Message Thread
*   **Endpoint:** `GET /mhm-rentiva/v1/customer/messages/thread/{thread_id}`
*   **Access:** Logged-in User

### Reply to Admin
*   **Endpoint:** `POST /mhm-rentiva/v1/customer/messages/reply`
*   **Access:** Logged-in User

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `thread_id` | String | Yes | The thread ID to reply to. |
| `message` | String | Yes | Reply content. |

### Close Message
*   **Endpoint:** `POST /mhm-rentiva/v1/customer/messages/close`
*   **Access:** Logged-in User

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `thread_id` | String | Yes | The thread ID to close. |
