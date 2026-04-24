---
id: settings
title: Genel Ayarlar
sidebar_label: Genel Ayarlar
sidebar_position: 1
slug: /core-configuration/settings
---

![Version](https://img.shields.io/badge/version-4.21.2-blue?style=flat-square) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-19.03.2026-orange?style=flat-square)

Genel Ayarlar sayfası, eklentinin temel çalışma prensiplerini, para birimini ve şirket kimlik bilgilerini yapılandırdığınız başlangıç noktasıdır. **MHM Rentiva > Ayarlar > Genel Ayarlar** sekmesinden ulaşılır.

---

## ⚙️ Genel Yapılandırma

Bu bölümde sistemin temel görüntüleme ve para birimi tercihleri belirlenir.

- **Para Birimi:** MHM Rentiva, WooCommerce ile tam uyumlu çalışır. Eğer sitenizde WooCommerce yüklüyse, para birimi ayarı otomatik olarak WooCommerce'den çekilir (Varsayılan: TRY).
- **Para Birimi Pozisyonu:** Sembolün sağda/solda olması gibi yerleşim ayarları yine WooCommerce üzerinden merkezi olarak yönetilir.
- **Karanlık Kip (Dark Mode):** Yönetim panelinin renk şemasını belirler. 
    - **Otomatik (Sistem):** İşletim sisteminizin moduna göre (Gece/Gündüz) otomatik değişir.
    - **Açık / Kapalı:** Sabit bir görünüm tercih edebilirsiniz.

---

### 🖼️ GÖRSEL: GENEL YAPILANDIRMA EKRANI
*(Ayarlar > Genel Ayarlar sekmesi, para birimi ve görünüm tercihleri alanı)*

---

## 🏢 Marka ve İletişim Bilgileri

Buraya girdiğiniz bilgiler; müşteriye giden e-postalarda, PDF faturalarında ve iletişim formlarında otomatik olarak yer tutucu (placeholders) olarak kullanılır.

- **Marka Adı:** Şirketinizin veya markanızın tam adı.
- **Destek E-postası:** Müşteri hizmetleri için kullanılacak e-posta adresi.
- **İletişim Telefonu:** Şirketinizin resmi iletişim numarası (+90 555... formatı önerilir).
- **Destek Saatleri:** Müşteri desteği sağladığınız çalışma saatleri (Örn: 09:00 - 18:00).

---

## 💡 Teknik Notlar

:::info
Eğer para birimini değiştirmek isterseniz ve sistemde WooCommerce yüklüyse, değişikliği **WooCommerce > Ayarlar > Genel** altından yapmalısınız. MHM Rentiva bu değişikliği anlık olarak algılayacaktır.
:::

---

### Bölüm Özeti
- Sistemin temel **para birimi** WooCommerce ile senkronize çalışır.
- **Genel Yapılandırma** üzerinden admin panelinin görünümü (Karanlık Mod) ayarlanır.
- **Marka Bilgileri**, döküman ve e-posta şablonlarının kurumsal kimliğini oluşturur.

### Değişiklik Günlüğü
| Tarih | Sürüm | Not |
| :--- | :--- | :--- |
| 19.03.2026 | 4.21.2 | Genel Ayarlar dökümanı panel ekran görüntüsüne göre güncellendi. |
