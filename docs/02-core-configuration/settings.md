---
id: settings
title: Genel Ayarlar
sidebar_label: Genel Ayarlar
slug: /core-configuration/settings
---

# Ayarlar (Settings)

MHM Rentiva, eklentinin davranışını özelleştirmeniz için kapsamlı bir ayar paneli sunar. Ayarlara **MHM Rentiva > Settings** menüsünden ulaşabilirsiniz.

Aşağıda her bir ayar sekmesinin ve içerdiği seçeneklerin detaylı açıklamaları bulunmaktadır.

## 1. Genel Ayarlar (General Settings)
Eklentinin temel yapılandırma seçeneklerini içerir.

:::info 📸 EKRAN GÖRÜNTÜSÜ GEREKLİ
Bu alana `Genel Ayarlar` panelinin güncel halini gösteren bir ekran görüntüsü eklenmeli.
(Dosya adı önerisi: `assets/images/settings-general-clean.png`)
:::

*   **Para Birimi:** Kiralama işlemlerinde kullanılacak para birimi.
*   **Marka Adı:** E-postalarda ve belgelerde görünecek marka adı.
*   **Destek Bilgileri:** Müşteri desteği için e-posta, telefon ve saat bilgileri. (Not: İletişim telefonu varsayılan olarak boş gelir, doldurulmalıdır).

## 2. Araç Yönetimi (Vehicle Management)
Araçların listelenmesi ve fiyatlandırılmasıyla ilgili ayarlar.
*   **Kiralama Süreleri:** Minimum ve maksimum kiralama gün sayıları.
*   **Fiyatlandırma Ayarları:**
    *   **Mevsimsel Fiyatlar:** Belirli dönemler (Yaz, Kış vb.) için fiyat çarpanları.
    *   **İndirimler:** Uzun süreli kiralamalar veya erken rezervasyonlar için indirim kuralları.
*   **Depozito Ayarları:** Depozito alma kuralları, tutarları ve ödeme yöntemleri.
*   **Görünüm Ayarları:** Araç listelerinde ve detay sayfalarında hangi bilgilerin gösterileceği (Yakıt tipi, vites vb.).

## 3. Rezervasyon Yönetimi (Booking Management)
Rezervasyon süreci ve kuralları.
*   **Rezervasyon Onayı:** Rezervasyonların otomatik mi yoksa manuel mi onaylanacağı.
*   **Varsayılan Kiralama Süresi:** Rezervasyon formunda varsayılan olarak seçili gelecek gün sayısı.
*   **İptal Politikası:** İptal süreleri ve kesinti kuralları.
*   **Müsaitlik Kontrolü:** Çakışma kontrolü ve tampon süre (iki kiralama arası temizlik süresi) ayarları.

> [Detaylı Rezervasyon Ayarları Dokümantasyonu](./booking-settings.md)

## 4. Müşteri Yönetimi (Customer Management)
Müşteri kayıt ve hesap işlemleri.
*   **Kayıt Zorunluluğu:** Rezervasyon için üyelik şartı olup olmadığı.
*   **Doğrulama:** Telefon veya e-posta doğrulama gereksinimleri.
*   **KVKK/GDPR:** Veri onayı ve gizlilik sözleşmesi metinleri.

## 5. Ödeme Ayarları (Payment Settings)
Ödeme yöntemleri ve entegrasyonlar.
*   **Ödeme Yöntemleri:** Kredi kartı, havale, kapıda ödeme seçenekleri.
*   **WooCommerce Entegrasyonu:** WooCommerce ödeme altyapısının kullanımı ile ilgili ayarlar.
*   **Ödeme Alma Zamanı:** Rezervasyon anında mı yoksa araç tesliminde mi ödeme alınacağı.

## 6. E-posta ve Bildirimler (Email & Notifications)
Otomatik gönderilen e-postaların yönetimi ve şablonların düzenlenmesi.

*   **Yönetici Bildirimleri:** Hangi durumlarda site yöneticisine e-posta gönderileceği.
*   **Müşteri Bildirimleri:** Rezervasyon alındı, onaylandı, iptal edildi gibi durumlarda müşteriye gidecek e-postalar.
*   **Şablon Düzenleyici:** "Notification Templates" sekmesinden tüm bildirim metinlerini ve konularını düzenleyebilirsiniz.
*   **Sıfırlama Seçeneği:** Ayarları varsayılana döndürmek için her sekmede bulunan "Reset to Defaults" butonunu kullanabilirsiniz.

> [Detaylı E-posta ve Şablon Dokümantasyonu](./emails.md)

## 7. Sistem ve Performans (System & Performance)
Eklentinin teknik altyapısı ve bakım işlemleri.
*   **Önnbellek (Cache):** Müsaitlik ve fiyat sorguları için önbellek ayarları.
*   **Log Kayıtları:** Sistem hatalarının ve işlem kayıtlarının tutulması.
*   **Veritabanı Bakımı:** Geçici verilerin temizlenmesi ve veritabanı optimizasyonu.
*   **Kaldırma Sırasında Verileri Temizle:** Eklenti silindiğinde tüm verilerin kalıcı olarak silinmesi (Dikkat: Geri alınamaz!).
*   **Güvenlik:** IP kısıtlamaları ve güvenli işlem ayarları.

> [Detaylı Bakım Ayarları Dokümantasyonu](./maintenance.md)

## 8. Frontend ve Görünüm (Frontend & Display)
Sitenin ön yüzündeki görsel ayarlar.
*   **Renkler ve Stiller:** Buton renkleri, form stilleri gibi görsel tercihler.
*   **Metinler ve Etiketler:** Buton metinleri, form etiketleri ve uyarı mesajlarının özelleştirilmesi.

## 9. Entegrasyon Ayarları (Integration Settings)
Dış servislerle entegrasyonlar.
*   **REST API:** Mobil uygulamalar veya dış servisler için API ayarları, token yönetimi ve güvenlik kuralları.

## Diğer Araçlar
Ayrıca ayarlar sayfasında şu yardımcı araçlar da bulunabilir:
*   **Veritabanı Temizliği:** Eski ve gereksiz verileri silme aracı.
*   **Cron Monitörü:** Zamanlanmış görevlerin durumunu kontrol etme.
*   **Ayarları Test Et:** Yapılandırmanızın doğruluğunu test etme aracı.


