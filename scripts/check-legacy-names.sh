#!/usr/bin/env bash
# Pre-6.0.0 identifier probe for the documentation surface.
#
# 6.0.0 renamed this plugin's post types, taxonomies, options, meta keys,
# tables, cron hooks and 113 filter/action names. The single source of truth
# for the mapping is the plugin's own
# src/Admin/Core/Utilities/PrefixMigrationMap.php -- not this script, and not
# anybody's memory. The user-facing statement of the same rules is the 6.0.7
# release post's "Coming from 5.x?" section.
#
# What this probe answers: does any page that TEACHES THE CURRENT API still
# name an identifier that 6.0.0 removed?
#
# 🔴 SCOPE IS DELIBERATELY NARROWER THAN THE REPOSITORY, AND SAYS SO.
#    blog/ and its translations are EXCLUDED: a dated release post is a record
#    of what that version actually shipped, and rewriting it would make the
#    archive lie -- the 6.0.7 post tells 5.x users to search their own code for
#    `mhm_rentiva`, which only means something while the archive still contains
#    that spelling. Those posts carry a banner instead. The probe PRINTS the
#    excluded count every run, because a gate that silently drops a scope reads
#    as "covered everything" when it did not.
#
# 🔴 THE PROBE SINS ITS OWN BLIND SPOT FIRST. Positive fixtures that must be
#    caught, negative fixtures that must not trip. A negative tripping means
#    the probe is TOO WIDE (it would flag correct, current names); a positive
#    escaping means it is BLIND. Either way: exit 3, no scan.
#
# Usage:
#   bash scripts/check-legacy-names.sh              # scan
#   bash scripts/check-legacy-names.sh --self-test  # fixtures only
#
# Exit: 0 clean · 1 legacy names found · 2 scope missing · 3 probe broken

set -uo pipefail

# ─── Shapes ──────────────────────────────────────────────────────────────────
# A  mhm_rentiva_x   -> mhmrentiva_x      (options, hooks, nonces, settings)
# B  MHM_RENTIVA_X   -> MHMRENTIVA_X      (constants)
# C  mhm_rentiva/a/b -> mhmrentiva_a_b    (slash-style filters; two-step rule)
# D  mhm_x           -> mhmrentiva_x      (bare-mhm hooks, meta keys, tables)
# E  'vehicle' etc.  -> mhmrentiva_*      (post types / taxonomies, quoted only)
SHAPE_A='mhm_rentiva_[a-z0-9_]+'
SHAPE_B='MHM_RENTIVA_[A-Z0-9_]+'
SHAPE_C='mhm_rentiva/'
SHAPE_D='\bmhm_[a-z0-9_]+'
SHAPE_E="[\`'\"](vehicle|vehicle_booking|vehicle_addon|vehicle_category|addon_context|addon_category|mhm_app_log|mhm_email_log|mhm_contact_message)[\`'\"]"
SHAPES_RE="$SHAPE_A|$SHAPE_B|$SHAPE_C|$SHAPE_D|$SHAPE_E"

# ─── Names that keep the old spelling ON PURPOSE ─────────────────────────────
# Not "findings we tolerate" -- names 6.0.0 deliberately did not rename, so
# flagging them would be teaching the wrong correction.
#   · the two bootstrap-fallback options: recognising a pre-6.0.0 install is
#     that code path's entire job (PrefixMigrationMap::BOOTSTRAP_FALLBACK_ALLOWLIST)
#   · the operator-set wp-config constant: the site owner types it, and no
#     migration of ours reaches their wp-config
#     (PrefixMigrationMap::EXTERNAL_CONTRACT_LITERALS)
# The hyphenated `mhm-rentiva` forms (plugin slug, REST namespace
# `mhm-rentiva/v1`, text domain) never carried an underscore and are matched by
# none of the shapes above -- neg/2 and neg/3 keep it that way.
#   · the two transfer TABLES: the paid add-on still probes for the mhm_rentiva_
#     spelling as a legacy fallback, and Lite's uninstaller drops
#     both spellings, so the name is live, not stale. Note the one-underscore
#     difference: `_mhm_rentiva_transfer_locations`, the POST META, DID rename.
KEEP_RE='mhm_rentiva_db_version|mhm_rentiva_plugin_version|MHM_RENTIVA_MIGRATION_FALLBACK|mhm_rentiva_transfer_locations|mhm_rentiva_transfer_routes|mhm_rentiva_transfer_'

