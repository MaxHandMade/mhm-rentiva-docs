---
id: vendor-management
title: Tedarikçi Ekosistemi (Vendor Management)
sidebar_label: Vendor Yönetimi
sidebar_position: 1
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

:::info Amaç
Rentiva, merkezi bir araç kiralama sisteminden çoklu tedarikçili (Multi-Vendor) bir pazar yerine dönüşebilir. Bu doküman, tedarikçi döngüsünü teknik detaylarıyla açıklar.
:::

# 🤝 Tedarikçi Yönetimi

Sistemde bir kullanıcının "Vendor" (Tedarikçi) olması için geçmesi gereken aşamalar ve bu sürecin arkasındaki teknik yapılar aşağıda özetlenmiştir.

---

## 🏗️ 1. Tedarikçi Rolü ve Yetkilendirme

### `rentiva_vendor` Rolü
Onaylı her tedarikçiye atanan bu rol, şu yetkileri (capabilities) beraberinde getirir:
- `edit_posts`: Kendi araçlarını ekleyebilir.
- `upload_files`: Araç görselleri yükleyebilir.
- `read`: Vendor paneline erişebilir.

### 🛡️ Mülkiyet Zorunluluğu (`VendorOwnershipEnforcer`)
Tedarikçilerin birbirlerinin araçlarına veya rezervasyonlarına erişmesini engellemek için `user_has_cap` filtresi kullanılır:
- Bir vendor sadece `post_author` değeri kendi `user_id`'si ile eşleşen `vehicle` kayıtlarını düzenleyebilir.
- Admin portalında "All Vehicles" listesi vendor için sadece kendi kayıtlarına filtrelenir.

---

## 📋 2. Başvuru Yönetimi (`mhm_vendor_app`)

Tedarikçi adaylarının verileri `mhm_vendor_app` Custom Post Type (CPT) içinde saklanır:
- **Onboarding Akışı:** `Pending` (İnceleme) → `Approved` (Onaylandı) / `Rejected` (Reddedildi).
- **Veri Güvenliği:** Başvuru sırasında alınan IBAN bilgileri `VendorApplicationManager::encrypt_iban()` ile **AES-256-CBC** metoduna göre şifrelenir.
- **Evrak Takibi:** Kimlik, ehliyet ve ikametgah belgeleri `_vendor_doc_*` meta anahtarları altında WordPress Media Library ile ilişkilendirilir.

---

## ⚙️ 3. Operasyonel Kontroller

### Onay ve Meta Senkronizasyonu (`VendorOnboardingController`)
Admin bir başvuruyu onayladığında:
1. `mhm_vendor_app` kaydındaki telefon, şehir ve IBAN bilgileri kullanıcının (WP_User) meta tablolarına kopyalanır.
2. Kullanıcının rolü `customer`'dan `rentiva_vendor`'a yükseltilir.
3. `mhm_rentiva_vendor_approved` kancası (hook) tetiklenerek hoş geldin e-postası gönderilir.

### Profil Yönetimi (`VendorProfileExtension`)
WordPress profil sayfası (`wp-admin/profile.php`), vendorlara özel alanlarla genişletilmiştir:
- **Mağaza Bilgileri:** Bio, vergi numarası ve hizmet bölgeleri.
- **Finansal Bilgiler:** Maskelenmiş IBAN görünümü (örn: TR***5678).

---

## 🔄 Yaşam Döngüsü Özeti

```mermaid
graph LR
    A[Aday Başvurusu] --> B{Admin İnceleme}
    B -- Red --> C[E-posta Bildirimi]
    B -- Onay --> D[Rol Atama: rentiva_vendor]
    D --> E[Meta Veri Senkronizasyonu]
    E --> F[Araç Ekleme Yetkisi]
```

## Bölüm Sonu Özeti
- `VendorOwnershipEnforcer` ile veri izolasyonu garanti altına alınmıştır.
- Tüm kritik başvuru verileri şifrelenmiş olarak saklanır.
- `rentiva_vendor` yetkileri sadece kendi mülkiyetindeki postlar için geçerlidir.

## Değişiklik Günlüğü
| Tarih | Sürüm | Not |
|---|---|---|
| 19.03.2026 | 4.21.2 | CPT, Enforcer ve Onboarding detayları eklendi. |
