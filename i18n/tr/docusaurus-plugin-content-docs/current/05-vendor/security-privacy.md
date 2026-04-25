---
id: security-privacy
title: Güvenlik ve Gizlilik Mimarisi (Vendor Security & Privacy)
sidebar_label: Security & Privacy
sidebar_position: 30
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Amaç
MHM Rentiva, tedarikçilerin finansal verilerini ve kişisel bilgilerini korumak için çok katmanlı bir güvenlik mimarisi (Defense-in-Depth) kullanır. Bu sayfa, şifreleme yöntemleri, veri izolasyonu ve denetim izi mekanizmalarını açıklar.
:::

# 🛡️ Güvenlik ve Gizlilik Katmanları

Tedarikçi verileri, veritabanı seviyesinden uygulama arayüzüne kadar dört ana katmanla korunur.

---

## 🔒 1. Finansal Veri Şifreleme (IBAN Security)

Tedarikçilerin IBAN bilgileri veritabanında hiçbir zaman yalın metin (plain-text) olarak saklanmaz.

### AES-256-CBC Şifreleme
- **Algoritma:** Endüstri standardı `AES-256-CBC`.
- **Anahtar Yönetimi:** WordPress `AUTH_KEY` ve `SECURE_AUTH_SALT` sabitleri kullanılarak türetilen anahtarlar.
- **Fail-Safe:** Eğer şifreleme kütüphanesi (OpenSSL) mevcut değilse, sistem veri sızıntısını önlemek için boş değer döner ve kaydı durdurur.

```php
// VendorApplicationManager::encrypt_iban();
// Şifrelenen veri base64_encode() edilerek saklanır.
```

:::warning Kritik Uyarı
`wp-config.php` içerisindeki güvenlik anahtarlarının değiştirilmesi, mevcut tüm şifreli IBAN verilerini okunamaz hale getirir. Bu anahtarların yedeği mutlaka alınmalıdır.
:::

---

## 🚦 2. Kritiği Yüksek Alan Değişiklik Onayı

IBAN gibi kritik alanların tedarikçi tarafından değiştirilmesi doğrudan gerçekleşmez, bir **Admin Onay Süreci** tetiklenir.

### IBAN Değişiklik İş Akışı
1. **Talep:** Tedarikçi yeni IBAN'ı girer.
2. **Geçici Saklama:** Yeni IBAN şifrelenerek `_mhm_rentiva_pending_iban` meta alanında saklanır.
3. **Admin Bildirimi:** Admin panelinde bir sayaç rozeti (badge) belirir.
4. **Onay/Red:** Admin onaylarsa, geçici IBAN ana IBAN alanına taşınır. Reddedilirse geçici veri silinir ve tedarikçiye e-posta gönderilir.

---

## 📁 3. Veri ve Medya İzolasyonu

Tedarikçiler, sistemdeki diğer kullanıcıların verilerine veya medya dosyalarına erişemez.

- **Medya İzolasyonu:** `ajax_query_attachments_args` filtresi ile tedarikçiler sadece kendi yükledikleri görselleri görebilir.
- **Dashboard İzolasyonu:** `VendorOwnershipEnforcer` sınıfı, tüm veritabanı sorgularına otomatik olarak `post_author` filtresi ekleyerek yetkisiz erişimi engeller.

---

## 📝 4. Denetim İzi (Audit Trail)

Tüm kritik güvenlik olayları `AdvancedLogger` üzerinden kayıt altına alınır.

| Olay | İçerik | Seviye |
|---|---|---|
| IBAN Değişikliği | "Tedarikçi #X IBAN değişikliği talep etti." | `INFO` |
| Giriş Denemesi | Başarısız tedarikçi paneli girişleri. | `WARNING` |
| Ödeme Onayı | "Admin #Y, Tedarikçi #X için ödemeyi onayladı." | `CRITICAL` |

Kayıtlar, admin panelindeki **Sistem Günlükleri** bölümünden takip edilebilir ve `mhm_rentiva_log_retention_days` ayarına göre otomatik temizlenir.

---

## ⚙️ 5. Teknik Güvenlik Özeti

| Mekanizma | Korunma Tipi | Detay |
|---|---|---|
| **Nonce (CSRF)** | Form Güvenliği | Her AJAX ve Form işlemi için benzersiz token. |
| **Capability** | Yetkilendirme | `rentiva_vendor` rolü dışındaki erişimler engellenir. |
| **Masking** | Gizlilik | Arayüzlerde IBAN'ların sadece son 4 hanesi gösterilir. |

## Bölüm Sonu Özeti
- IBAN verileri `AES-256-CBC` ile şifrelenmiş olarak saklanır.
- Kritik değişiklikler admin onayına tabidir.
- Çok katmanlı izolasyon ile tedarikçi verileri birbirinden ayrıştırılır.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | Veri şifreleme, IBAN onay akışı ve medya izolasyonu detayları eklendi. |
