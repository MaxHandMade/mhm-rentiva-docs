---
id: license-server-protocols
title: Lisans Sunucusu Protokolleri (Security & Signature)
sidebar_label: Lisans Protokolleri
---

# Lisans Sunucusu Haberleşme ve İmza Protokolleri

MHM Rentiva v4.21.0, harici lisans sunucusuyla (`https://api.maxhandmade.com/v1`) kurduğu tüm asenkron bağlantılarda **HMAC-SHA256** imzalama ve veri şifreleme yöntemlerini kullanır.

## 1. Haberleşme Mimarisi
Eklenti, `LicenseManager` servisi aracılığıyla lisans doğrulama, aktivasyon ve deactivasyon işlemlerini yönetir.

| Kriter | Teknik Detay |
| :--- | :--- |
| **İmza Yöntemi** | HMAC-SHA256 (Hash-based Message Authentication Code) |
| **Şifreleme** | Veri akışı `TLS 1.2/1.3` (HTTPS) üzerinden şifrelenir. |
| **Doğrulama** | Paylaşılan Gizli Anahtar (Shared HMAC Secret) ile imza kontrolü yapılır. |
| **API Anahtarı** | Sunucu tanımlaması için `MHM_RENTIVA_LICENSE_API_KEY` kullanılır. |

## 2. İmza Oluşturma (Signature Generation)
İmza, her istek için dinamik olarak oluşturulur ve `X-MHM-SIGNATURE` başlığıyla gönderilir.

### A. Canonical Message (Kanonik Mesaj) Yapısı:
İmza atılmadan önce aşağıdaki veriler birleştirilerek ham (raw) mesaj oluşturulur:
1. **HTTP Metodu:** (Örn: `POST`)
2. **Kanonik Path:** (Örn: `/licenses/validate`)
3. **Timestamp:** (Örn: `1709825400`)
4. **Ham Kayıt (Raw Body):** JSON formatında gönderilen veri seti.

### B. PHP İmza Kod Örneği:
```php
$message   = "POST" . "/licenses/validate" . "1709825400" . $raw_body;
$signature = hash_hmac('sha256', $message, $hmac_secret);
```

## 3. Gönderilen HTTP Başlıkları (Headers)
İstek güvenliğini sağlamak için kullanılan özel başlıklar:

- `X-MHM-API-KEY`: Tanımlayıcı API Anahtarı.
- `X-MHM-TIMESTAMP`: İsteğin atıldığı zaman damgası (Zaman kayması saldırılarını engellemek için +/- 5dk kontrolü yapılır).
- `X-MHM-SIGNATURE`: HMAC-SHA256 ile üretilen dijital imza.
- `X-MHM-SITE`: Sitenin benzersiz hashlenmiş kimliği.
- `X-Environment`: İsteğin atıldığı ortam (`production`, `staging`, `development`).

## 4. Hata ve Grace Period Yönetimi
Sunucu ile bağlantı koptuğunda eklenti hemen deaktive olmaz:
- **7 Günlük Grace Period:** Eğer siteniz daha önce aktifse ve son başarılı kontrolden sonra 7 günden az süre geçtiyse, bağlantı hatası olsa bile "active" durumunu simüle ederek hizmet vermeye devam eder.
- **SSL Verification:** Üretim (Production) ortamında SSL doğrulaması zorunludur ve atlatılamaz.
