---
id: rest-api-v1
title: REST API v1 Genel Bakış
sidebar_label: REST API
sidebar_position: 10
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva v1 REST API, dış sistemlerle entegrasyon, mobil uygulama desteği ve asenkron operasyonlar için temel uç noktaları sağlar. Tüm uç noktalar `wp-json/mhm-rentiva/v1` ad alanı (namespace) altında sunulur.
:::

# 🌐 REST API v1 Yapısı

v1 API katmanı, geriye dönük uyumluluğu korurken güvenli ve hızlı veri erişimi sağlar.

---

## 🔑 1. Kimlik Doğrulama ve Güvenlik

API uç noktalarına erişim, işlemin türüne göre üç farklı yöntemle sağlanır:

| Yöntem | Kullanım Alanı | Detay |
|---|---|---|
| **Public** | Konumlar, Müsaitlik | Herkese açık veriler için kimlik doğrulama gerekmez. |
| **Nonce** | AJAX/Web etkileşimleri | `_wpnonce` header/parametre doğrulaması gerekir. |
| **API Key** | Dış Servis Entegrasyonları | `X-Rentiva-API-Key` veya `Bearer Token` üzerinden doğrulama. |

---

## 🚀 2. Temel Uç Noktalar (Endpoints)

### A. Sistem Sağlığı (`/health`)
- **Metot:** `GET`
- **İşlev:** Veritabanı tablolarının varlığını, eklenti sürümünü ve lisans durumunu kontrol eder.
- **Yanıt:** `{"status": "ok", "version": "4.21.2"}`

### B. Konum Servisleri (`/locations`)
- **Metot:** `GET`
- **İşlev:** Rezervasyon ve transfer modülleri için tanımlı aktif lokasyonları döner.
- **Parametreler:** `?type=airport`, `?city=istanbul`

### C. Müsaitlik ve Fiyatlandırma (`/availability`)
- **Metot:** `POST`
- **İşlev:** Belirli tarihler ve araç ID'si için müsaitlik kontrolü yapar ve Pricing Engine üzerinden net fiyat hesaplar.
- **Girdi:** `vehicle_id`, `pickup_date`, `return_date`

---

## 🛡️ 3. Güvenlik Katmanı (AuthHelper)

Tüm "yazma" (POST/PUT/DELETE) işlemlerinde `AuthHelper` sınıfı devreye girer:
- **Rate Limiting:** Her API anahtarı için dakikalık istek sınırı.
- **HMAC Verification:** Webhook geri dönüşlerinde veri bütünlüğünü garanti eder.

---

## 📊 4. Yanıt ve Hata Formatı

Sistem standart olarak JSON yanıtlar döner:

```json
{
  "success": true,
  "data": { ... },
  "message": "İşlem başarılı."
}
```

Hata durumunda:
```json
{
  "success": false,
  "error_code": "INVALID_PARAMS",
  "message": "Eksik parametre gönderildi."
}
```

---

## ⚛️ 5. Admin React SPA Uç Noktaları (v4.36.0+)

v4.36.0 sürümünden itibaren tüm büyük yönetici sayfaları React SPA'lara taşındı. Her sayfa özel bir REST denetleyicisiyle desteklenir. Tüm uç noktalar `manage_options` yetkisi gerektirir.

### Kontrol Paneli (v4.36.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/dashboard/stats` | KPI kartları: toplam rezervasyon, gelir, aktif araçlar, müşteriler |
| `GET` | `/dashboard/recent-bookings` | Sayfalandırılmış son rezervasyonlar widget'ı |
| `GET` | `/dashboard/recent-transfers` | Yaklaşan transferlere genel bakış |

### Raporlar (v4.37.x)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/reports/overview` | Sekmeler arası özet istatistikler |
| `GET` | `/reports/revenue` | Gelir çubuk grafiği verisi + günlük detay listesi |
| `GET` | `/reports/bookings` | Rezervasyon durumu dağılımı |
| `GET` | `/reports/vehicles` | Araç performans KPI'ları + en iyi araçlar |
| `GET` | `/reports/customers` | Müşteri yaşam döngüsü grafiği + özet metrikler |

Tüm rapor uç noktaları tarih aralığı filtrelemesi için `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` kabul eder.