# ─── Shapes the word "mhm" cannot find ───────────────────────────────────────
# 🔴 Found by asking the map, not the probe. PrefixMigrationMap's postmeta and
#    usermeta prefix rules include three families that carry NO "mhm" anywhere,
#    so every shape above is structurally blind to them:
#      F  _rentiva_vendor_bio  -> _mhmrentiva_vendor_bio   (vendor meta family)
#      G  addon_price          -> mhmrentiva_addon_price   (visible addon meta)
#      H  save_post_vehicle    -> save_post_mhmrentiva_vehicle
#         (a WordPress core hook built from the renamed post type -- the class
#          the 6.0.7 post calls "the part most easily missed, because these are
#          not our hook names")
# G is quoted-context-only: "addon_" is an ordinary word fragment in prose.
# H is spelled out rather than generalised: only the core hooks that actually
# take a post-type suffix.
SHAPE_F='_rentiva_[a-z0-9_]+'
SHAPE_G="[\`'\"]addon_(price|context|category|pricing_type|settings)[\`'\"]"
# NOTE: no \b between `_` and `vehicle` -- `_` IS a word character, so a boundary
# assertion there never matches (measured: the first version of this shape let
# save_post_vehicle escape while every other fixture passed).
SHAPE_H='(save_post_|add_meta_boxes_|manage_edit-|manage_)vehicle(_booking|_addon)?[a-z_]*'
SHAPES2_RE="$SHAPE_F|$SHAPE_G|$SHAPE_H"

scan_line() {   # stdin: one line · stdout: matched legacy tokens, one per line
  local line; line="$(cat)"
  {
    printf '%s' "$line" | grep -oE "$SHAPES_RE" 2>/dev/null
    # Second pass: mask the spellings a more specific shape already claimed,
    # so `mhm_rentiva_x` is not double-counted as an `_rentiva_x` hit too.
    # `wp_rentiva_transfer_routes` is the CURRENT table (wp_ is the DB prefix) and
    # `is_rentiva_admin_page()` is a method: in both, `_rentiva_` sits INSIDE a
    # word. Only a leading `_rentiva_` is a renamed meta key, so drop the
    # adjacency before matching. (The sweep script carries the same guard as a
    # lookbehind; grep -E has none, hence the sed.)
    printf '%s' "$line" | sed -E -e 's/mhm_rentiva_//g' -e 's/_mhm_//g' -e 's/([A-Za-z0-9])_rentiva_/\1/g' | grep -oE "$SHAPES2_RE" 2>/dev/null
  } | grep -vE "^($KEEP_RE)$" || true
}

self_test() {
  local rc=0 pc=0 pt=0 nt=0 ntrip=0 t
  local -a POS=(
    'Set the `mhm_rentiva_brand_name` option to change the label.'
    'The `MHM_RENTIVA_VERSION` constant holds the plugin version.'
    'Filter `mhm_rentiva/testimonials/limit` changes the count.'
    'A query with `'"'"'vehicle'"'"'` as the post type returns nothing now.'
    'Use `'"'"'vehicle_booking'"'"'` to list reservations.'
    'The payout row stores `mhm_payout_status`.'
    'The About section reads from `_rentiva_vendor_bio`.'
    'The fee is `addon_price` times the rental days.'
    'The `save_post_vehicle` hook fires when a vehicle is saved.'
  )
  # Every negative is a CORRECT, current spelling this probe must leave alone.
  local -a NEG=(
    'The post type is `mhmrentiva_vehicle` since 6.0.0.'
    'All routes live under the `mhm-rentiva/v1` REST namespace.'
    'The text domain is `mhm-rentiva` and the slug matches it.'
    'Each vehicle can carry its own daily rate.'                  # prose word
    'The bootstrap fallback still reads `mhm_rentiva_db_version`.' # kept on purpose
    'Set `MHM_RENTIVA_MIGRATION_FALLBACK` in wp-config.php.'       # operator contract
    'Hook into `mhmrentiva_booking_created` to react.'
    'Place the `[rentiva_booking_form]` shortcode on the page.'   # shortcodes never carried the prefix
    'Set `show_booking_button` to 0 to hide it.'                  # shortcode attribute, not a meta key
    'The meta key is `_mhmrentiva_vendor_bio` since 6.0.0.'
    'Every add-on has an addon settings screen.'                  # prose, not an identifier
    'The `save_post_mhmrentiva_vehicle` hook fires on save.'
    'The `wp_rentiva_transfer_routes` table holds route definitions.'  # wp_ is the DB prefix
    'Guarded by `is_rentiva_admin_page()`.'                            # method name
    'Legacy `mhm_rentiva_transfer_locations` is dropped if present.'   # live legacy fallback
  )
  for t in "${POS[@]}"; do
    pt=$((pt+1))
    if [ -n "$(printf '%s' "$t" | scan_line)" ]; then pc=$((pc+1)); else
      echo "  ❌ POSITIVE ESCAPED: ${t:0:60}" >&2; rc=1; fi
  done
  for t in "${NEG[@]}"; do
    nt=$((nt+1))
    if [ -n "$(printf '%s' "$t" | scan_line)" ]; then
      ntrip=$((ntrip+1))
      echo "  ❌ NEGATIVE TRIPPED (probe too wide): ${t:0:60} -> $(printf '%s' "$t" | scan_line | tr '\n' ' ')" >&2; rc=1; fi
  done
  echo "  probe: positive $pc/$pt caught · negative $ntrip/$nt tripping (0 expected)"
  return $rc
}

