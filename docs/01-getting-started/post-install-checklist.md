---
id: post-install-checklist
title: Kurulum Sonrası Kontrol Listesi
sidebar_label: Kontrol Listesi
slug: /getting-started/checklist
---

![Version](https://img.shields.io/badge/version-4.9.8-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-11.02.2026-orange?style=flat-square)

# Kurulum Sonrası Kontrol Listesi

Kurulum adımlarını tamamladıktan sonra aşağıdaki maddeleri sırayla işaretleyin. Bu liste, canlıya çıkmadan önce temel fonksiyonların çalıştığını garanti altına alır.

## Genel

- [ ] `MHM Rentiva > Settings` içinde tüm zorunlu alanlar dolduruldu.
- [ ] Para birimi, tarih ve saat formatı işletmenize uygun.
- [ ] Lisans anahtarı (Varsa) doğrulandı ve etkinleştirildi.

## Sayfalar & Kısa Kodlar

- [ ] Zorunlu sayfalar oluşturuldu ve ilgili kısa kodlar eklendi.
- [ ] `Settings > Shortcode Pages` sekmesinde her kısa kod doğru sayfaya bağlandı.
- [ ] Ana menü ve müşteri paneli bağlantıları test edildi.

## Ödeme ve E-posta

- [ ] Stripe/PayPal/PayTR sandbox anahtarları girildi, test ödemesi başarıyla tamamlandı.
- [ ] Offline ödeme talimatları düzenlendi ve makbuz yükleme senaryosu denendi.
- [ ] `Email Templates` sekmesinden test e-postası gönderildi; SMTP hatası alınmadı.

## Araç & Rezervasyon

- [ ] En az bir araç kategorisi ve örnek araç kaydedildi.
- [ ] Araç galerisi ve özel alanlar (Vehicle Settings üzerinden) sorunsuz görüntüleniyor.
- [ ] Frontend üzerinden rezervasyon oluşturuldu; admin panelinde doğru statü ile göründü.

## Müşteri Portalı

- [ ] WooCommerce "Hesabım" sayfasında Rentiva sekmeleri (Rezervasyon, Favoriler, Mesajlar) çalışıyor.
- [ ] Müşteri hesabı ile giriş/çıkış test edildi.
- [ ] Mesaj sistemi üzerinden örnek bir ileti oluşturulup yanıtlandı.

## Raporlama & Bakım

- [ ] Dashboard grafikleri veri oluşturduktan sonra güncelleniyor.
- [ ] `Export` sayfasından CSV çıktısı alınabildi.
- [ ] `Settings > Database Cleanup` sayfasında dry-run çalıştırıldı, hata alınmadı.

## Ek Adımlar

- [ ] [Lokal & Canlı Test checklist’i](../04-developer/testing-checklists.md) ile kalan senaryolar işaretlendi.
- [ ] Gerekli tüm webhooks (Stripe, PayPal, PayTR) ilgili servislerde doğrulandı.
- [ ] Varsayılan içerik (örnek araçlar vb.) temizlenip gerçek veriler eklenmeye hazır.

Bu listeyi tamamladıysanız, Rentiva canlı ortamda test edilmek için hazır demektir. Bir sonraki adım olarak ödeme ve e-posta senaryolarını canlı anahtarlarla doğrulayın.