### Müşteriler (v4.39.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/customers` | Sayfalandırılmış liste — `?search=`, `?sort_by=`, `?sort_order=`, `?page=` destekler |
| `GET` | `/customers/{id}` | Tekil müşteri detayı (rezervasyon sayısı, toplam harcama, ilk/son rezervasyon) |
| `DELETE` | `/customers/bulk` | Toplu silme — istek gövdesinde `ids[]` dizisi kabul eder |

### Mesajlar (v4.40.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/messages` | Sayfalandırılmış gelen kutusu — duruma, önceliğe, kategoriye göre filtrelenebilir |
| `GET` | `/messages/{id}` | Tek bir mesaj için ileti dizisi görünümü |
| `POST` | `/messages/{id}/reply` | Bir ileti dizisinde yanıt gönder |
| `POST` | `/messages/{id}/status` | Mesaj durumunu güncelle (beklemede/yanıtlandı/kapatıldı) |

### Bayi Raporları (v4.40.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/vendor-reports` | Sayfalandırılmış liste — duruma ve bağlam tipine göre filtrelenebilir |
| `GET` | `/vendor-reports/{id}` | Tam açıklama ve denetim izi ile tekil rapor detayı |
| `POST` | `/vendor-reports/{id}/resolve` | Çözüldü olarak işaretle (bağlama göre ceza serbest bırakma veya uygulama tetikler) |
| `POST` | `/vendor-reports/{id}/reject` | Raporu reddet (vehicle_action bağlamı için ertelenmiş ceza tetikler) |

### Bayi Yönetimi (v4.40.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/vendor-management/applications` | Bekleyen bayi başvuruları |
| `GET` | `/vendor-management/vendors` | Arama/filtre ile aktif bayi listesi |
| `GET` | `/vendor-management/{id}` | Bayi detayı (maskeli IBAN, belgeler, istatistikler) |
| `POST` | `/vendor-management/{id}/approve` | Bekleyen bir başvuruyu onayla |
| `POST` | `/vendor-management/{id}/reject` | Bekleyen bir başvuruyu reddet |
| `POST` | `/vendor-management/{id}/suspend` | Aktif bir bayiyi askıya al |
| `POST` | `/vendor-management/{id}/unsuspend` | Bir bayiyi askıdan al (v4.43.0) |
| `GET` | `/vendor-management/{id}/audit-log` | Komisyon + ceza denetim günlüğü (v4.43.0) |

### Export (v4.52.0)

| Metot | Uç Nokta | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/admin/export/history` | Sayfalandırılmış dışa aktarma logu — transient tabanlı, maks. 50 kayıt, 1 hafta TTL |
| `DELETE` | `/admin/export/{id}` | Belirli bir dışa aktarma geçmiş kaydını siler |
| `POST` | `/admin/export/preview` | Seçili post türü ve tarih filtreleri için toplam kayıt sayısı + 5 satırlık örnek |

---

## Bölüm Sonu Özeti
- v1 API, `mhm-rentiva/v1` altında hizmet verir.
- Kimlik doğrulama, işlemin kritiklik seviyesine göre değişkenlik gösterir.
- Tüm operasyonlar merkezi `AuthHelper` ve `ErrorHandler` ile denetlenir.
- Admin React SPA uç noktalarının (v4.36.0+) tamamı `manage_options` yetkisi gerektirir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 12.05.2026 | 4.52.0 | Export REST denetleyicisi: `/admin/export/history`, `/admin/export/{id}`, `/admin/export/preview`. |
| 07.05.2026 | 4.43.0 | `/vendor-management/{id}/unsuspend` + `/vendor-management/{id}/audit-log` uç noktaları eklendi. |
| 06.05.2026 | 4.40.0 | Messages, Bayi Raporları, Bayi Yönetimi REST denetleyicileri eklendi (12 yeni uç nokta). |
| 10.04.2026 | 4.39.0 | Müşteriler REST denetleyicisi: `GET /customers`, `/customers/{id}`, `DELETE /customers/bulk`. |
| 05.04.2026 | 4.37.x | Raporlar REST denetleyicisi: tarih aralığı filtreli 5 sekme uç noktası. |
| 10.05.2026 | 4.36.0 | Kontrol Paneli REST denetleyicisi: /dashboard/stats, /dashboard/recent-bookings, /dashboard/recent-transfers. |
| 19.03.2026 | 4.21.2 | v1 API mimarisi ve güvenlik katmanları güncellendi. |