echo "→ Probing its own blind spot first…"
if ! self_test; then echo "⛔ PROBE BROKEN — no scan was performed." >&2; exit 3; fi
[ "${1:-}" = "--self-test" ] && { echo "✅ Probe sound."; exit 0; }

# ─── Scope ───────────────────────────────────────────────────────────────────
IN_SCOPE_RE='^(docs/|i18n/[^/]+/docusaurus-plugin-content-docs/|i18n/[^/]+/docusaurus-plugin-content-pages/|src/|static/|docusaurus\.config\.js|README\.md)'
EXCLUDED_RE='^(blog/|i18n/[^/]+/docusaurus-plugin-content-blog/)'

command -v git >/dev/null || { echo "ERROR: git not found" >&2; exit 2; }
mapfile -t ALL < <(git ls-files | grep -vE '^(build|node_modules)/')
[ "${#ALL[@]}" -gt 0 ] || { echo "ERROR: no tracked files -- run from the repository root." >&2; exit 2; }

IN=(); EX=0
for f in "${ALL[@]}"; do
  if   [[ "$f" =~ $EXCLUDED_RE ]]; then EX=$((EX+1))
  elif [[ "$f" =~ $IN_SCOPE_RE ]]; then IN+=("$f"); fi
done
[ "${#IN[@]}" -gt 0 ] || { echo "ERROR: scope matched 0 files -- the layout moved." >&2; exit 2; }

# ─── Deliberate mentions ─────────────────────────────────────────────────────
# A page may name an old identifier ON PURPOSE, because the sentence is about
# the old name. Those pairs live in a data file, anchored to the SENTENCE (see
# the file's own header for why file+token alone was not specific enough).
# The skip count is printed on every run: an allowlist nobody counts is a
# blindfold.
ALLOW_FILE="${ALLOW_FILE:-scripts/legacy-names-allowlist.tsv}"

allow_program() {   # $1 = path · stdout: a sed program blanking spared tokens
  [ -f "$ALLOW_FILE" ] || return 0
  awk -F'\t' -v p="$1" '!/^#/ && NF>=3 && $1==p { print "/" $3 "/ s|" $2 "||g" }' "$ALLOW_FILE"
}

hits=0; files=0; skipped=0
for f in "${IN[@]}"; do
  prog="$(allow_program "$f")"
  if [ -n "$prog" ]; then
    before=$(scan_line <"$f" | wc -l)
    body="$(sed "$prog" <"$f")"
    after=$(printf '%s' "$body" | scan_line | wc -l)
    skipped=$((skipped + before - after))
  else
    body="$(cat "$f")"
  fi
  n=$(printf '%s' "$body" | scan_line | wc -l)
  if [ "$n" -gt 0 ]; then
    files=$((files+1)); hits=$((hits+n))
    printf '%s\t%s\t%s\n' "$f" "$n" "$(printf '%s' "$body" | scan_line | sort -u | tr '\n' ' ')"
  fi
done

echo "→ Scope: ${#IN[@]} files scanned · $EX excluded (blog archive, banner instead)"
echo "→ Deliberate mentions spared by $ALLOW_FILE: $skipped"
echo "→ Pre-6.0.0 identifiers: $hits occurrence(s) in $files file(s)"
[ "$hits" -eq 0 ] && { echo "✅ Clean."; exit 0; }
exit 1
