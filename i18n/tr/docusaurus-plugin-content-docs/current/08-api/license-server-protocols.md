---
id: license-server-protocols
title: Lisans Sunucusu ve Güvenlik Protokolleri
sidebar_label: Lisans Protokolleri
sidebar_position: 105
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-security_hardened-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva, lisans doğrulama ve aktivasyon süreçlerini harici lisans sunucusu (`https://api.maxhandmade.com/v1`) ile asenkron ve yüksek güvenlikli bir protokol üzerinden yürütür.
:::

# 🛡️ Lisans Sunucusu ve Güvenlik Protokolleri

Sistem, lisans anahtarlarının manipülasyonunu ve "Man-in-the-Middle" (Ortadaki Adam) saldırılarını engellemek için **HMAC-SHA256** imzalama ve veri şifreleme yöntemlerini zorunlu kılar.

---

## 🏗️ 1. Haberleşme Mimarisi

Eklenti, `LicenseManager` servisi aracılığıyla tüm lisans operasyonlarını yönetir.

| Kriter | Teknik Detay |
| :--- | :--- |
| **İmza Yöntemi** | HMAC-SHA256 (Hash-based Message Authentication Code) |
| **Şifreleme** | Veri akışı `TLS 1.2/1.3` (HTTPS) üzerinden şifrelenir. |
| **Doğrulama** | Paylaşılan Gizli Anahtar (Shared HMAC Secret) ile çift taraflı imza kontrolü. |
| **API Anahtarı** | Sunucu tanımlaması için `MHM_RENTIVA_LICENSE_API_KEY` kullanılır. |

---

## ✍️ 2. İmza Oluşturma (Signature Generation)

İmza, her istek için dinamik olarak oluşturulur ve `X-MHM-SIGNATURE` başlığıyla gönderilir.

### A. Kanonik Mesaj (Canonical Message) Yapısı
İmza atılmadan önce aşağıdaki veriler birleştirilerek ham (raw) mesaj oluşturulur:
1. **HTTP Metodu:** (Örn: `POST`)
2. **Kanonik Path:** (Örn: `/v1/licenses/validate`)
3. **Timestamp:** (Örn: `1709825400`)
4. **Ham Kayıt (Raw Body):** JSON formatında gönderilen veri seti.

### B. PHP İmza Kod Örneği
```php
$message   = "POST" . "/v1/licenses/validate" . "1709825400" . $raw_body;
$signature = hash_hmac('sha256', $message, $hmac_secret);
```

---

## 📡 3. HTTP Güvenlik Başlıkları (Headers)

İstek güvenliğini sağlamak için kullanılan özel başlıklar:

- **`X-MHM-API-KEY`:** Tanımlayıcı Lisans API Anahtarı.
- **`X-MHM-TIMESTAMP`:** İsteğin zaman damgası (+/- 300 saniye tolerans).
- **`X-MHM-SIGNATURE`:** `HMAC-SHA256` ile üretilen dijital imza.
- **`X-MHM-SITE-HASH`:** Sitenin benzersiz, tek yönlü şifrelenmiş kimliği.
- **`X-Environment`:** Mod (`production`, `staging`, `development`).

---

## ⏳ 4. Hata Yönetimi ve Grace Period (Esneklik Süresi)

Sunucu ile bağlantı koptuğunda eklenti hemen devre dışı kalmaz:

1. **7 Günlük Grace Period:** Eğer site daha önce aktifse ve son başarılı kontrolden sonra 7 günden az süre geçtiyse, bağlantı hatası olsa bile "Active" durumunu korur.
2. **Offline Mod Denetimi:** Kritik fonksiyonlar (Örn: Ödeme alma) bu sürede kısıtlanmaz, ancak 7. günün sonunda geçerli bir doğrulama yapılamazsa Pro özellikler deaktive edilir.
3. **SSL Verification:** Üretim ortamında SSL sertifika doğrulaması zorunludur.

## Bölüm Sonu Özeti
- Lisans protokolü, eklentinin fikri mülkiyetini ve kullanıcı veri bütünlüğünü korur.
- HMAC-SHA256 ile isteklerin değiştirilmediği (integrity) garanti edilir.
- Grace Period mekanizması ile sunucu kesintilerinden kullanıcı deneyimi etkilenmez.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | HMAC imza mimarisi, Grace Period ve Offline Mod kuralları detaylandırıldı. |
