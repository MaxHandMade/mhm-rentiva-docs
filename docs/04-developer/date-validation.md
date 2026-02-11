---
id: security-validate-date
title: Tarih Doğrulama (SecurityHelper::validate_date)
sidebar_label: Tarih Doğrulama
---

Bu doküman `MHMRentiva\Admin\Core\SecurityHelper::validate_date` metodunun davranışını ve kullanılmasını açıklar.

## Amaç
Gelen tarih değerlerini güvenli biçimde doğrulayıp ISO (YYYY-MM-DD) formatına dönüştürür. Kullanıcıdan veya üçüncü taraflardan gelen farklı ayracı olan tarihleri destekler.

## Davranış
- Öncelikle boş veya geçersiz girişlerde `InvalidArgumentException` fırlatılır.
- ISO formatı (`YYYY-MM-DD`) doğrudan kabul edilir.
- WordPress'in `date_format` ayarına göre yerel format (`d/m/Y` gibi) parse edilir ve ISO'ya dönüştürülür.
- Yaygın formatlar (`d/m/Y`, `m/d/Y`, `d-m-Y`, `Y/m/d`) denenir.
- Son çare olarak `strtotime` kullanılır; önce `/`, `.`, ve boşluk karakterleri `-` ile normalleştirilir (ör: `2026.01.28` -> `2026-01-28`).

:::warning
`strtotime` sunucu ayarlarına (locale/timezone) bağlı farklı sonuçlar verebilir. Mümkünse ISO (`YYYY-MM-DD`) veya açık WP formatı kullanın.
:::

## Örnekler
```php
use MHMRentiva\Admin\Core\SecurityHelper;

try {
    // ISO
    $iso = SecurityHelper::validate_date('2026-01-28'); // returns '2026-01-28'

    // WP yerel format (ör. d/m/Y)
    $iso2 = SecurityHelper::validate_date('28/01/2026'); // returns '2026-01-28'

    // Nokta ile ayrılmış tarih (normalize edilir)
    $iso3 = SecurityHelper::validate_date('2026.01.28'); // returns '2026-01-28'
} catch (\InvalidArgumentException $e) {
    // Hatalı format
}
```

## Öneriler
- API veya frontend tarafında tarihleri ISO formatında kabul edip gönderin.
- Kullanıcı girişinde tarih picker kullanarak format karışıklığını önleyin.

## İlgili
- `src/Admin/Core/SecurityHelper.php` — `validate_date` metodu
