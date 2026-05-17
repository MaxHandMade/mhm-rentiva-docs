---
id: rest-api-v1
title: REST API v1 Overview
sidebar_label: REST API
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
The MHM Rentiva v1 REST API provides core endpoints for external system integration, mobile app support, and asynchronous operations. All endpoints are served under the `wp-json/mhm-rentiva/v1` namespace.
:::

# 🌐 REST API v1 Structure

The v1 API layer provides secure and fast data access while maintaining backward compatibility.

---

## 🔑 1. Authentication and Security

Access to API endpoints is provided through three different methods depending on the type of operation:

| Method | Use Case | Details |
|---|---|---|
| **Public** | Locations, Availability | No authentication required for publicly accessible data. |
| **Nonce** | AJAX/Web interactions | `_wpnonce` header/parameter verification required. |
| **API Key** | External Service Integrations | Authentication via `X-Rentiva-API-Key` or Bearer Token. |

---

## 🚀 2. Core Endpoints

### A. System Health (`/health`)
- **Method:** `GET`
- **Function:** Checks the existence of database tables, plugin version, and license status.
- **Response:** `{"status": "ok", "version": "4.21.2"}`

### B. Location Services (`/locations`)
- **Method:** `GET`
- **Function:** Returns defined active locations for the booking and transfer modules.
- **Parameters:** `?type=airport`, `?city=istanbul`

### C. Availability and Pricing (`/availability`)
- **Method:** `POST`
- **Function:** Checks availability for specific dates and a vehicle ID, and calculates the net price via the Pricing Engine.
- **Input:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Security Layer (AuthHelper)

`AuthHelper` is engaged for all "write" (POST/PUT/DELETE) operations:
- **Rate Limiting:** Per-minute request limit for each API key.
- **HMAC Verification:** Guarantees data integrity on webhook callbacks.

---

## 📊 4. Response and Error Format

The system returns standard JSON responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

On error:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

---

## ⚛️ 5. Admin React SPA Endpoints (v4.36.0+)

Starting in v4.36.0, all major admin pages were migrated to React SPAs. Each page is backed by a dedicated REST controller. All endpoints require `manage_options` capability.

### Dashboard (v4.36.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/dashboard/stats` | KPI cards: total bookings, revenue, active vehicles, customers |
| `GET` | `/dashboard/recent-bookings` | Paginated recent bookings widget |
| `GET` | `/dashboard/recent-transfers` | Upcoming transfers overview |

### Reports (v4.37.x)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/reports/overview` | Cross-tab summary stats |
| `GET` | `/reports/revenue` | Revenue bar chart data + daily detail list |
| `GET` | `/reports/bookings` | Booking status distribution |
| `GET` | `/reports/vehicles` | Vehicle performance KPIs + top vehicles |
| `GET` | `/reports/customers` | Customer lifecycle chart + summary metrics |

All report endpoints accept `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` for date-range filtering.

### Customers (v4.39.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/customers` | Paginated list — supports `?search=`, `?sort_by=`, `?sort_order=`, `?page=` |
| `GET` | `/customers/{id}` | Single customer detail (bookings count, total spent, first/last booking) |
| `DELETE` | `/customers/bulk` | Bulk delete — accepts `ids[]` array in request body |

### Messages (v4.40.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/messages` | Paginated inbox — filterable by status, priority, category |
| `GET` | `/messages/{id}` | Thread view for a single message |
| `POST` | `/messages/{id}/reply` | Send a reply in a thread |
| `POST` | `/messages/{id}/status` | Update message status (pending/replied/closed) |

### Vendor Reports (v4.40.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/vendor-reports` | Paginated list — filterable by status and context type |
| `GET` | `/vendor-reports/{id}` | Single report detail with full description and audit trail |
| `POST` | `/vendor-reports/{id}/resolve` | Mark as resolved (triggers penalty release or apply depending on context) |
| `POST` | `/vendor-reports/{id}/reject` | Reject report (triggers deferred penalty for vehicle_action context) |

### Vendor Management (v4.40.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/vendor-management/applications` | Pending vendor applications |
| `GET` | `/vendor-management/vendors` | Active vendor list with search/filter |
| `GET` | `/vendor-management/{id}` | Vendor detail (masked IBAN, documents, stats) |
| `POST` | `/vendor-management/{id}/approve` | Approve a pending application |
| `POST` | `/vendor-management/{id}/reject` | Reject a pending application |
| `POST` | `/vendor-management/{id}/suspend` | Suspend an active vendor |
| `POST` | `/vendor-management/{id}/unsuspend` | Unsuspend a vendor (v4.43.0) |
| `GET` | `/vendor-management/{id}/audit-log` | Commission + penalty audit log (v4.43.0) |

### Export (v4.52.0)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/admin/export/history` | Paginated export log — transient-backed, max 50 entries, 1-week TTL |
| `DELETE` | `/admin/export/{id}` | Remove a specific export history entry |
| `POST` | `/admin/export/preview` | Total record count + 5-row sample for the selected post type and date filters |

---

## Section Summary
- v1 API serves under `mhm-rentiva/v1`.
- Authentication method varies based on the criticality of the operation.
- All operations are audited via the central `AuthHelper` and `ErrorHandler`.
- Admin React SPA endpoints (v4.36.0+) all require `manage_options` capability.

## Changelog
| Date | Version | Note |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Export REST controller: `/admin/export/history`, `/admin/export/{id}`, `/admin/export/preview`. |
| 07.05.2026 | 4.43.0 | `/vendor-management/{id}/unsuspend` + `/vendor-management/{id}/audit-log` endpoints added. |
| 06.05.2026 | 4.40.0 | Messages, Vendor Reports, Vendor Management REST controllers added (12 new endpoints). |
| 10.04.2026 | 4.39.0 | Customers REST controller: `GET /customers`, `/customers/{id}`, `DELETE /customers/bulk`. |
| 05.04.2026 | 4.37.x | Reports REST controller: 5 tab endpoints with date range filter. |
| 10.05.2026 | 4.36.0 | Dashboard REST controller: /dashboard/stats, /dashboard/recent-bookings, /dashboard/recent-transfers. |
| 23.04.2026 | 4.27.2 | English translation added. |
| 19.03.2026 | 4.21.2 | v1 API architecture and security layers updated. |
