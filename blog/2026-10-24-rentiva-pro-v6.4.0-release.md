---
slug: rentiva-pro-v6.4.0-release
title: "Rentiva Pro 6.4.0 — Transfers take the deposit you set, the transfer cart is priced on the server, and safe editor previews"
authors: [maxhandmade]
tags: [release, rentiva, pro, transfer, payments, elementor, security]
date: 2026-10-24T06:30
---

6.4.0 makes transfers charge what your settings say. The transfer cart now prices every transfer on the server and takes the deposit set under Settings > Transfer; before, it took the browser's price and always charged in full. Pro widgets show safe previews in the editors, and Pro e-mails get translated names and the site language. No database step runs on update. **Update MHM Rentiva (Lite) to 6.3.0 first, then Pro.** Beside Rentiva 6.2.1 or older, Pro 6.4.0 switches its features off until Rentiva is updated, so do the two updates back to back.

<!--truncate-->

:::caution Check your transfer deposits
Transfers now take the deposit you set under **Settings > Transfer** instead of the full amount. **A vehicle's own deposit rate wins:** a vehicle that stores its own rate (the old default wrote 10) takes that deposit on transfers too, even when the transfer setting is "Full payment required". Empty the vehicle's deposit field to make it follow the transfer setting. **Vendor commission is computed on the amount charged online**, so on such a transfer it is calculated on the deposit; a remainder collected offline creates no commission record.
:::

## Transfers charge what your settings say

- **The transfer deposit setting applies.** Whatever was chosen under Settings > Transfer ("Payment Type" / "Deposit Rate (%)"), transfers used to be charged in full. The cart now takes the deposit you set.
- **A vehicle's own deposit rate overrides the transfer setting**, as it does for rentals — see the box above.
- **Vendor vehicles** no longer get a fixed 20% deposit; they follow the site-wide setting.
- On Settings > Transfer, the deposit rate field starts at 1 (choose "Full payment required" for no deposit), and the screen explains that a vehicle's own rate wins.
- Custom location types saved on the Transfer tab now take effect; an older stored value no longer hides them.

## A transfer cart priced on the server

- **Every transfer is priced on the server.** A price sent by the browser is ignored.
- **A vehicle the transfer search does not offer for that route cannot be added** — not offered for transfer, busy, route not assigned, or too small.
- **The vendor vehicle form no longer accepts a deposit value it does not show.** A vendor could send one by hand and lower both the deposit and the commission base.
- **Cart and order lines read "VIP Transfer: A ➝ B"** in the block cart, the mini cart and the saved order, instead of the generic booking name. Each add-on is listed once with its price, the extra "Add-ons total" row is gone, the return-date row is hidden in every site language, and the "Duration" row on orders is now "Estimated Duration", as in the cart.

## Elementor and the editors

- **Transfer Results (11 settings) and My Messages (1 setting)** Elementor widgets have an "Additional Settings" section with the same settings as their blocks. The defaults equal today's output, so saved pages look the same.
- **Safe previews.** In the Elementor and block editors, Transfer Results, Vendor Profile, My Messages, Transfer Search, Popular Routes and Vendor Directory render inside the same preview frame as Rentiva's widgets. Until you pick search locations or a vendor they show sample transfers, a sample vendor and sample message threads with a note; picked locations run a real search and a picked vendor shows that profile. Your own messages never appear and the forms are inert. Vendor Profile explains when no vendor is found instead of showing an empty box.
- **Pro blocks are translated** and sit in the "Rentiva" category together with the Rentiva blocks. The "MHM " prefix was removed from Pro widget and block names, and two block titles changed: "Messages" is now "My Messages" and "Popular Transfer Routes" is now "Popular Routes".

## E-mails

- **The e-mail preview lists all 31 Pro templates by translated name** (they showed "Vendor approved", "Payout approved" and so on in English), each filled with sample vendor, payout, commission, report and message data instead of empty gaps.
- **Pro e-mails use the site language**, together with Rentiva's, even while an admin with another profile language is working.

## Fixes

- The personal-data export includes the customer's favourite vehicles again.
- Error messages on the My Messages screen show their text; four of them were empty.
- Transfer Results no longer serves a stale cached result when settings change twice within the same second, and its `columns` setting has a minimum of 1, so 0 or a non-number no longer produces an empty grid.
- The transfer duration unit ("min") is translated.
- **Turkish:** "Deposit Rate (%)" now reads "Kapora oranı", "Full Payment Required" reads "Tam ödeme gerekli", e-mail strings say "etkin", and pickup / drop-off wording moved toward "Teslim alma / Dönüş".

:::caution Known limitation (unchanged from 6.3.0)
A vendor whose IBAN could not be read after the 6.3.0 update cannot request a payout until the IBAN is entered again, and 6.4.0 still has no form for entering it. The admin notice lists each such vendor.
:::

## For developers

Requires MHM Rentiva 6.3.0 (raised from 6.2.0). Removed: an old Transfer settings page that no menu or link reached, its save handler and the `admin_post_mhmrentiva_save_transfer_settings` action. The transfer cart reads only the Transfer tab's `mhmrentiva_transfer_deposit_*` keys, no longer `rentiva_transfer_deposit_*`. Pro hooks Rentiva's `mhmrentiva_cart_item_name`, `mhmrentiva_email_template_labels`, `mhmrentiva_email_preview_context` and `mhmrentiva_parity_labels`. The `_html` filters of Vendor Directory, Vendor Profile and Popular Routes now also receive the early empty outputs, with normalised attributes.

---

**Where to get it.** Pro 6.4.0 is published on GitHub as `v6.4.0` and served through the Rentiva Pro download on wpalemi.com. Update [Rentiva to 6.3.0](/blog/rentiva-v6.3.0-release) first. The full changelog ships with the plugin in both languages.
