# -*- coding: utf-8 -*-
"""6.0.0 rename sweep for the documentation surface.

Order is the PUBLISHED order (6.0.7 release post, "Coming from 5.x?"):
slash-style names lose their slashes first, then the prefix changes. The other
way round produces names that never existed.

Every pair comes from the plugin's own PrefixMigrationMap.php. Two things that
file taught this script the hard way:
  · `mhm_rentiva_transfer_locations` (a TABLE) is NOT renamed -- it is Pro's
    legacy fallback and Pro still probes for it. `_mhm_rentiva_transfer_locations`
    (the META KEY, one underscore earlier) IS renamed. Hence two-phase masking:
    the meta rule runs BEFORE the table names are protected.
  · POSTMETA_MERGE_WINNERS reads new => old, not old => new. Nothing here uses
    it; it is named so the next reader does not assume otherwise.
"""
import io, os, re, sys, collections

WRITE = '--write' in sys.argv
ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALLOW = os.path.join(ROOT, 'scripts', 'legacy-names-allowlist.tsv')

# Same scope as scripts/check-legacy-names.sh, and for the same reason: blog/ is
# a record, not a manual. Keep the two in step -- a file the sweep rewrites but
# the probe never reads is a change nobody measures.
SCOPE = re.compile(r'^(docs/|i18n/[^/]+/docusaurus-plugin-content-docs/'
                   r'|i18n/[^/]+/docusaurus-plugin-content-pages/'
                   r'|src/|static/|docusaurus\.config\.js|README\.md)')
import subprocess
_tracked = subprocess.run(['git', '-C', ROOT, 'ls-files'], capture_output=True,
                          text=True, encoding="utf-8").stdout.splitlines()
FILES = [f for f in (x.strip() for x in _tracked)
         if f and SCOPE.match(f) and not f.startswith(('build/', 'node_modules/'))]
if not FILES:
    raise SystemExit('ABORT: scope matched 0 files -- run from inside the repository.')

allow = collections.defaultdict(list)          # path -> [(token, anchor)]
for line in io.open(ALLOW, encoding='utf-8'):
    if line.startswith('#') or not line.strip(): continue
    c = line.rstrip('\n').split('\t')
    if len(c) >= 3: allow[c[0]].append((c[1], c[2]))

# Names 6.0.0 deliberately did not rename (phase 0: nothing may touch them).
# 🔴 EVERY ENTRY MUST BE A WHOLE NAME NO RULE TARGET CONTAINS. Masking is a
# substring operation, so a short "protected" name sitting INSIDE a name that
# should change disarms the specific rule and hands the token to a broader one.
# Measured, not theorised: `rentiva_vehicle` was here as a shortcode name, and
# `mhm_rentiva_vehicle_show_images` came out as
# `mhmrentiva_rentiva_vehicle_show_images` -- the masked middle hid
# `mhm_rentiva_` from rule 4, so rule 7's bare `mhm_` fired instead and
# duplicated the word. That sweep was reverted. This is the mirror image of the
# warning PrefixMigrationMap already carries about blanket mhm => mhmrentiva
# rules: there the output re-matched the rule, here the guard broke the input.
# The shortcode names never needed protecting -- no rule here targets a token
# carrying neither `mhm_` nor a leading `_rentiva_`, and rentiva_booking_form
# carries neither. assert_no_double_prefix() is the standing guard.
KEEP0 = ['mhm_rentiva_db_version', 'mhm_rentiva_plugin_version',
         'MHM_RENTIVA_MIGRATION_FALLBACK', 'mhm-rentiva']
# Protected only AFTER the meta-key rule has run (phase 2).
KEEP2 = ['mhm_rentiva_transfer_locations', 'mhm_rentiva_transfer_routes',
         'mhm_rentiva_transfer_*']
# 🔴 NOT a rename problem, so a rename must not touch them. maintenance.md calls
# these four "core tables"; they exist under NEITHER spelling -- measured against
# Lite main and Pro master, and against Uninstaller::get_all_plugin_tables(),
# whose real list is queue / ratings / tenants / usage_metrics / message_logs /
# notification_queue / payment_log / sessions / backup_records / report_queue.
# Vehicles, bookings and customers are POST TYPES, not tables. Prefixing a name
# that names nothing just produces a different wrong name, so the probe keeps
# flagging these until somebody corrects the sentence.
KEEP0 += ['mhm_vehicles', 'mhm_bookings', 'mhm_customers', 'mhm_addons']

