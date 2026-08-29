---
slug: rentiva-pro-v6.0.0-release
title: "Rentiva Pro 6.0.0 — Everything is named consistently, and suspension finally means suspension"
authors: [maxhandmade]
tags: [release, rentiva, pro, vendors, security, breaking]
date: 2026-08-29T05:00
---

This is a major release, and the first Pro build published since 5.2.3 at the end of July. Two sentences cover most site owners: **update MHM Rentiva to 6.1.3 first, then Pro**, and your data moves itself the next time you open the admin. Everyone else — anyone with custom code hooked into Pro — has a short list to read first, because 70 hook names changed and nothing warns you when one stops firing.

<!--truncate-->

## Read this first if you have custom code

Pro's identifiers moved onto one consistent prefix, the same way the free plugin's did in its own 6.0.0. That is a good thing to have done once and a bad thing to discover by accident, so here is the whole of it.

**The hook rule is one step.** Replace `mhm_rentiva_` with `mhmrentiva_`. So `mhm_rentiva_payout_approved` becomes `mhmrentiva_payout_approved`. Three message hooks used a plain `mhm_` prefix and follow the same rule: `mhm_message_created`, `mhm_message_read` and `mhm_message_status_changed`.

**One hook the rule does not describe.** `mhm_rentiva/currency_symbol` used a slash where every other name used an underscore. It is now `mhmrentiva_currency_symbol`.

**One filter is gone rather than renamed.** `mhm_rentiva_vendor_apply_endpoint_slug` was swept to the new prefix like everything else, and has now been removed outright — because it never worked. It was applied only where the post-submission redirect is built, while the code that *registers* the vendor-application endpoint never read it, in this version or in 5.2.3. Anyone who set it was redirected to an address WordPress had not been told about, and landed on a 404. We removed it rather than wiring it up, because the address of an endpoint here is an identifier fixed to your site's language, not a label for other code to rewrite.

**The part that catches people is not our hook names.** Pro's three content types were renamed, and that changes the WordPress hooks derived from them:

| Was | Is now |
| --- | --- |
| `mhm_message` | `mhmrentiva_message` |
| `mhm_payout` | `mhmrentiva_payout` |
| `mhm_vendor_app` | `mhmrentiva_vendor` |

So `save_post_mhm_payout` is now `save_post_mhmrentiva_payout`, and the same applies to the `add_meta_boxes_*` and `manage_*_posts_columns` families. Any `WP_Query`, `get_posts` or `pre_get_posts` check naming an old type now matches nothing at all, quietly.

Note the third row. `mhm_vendor_app` did **not** become `mhmrentiva_vendor_app` — that name is 21 characters and WordPress stores a content type in a 20-character column, so registering it fails outright and the content type would simply cease to exist. It is `mhmrentiva_vendor`.

**Before updating, search your custom code for** `mhm_rentiva`, `mhm_message_`, `save_post_mhm_payout`, and the quoted values `'mhm_message'`, `'mhm_payout'` and `'mhm_vendor_app'`.

**Your shortcodes were deliberately left alone.** `rentiva_vendor_profile`, `rentiva_vendor_directory`, `rentiva_vendor_ledger`, `rentiva_transfer_search`, `rentiva_transfer_results`, `rentiva_popular_routes` and `rentiva_messages` keep the names they have always had, because those names are saved inside the content of your pages. Renaming them would have blanked live pages. Pages built with them need no attention.

## Your data moves itself

Twenty settings, four database tables — the commission ledger, commission policy, vendor reports and the background-job queue — ten scheduled jobs and the custom fields on Pro's content types are all moved to the new names by a migration that runs once, the first time an administrator, WP-CLI or a scheduled job reaches the site after the update. Nothing is deleted and nothing has to be re-entered.

## Update the free plugin first

Pro has always declared which version of MHM Rentiva it needs. Until now it never checked: the only test asked whether the free plugin was installed, never whether it was recent enough.

It checks now, and it needs **6.1.1 or newer**. Below that, Pro registers nothing, touches no data and shows a notice naming both versions — which is also why updating in the wrong order is safe rather than destructive. It simply waits. In 5.2.3 the same mismatch produced a fatal error on the vendor panel instead of a message.

## Suspension now means suspension

Three things were wrong at once here, and together they made a suspended vendor less suspended than the screen claimed.

A suspended vendor **kept the ability to edit and delete their own vehicle listings**. Suspension removes the vendor role and drafts those listings, but a permission filter was handing edit and delete rights back on any vehicle the caller had authored. Booking history included. The half of that filter that grants rights now asks whether the vendor is active; the half that restricts stays exactly as wide as it was.

Suspending was also **a one-way door**. It worked, and every attempt to lift it afterwards failed with "vendor not found" — permanently — while the screen went on listing the vendor as suspended and went on offering the button. Five endpoints were asking for a role that suspension removes. An operator could not correct a suspended vendor's city or commission rate either.

And a suspended vendor's **pending bank-account change request vanished** from the operator's tab and its counter, because those were also listing by role. A request that arrived just before a suspension can now still be resolved.

Separately, two older form handlers took a user id straight from the request and wrote vendor status onto it — pointed at any account, one could mark a stranger as a suspended vendor and draft everything they had authored. Nothing in the plugin generates the tokens those handlers require, so they were unreachable in practice, but they were the same operation behind a weaker gate than the routes actually in use. Both now verify the target and refuse visibly.

## Five admin screens that were not working

Five Pro admin screens were reading the free plugin's list of REST endpoints, which does not describe Pro's own — so each screen loaded and then failed. Pro now ships its own map, and a check compares that map against the routes actually registered. Two further screens that went blank instead of showing an error when data was missing are now contained, so the rest of the page survives.

The vendor dashboard is fixed too: a vendor holding a valid licence was being resolved as a customer, which cost them their navigation and their panel, and the financial figures at the top read zero instead of reading the commission ledger.

## You will now be told when a new Pro exists

Pro is distributed from wpalemi.com rather than the WordPress.org directory, so WordPress's own update check has never had anything to say about it — and until now, neither did we. The Plugins screen now shows a line of our own when a newer version is available. It does not join WordPress's update pipeline; it just tells you.

## Also fixed

A group of paid capabilities had stopped working when the free plugin removed code Pro had been borrowing: the add-on context cluster, the vehicle reliability and penalty cluster, message-notification email bodies, the relocated email templates together with any overrides you had saved, the paid shortcodes' attribute definitions, the premium transfer-results stylesheet, and the vendor role itself.

Pro was also not loading its own translation catalogue, so its Turkish never appeared. Transfer-only add-ons were being offered on the rental side. The reports screen was writing a translated label into a booking's status field. And the database migrations now run on MySQL 8 as well as MariaDB.

---

The full changelog ships with the plugin in both languages. If you are updating from 5.2.3, everything above happened in between.
