---
id: payments
title: Ödeme Yapılandırması
sidebar_label: Ödeme Ayarları
slug: /core-configuration/payments
---

![Version](https://img.shields.io/badge/version-4.6.2-blue?style=flat-square) ![Security](https://img.shields.io/badge/security-WPCS%20Compliant-green?style=flat-square) ![Updated](https://img.shields.io/badge/last%20updated-22.01.2026-orange?style=flat-square)

# Ödeme Yapılandırması

Ödeme yapılandırması, rezervasyonların nasıl tahsil edileceğini ve hangi ödeme yöntemlerinin kullanılacağını belirler.

## Genel Bakış

MHM Rentiva, ödemeleri iki senaryoya göre yönetir:
1.  **Frontend (Müşteri) Rezervasyonları:** Tamamen **WooCommerce** entegrasyonu üzerinden işlenir (Online veya Havale/Kapıda Ödeme dahil).
2.  **Backend (Yönetici) Rezervasyonları:** Yöneticiler manuel olarak "Offline" (Nakit/Havale) tahsilat kaydı oluşturabilir.

## Ödeme Yöntemleri

### WooCommerce ile Ödeme (Önerilen)
MHM Rentiva, tüm ödeme işlemlerini yönetmek için güçlü **WooCommerce** altyapısını kullanır. WooCommerce aktif olduğunda:

1.  **Kredi Kartı:** Iyzico, Stripe gibi sanal POS eklentilerini kullanabilirsiniz.
2.  **Banka Havalesi (Offline):** WooCommerce'in yerleşik "Banka Havalesi (BACS)" yöntemini aktif ederek "Offline" ödeme alabilirsiniz.
3.  **Kapıda Ödeme (Offline):** "Kapıda Ödeme" yöntemi ile nakit tahsilat yapabilirsiniz.

:::warning Önemli
Mevcut sürümde (v4.6.1), frontend üzerinden yapılan rezervasyonlar için **WooCommerce zorunludur**. Eklentinin kendi içinde yerleşik (standalone) bir ödeme alma formu bulunmamaktadır. "Offline" ödeme almak isteseniz bile bunu WooCommerce ödeme yöntemleri üzerinden yapmanız gerekir.
:::

## Manuel Rezervasyonlar
Yönetim panelinden (**Rentiva > Bookings > Add New**) oluşturulan manuel rezervasyonlarda, yönetici fiziksel "Offline" veya "Nakit" tahsilat kaydı girebilir. Bu işlem WooCommerce'den bağımsız çalışır.