QUOTED = {'vehicle': 'mhmrentiva_vehicle', 'vehicle_booking': 'mhmrentiva_booking',
          'vehicle_addon': 'mhmrentiva_addon', 'vehicle_category': 'mhmrentiva_vehicle_category',
          'addon_context': 'mhmrentiva_addon_context', 'addon_category': 'mhmrentiva_addon_category',
          'addon_price': 'mhmrentiva_addon_price', 'addon_pricing_type': 'mhmrentiva_addon_pricing_type',
          'mhm_app_log': 'mhmrentiva_app_log', 'mhm_email_log': 'mhmrentiva_email_log',
          'mhm_contact_message': 'mhmrentiva_contact'}
counts, spared = collections.Counter(), collections.Counter()

def mask(text, toks, tag):
    m = {}
    for i, k in enumerate(toks):
        if k in text:
            t = '\x00%s%d\x00' % (tag, i); m[t] = k; text = text.replace(k, t)
    return text, m

def unmask(text, m):
    for t, k in m.items(): text = text.replace(t, k)
    return text

def sweep_line(line, rules_for_file):
    # allowlist: spare this token on THIS line only
    spare = {}
    for i, (tok, anchor) in enumerate(rules_for_file):
        if anchor in line and tok in line:
            t = '\x00A%d\x00' % i; spare[t] = tok; line = line.replace(tok, t)
            spared[tok] += 1
    line, m0 = mask(line, KEEP0, 'K')
    line, n = re.subn(r'_mhm_rentiva_blocked_dates', '_mhmrentiva_booking_blocked_dates', line)
    counts['1 exact-override'] += n
    def slash(mo):
        counts['2 slash-filter'] += 1
        return 'mhmrentiva_' + mo.group(1).replace('/', '_')
    line = re.sub(r'mhm_rentiva/([a-z0-9_]+(?:/[a-z0-9_]+)*)', slash, line)
    line, n = re.subn(r'_mhm_rentiva_', '_mhmrentiva_', line); counts['3 _mhm_rentiva_'] += n
    line, m2 = mask(line, KEEP2, 'T')          # tables: only now
    for pat, rep, name in [
        (r'mhm_rentiva_', 'mhmrentiva_',  '4 mhm_rentiva_'),
        (r'MHM_RENTIVA_', 'MHMRENTIVA_',  '5 MHM_RENTIVA_'),
        (r'_mhm_',        '_mhmrentiva_', '6 _mhm_'),
        (r'(?<![A-Za-z0-9_])mhm_', 'mhmrentiva_', '7 bare mhm_'),
        (r'(?<![A-Za-z0-9_])_rentiva_', '_mhmrentiva_', '8 _rentiva_'),
    ]:
        line, n = re.subn(pat, rep, line); counts[name] += n
    for old, new in sorted(QUOTED.items(), key=lambda kv: -len(kv[0])):
        line, n = re.subn(r'([`\'"])' + re.escape(old) + r'([`\'"])',
                          lambda mo, nw=new: mo.group(1) + nw + mo.group(2), line)
        counts['9 quoted:' + old] += n
    for pat, rep in [(r'save_post_vehicle\b', 'save_post_mhmrentiva_vehicle'),
                     (r'add_meta_boxes_vehicle\b', 'add_meta_boxes_mhmrentiva_vehicle'),
                     (r'manage_vehicle_posts_', 'manage_mhmrentiva_vehicle_posts_'),
                     (r'manage_edit-vehicle_', 'manage_edit-mhmrentiva_vehicle_')]:
        line, n = re.subn(pat, rep, line); counts['10 core-hook'] += n
    return unmask(unmask(unmask(line, m2), m0), spare)

def assert_no_double_prefix(path, before, after):
    """A token may name the plugin once. Twice means a rule fired on a name a
    mask had already broken -- the failure mode that reverted this sweep once."""
    for tok in re.findall(r'[A-Za-z0-9_]{4,}', after):
        low = tok.lower()
        if low.count('rentiva') > 1 or 'mhmmhm' in low:
            raise SystemExit('ABORT %s: produced %r -- a mask broke a rule target' % (path, tok))

changed = 0
for f in FILES:
    p = os.path.join(ROOT, f)
    try: src = io.open(p, encoding='utf-8').read()
    except Exception: continue
    rules = allow.get(f, [])
    out = '\n'.join(sweep_line(l, rules) for l in src.split('\n'))
    assert_no_double_prefix(f, src, out)
    if out != src:
        changed += 1
        if WRITE: io.open(p, 'w', encoding='utf-8', newline='').write(out)

print('%s: %d file(s) %s' % ('WRITE' if WRITE else 'DRY RUN', changed,
                             'rewritten' if WRITE else 'would change'))
for k, v in sorted(counts.items()):
    if v: print('  %-28s %d' % (k, v))
print('  TOTAL substitutions: %d' % sum(counts.values()))
print('  spared by allowlist: %d  %s' % (sum(spared.values()), dict(spared)))
