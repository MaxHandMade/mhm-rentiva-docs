---
id: post-types
title: Kayıt Türleri (Custom Post Types)
sidebar_label: Kayıt Türleri
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.23.0-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-27.03.2026-orange?style=flat-square)

:::info Amaç
Rentiva, karmaşık iş mantığını (Business Logic) yönetmek için standart WordPress tablolarını Custom Post Type (CPT) mimarisiyle genişletir.
:::

# 🗄️ Kayıt Türleri

Eklenti, verileri "Sektörel" (Araçlar/Rezervasyonlar) ve "Operasyonel" (Payoutlar/Loglar) olarak iki ana grupta saklar.

---

## 💰 1. Finansal Kayıt Türleri

### `mhm_payout` (Payout Requests)
Model B iş akışı kapsamında satıcıların ödeme taleplerini yönetir.
- **Kullanım:** Off-ledger (defter dışı) iş akışı statülerini (Pending, Approved, Processing) tutar.
- **Güvenlik:** Sadece `manage_options` veya `rentiva_financial_manager` yetkisine sahip kullanıcılar görebilir.
- **İlişki:** Her payout kaydı, veritabanındaki `mhm_rentiva_ledger` satırlarıyla Transaction ID üzerinden eşleşir.

---

## 💬 2. İletişim Kayıt Türleri

### `mhm_message` (Messages)
Müşteri, satıcı ve admin arasındaki mesajlaşma trafiğini yönetir.
- **Thread Yönetimi:** `_mhm_thread_id` meta anahtarı üzerinden mesajları gruplandırır.
- **UUID Desteği:** Thread ID'leri hem integer hem de UUID (string) formatını destekler.
- **Görünürlük:** Standart admin menüsünde gizlidir, özel bir mesajlaşma arayüzü üzerinden yönetilir.

---

## 🪵 3. Sistem ve Denetim Kayıt Türleri

### `mhm_app_log` (Application Logs)
Sistem hatalarını, kritik API çağrılarını ve denetim izlerini (Audit Trails) saklar.
- **Otomatik Temizlik (Retention):** `LogRetention::purge()` görevi ile varsayılan olarak 30 günden eski kayıtlar günlük olarak silinir.
- **Kategoriler:** Hata (Error), Bilgi (Info) ve Kritik (Critical) seviyelerinde kayıt tutar.

---

## 4. Sektorel Kayıt Turleri

Eklenti, asagidaki CPT'ler ile çalışır:
- **`vehicle`:** Kiralik araç portfoyu.
- **`vehicle_booking`:** Rezervasyon kayıtlari ve takvimi.
- **`vehicle_addon`:** Araç ek hizmetleri (cocuk koltugu, GPS, sigorta vb.).

---

## 5. Vendor Marketplace Kayıt Turleri (Pro)

### `mhm_vendor_app` (Vendor Başvurulari)
Vendor marketplace kapsaminda satici başvurularini yonetir.
- **CPT Slug:** `mhm_vendor_app` (14 karakter — WordPress 20 karakter limitine uygun). **NOT:** `mhm_vendor_application` DEGiL.
- **Kullanim:** Vendor onboarding süreci (başvuru, onay, red, askıya alma) bu CPT üzerinden yurutulur.
- **Yönetim:** `VendorApplicationManager` ile CRUD işlemleri, `VendorOnboardingController` ile durum geçişleri (approve/reject/suspend).
- **Güvenlik:** IBAN bilgileri AES-256-CBC ile şifrelenir (`OPENSSL_RAW_DATA` flag). OpenSSL yoksa bos string doner (plain text ASLA saklanmaz).
- **Dosya:** `src/Admin/Vendor/PostType/VendorApplication.php`

## Bölüm Sonu Özeti
- CPT'ler, veritabanı yukunu hafifletmek için `no_found_rows` ve limitli meta sorgulariyla optimize edilmiştir.
- Finansal kayıtlar (`mhm_payout`) asla direkt veritabanından silinmez; statu degisikligi ile arsivlenir.
- Loglar (`mhm_app_log`) performans için duzenli olarak temizlenir.
- Vendor başvurulari `mhm_vendor_app` CPT'sinde saklanir (14 karakter, WP 20-char limiti).

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 27.03.2026 | 4.23.0 | `vehicle_addon` ve `mhm_vendor_app` CPT'leri, vendor marketplace detaylari eklendi. |
| 19.03.2026 | 4.21.2 | mhm_payout, mhm_message ve LogRetention detaylari eklendi. |

