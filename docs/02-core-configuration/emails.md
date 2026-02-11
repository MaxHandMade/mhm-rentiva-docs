---
id: emails
title: E-posta Şablonları
sidebar_label: E-posta Ayarları
slug: /core-configuration/emails
---

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)

MHM Rentiva, müşterilerinize ve yöneticilere gönderilen e-postaları detaylı bir şekilde yapılandırmanıza ve özelleştirmenize olanak tanır.

## 1. E-posta Yapılandırması (Email Configuration)
Genel e-posta gönderim ayarlarını buradan yönetebilirsiniz.

*   **Gönderen İsmi (From Name):** E-postaların kimden geldiği görünecek isim (Örn: Rentiva İletişim).
*   **Gönderen Adresi (From Address):** E-postaların gönderileceği adres.
*   **Test Modu:** E-postaların gerçek müşterilere gitmesini engeller, sadece belirtilen test adresine gönderir.
*   **Tasarım Ayarları:**
    *   **Başlık Görseli:** E-posta üst kısmında yer alacak logo veya görsel URL'i.
    *   **Ana Renk:** Butonlar ve başlıklar için tema rengi.
    *   **Altbilgi Metni:** E-posta en altında yer alacak telif hakkı veya iletişim bilgisi.

## 2. Bildirim Şablonları (Notification Templates)
Her işlem için farklı e-posta şablonları tanımlanmıştır. Bu şablonların konu başlıklarını ve içeriklerini özelleştirebilirsiniz.

*   **Rezervasyon Bildirimleri:**
    *   **Yeni Rezervasyon (Yönetici):** Yeni bir rezervasyon talebi geldiğinde yöneticiye gider.
    *   **Rezervasyon Onayı (Müşteri):** Rezervasyon onaylandığında müşteriye gider.
    *   **Manuel İptal (Booking Cancelled):** Rezervasyon yönetici veya kullanıcı tarafından manuel olarak iptal edildiğinde gönderilir. (Gold Standard tasarım içerir: Araç, Tarih ve İptal Durumu tablolu).
    *   **Otomatik İptal:** Ödeme zaman aşımı durumunda sistem tarafından gönderilir.
*   **Ödeme ve İade Bildirimleri:**
    *   **İade Bildirimi (Müşteri/Yönetici):** İade işlemi yapıldığında gönderilir. Eklenti para birimi ayarlarınıza göre (₺, $, €) dinamik sembol gösterir.
*   **Mesajlaşma:** Sistem içi mesajlaşma bildirimleri.

### Şablon Düzenleme
Bir şablonu seçtiğinizde editör açılır.
*   **Konu (Subject):** E-posta başlığı. `{booking_id}` gibi değişkenler kullanabilirsiniz.
*   **İçerik (Body):** HTML formatında e-posta içeriği. `get_default_settings` ile gelen Gold Standard şablonlar mobil uyumludur.

> [!TIP]
> Şablonlarda kullanabileceğiniz değişkenler editörün altında listelenmiştir (Örn: `{customer_name}`, `{booking_total}`, `{vehicle_title}`, `{pickup_date}`).

## 3. E-posta Önizleme (Email Preview)
Yaptığınız değişiklikleri kaydetmeden önce "E-posta Önizleme" sekmesinden kontrol edebilirsiniz.
*   **Mock Data (Sahte Veri):** Önizleme ekranı, seçili şablon için gerçekçi sahte veriler (Örn: "Fiat Egea", "1.500 ₺") üreterek şablonun dolu halini gösterir.
*   **Anlık Değişim:** Şablon seçimini değiştirdiğinizde (Örn: "Manuel İptal"), önizleme içeriği ilgili şablona özgü verilerle (İptal durumu, kırmızı uyarılar vb.) anında güncellenir.
*   **Test E-postası:** Önizlemeyi kendi e-posta adresinize test olarak gönderebilirsiniz.

## 4. Varsayılanlara Sıfırlama (Reset to Defaults)
Ayarlarınızda sorun yaşarsanız veya orijinal metinlere dönmek isterseniz "Reset to Defaults" (Varsayılanlara Sıfırla) özelliğini kullanabilirsiniz.

Bu işlem **kapsamlıdır** ve bulunduğunuz sekmeye göre çalışır:

*   **E-posta Konfigürasyonu Sekmesinde:** Sadece gönderen ayarları, renkler ve logo gibi genel ayarlar sıfırlanır. Şablonlarınız etkilenmez.
*   **Bildirim Şablonları Sekmesinde:** **Tüm** e-posta şablonlarınızın (konu ve içerik) varsayılan İngilizce/Temel hallerine dönmesini sağlar. Özel yazdığınız metinler silinir.

> [!WARNING]
> Şablonları sıfırlamak geri alınamaz bir işlemdir. Sıfırlamadan önce özel şablonlarınızın kopyasını almanız önerilir.
