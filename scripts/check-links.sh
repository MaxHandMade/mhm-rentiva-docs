#!/usr/bin/env bash
# Internal link verifier for the Docusaurus build output.
#
# Walks every rendered .html file under build/ and confirms that each
# /mhm-rentiva-docs/... href resolves to a real file on disk. Catches
# the runtime navigation bugs that Docusaurus' onBrokenLinks does not
# flag (raw JSX <a href> elements, in particular).
#
# Usage:
#   bash scripts/check-links.sh             # uses ./build
#   BUILD_DIR=path/to/build bash scripts/check-links.sh

set -euo pipefail

BUILD_DIR="${BUILD_DIR:-build}"
BASE_PREFIX="/mhm-rentiva-docs/"

if [ ! -d "$BUILD_DIR" ]; then
  echo "ERROR: build directory not found at '$BUILD_DIR'. Run 'npm run build' first." >&2
  exit 2
fi

cd "$BUILD_DIR"

# Collect every internal href from every rendered HTML page.
mapfile -t hrefs < <(
  grep -hroE "href=\"${BASE_PREFIX}[^\"#?]*\"" . 2>/dev/null \
    | sed "s|^href=\"${BASE_PREFIX}||;s|\"$||" \
    | sort -u
)

if [ "${#hrefs[@]}" -eq 0 ]; then
  echo "WARNING: no internal hrefs found under $BUILD_DIR. Did the build succeed?" >&2
  exit 2
fi

fail_count=0
pass_count=0

for href in "${hrefs[@]}"; do
  [ -z "$href" ] && continue

  # Map URL path → filesystem path. Try as a literal file first (covers
  # .html/.png/.pdf and the like); if that misses, treat the URL as a directory
  # served by its index.html. This ordering avoids the trap of mis-classifying
  # paths that contain a dot but are still directories (e.g. "v4.6.3-release").
  candidate="${href%/}"
  if [ -f "$candidate" ] || [ -f "$candidate.html" ] || [ -f "$candidate/index.html" ]; then
    pass_count=$((pass_count + 1))
  else
    echo "BROKEN: ${BASE_PREFIX}${href}  →  tried: ${candidate}, ${candidate}.html, ${candidate}/index.html"
    fail_count=$((fail_count + 1))
  fi
done

echo ""
echo "Internal link check: ${pass_count} OK, ${fail_count} broken (out of ${#hrefs[@]} unique hrefs)"

[ "$fail_count" -gt 0 ] && exit 1
exit 0
