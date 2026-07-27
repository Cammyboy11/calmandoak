#!/bin/sh
# Calm & Oak pre-push guard: blocks a push if any page references an asset
# that is not committed to git (the cause of the July 2026 broken-images outage).
# Installed at .git/hooks/pre-push. Bypass once with: git push --no-verify
cd "$(git rev-parse --show-toplevel)" || exit 0
tmp_refs=$(mktemp); tmp_tracked=$(mktemp)
git ls-files -z -- '*.html' | xargs -0 grep -ahoE '(src|srcset|href)="/assets/[^"? ]+' 2>/dev/null \
  | sed -E 's/^(src|srcset|href)="\///' | sort -u > "$tmp_refs"
git ls-files -- assets | sort -u > "$tmp_tracked"
missing=$(comm -23 "$tmp_refs" "$tmp_tracked")
rm -f "$tmp_refs" "$tmp_tracked"
if [ -n "$missing" ]; then
  echo "" >&2
  echo "PUSH BLOCKED — these assets are referenced by pages but NOT committed:" >&2
  echo "$missing" | head -40 >&2
  n=$(echo "$missing" | wc -l | tr -d ' ')
  echo "($n total)" >&2
  echo "" >&2
  echo "Fix:    git add <the files above>   then commit and push again." >&2
  echo "Bypass: git push --no-verify        (images WILL 404 on the live site)" >&2
  exit 1
fi
exit 0
