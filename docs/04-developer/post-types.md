---
id: post-types
title: Kayıt Türleri (Custom Post Types)
sidebar_label: Kayıt Türleri
sidebar_position: 10
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

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

## 🚗 4. Sektörel Kayıt Türleri (Dış Bağımlılıklar)

Eklenti, aşağıdaki CPT'ler ile entegre çalışır:
- **`vehicle`:** Kiralık araç portföyü.
- **`vehicle_booking`:** Rezervasyon kayıtları ve takvimi.

## Bölüm Sonu Özeti
- CPT'ler, veritabanı yükünü hafifletmek için `no_found_rows` ve limitli meta sorgularıyla optimize edilmiştir.
- Finansal kayıtlar (`mhm_payout`) asla direkt veritabanından silinmez; statü değişikliği ile arşivlenir.
- Loglar (`mhm_app_log`) performans için düzenli olarak temizlenir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | mhm_payout, mhm_message ve LogRetention detayları eklendi. |

