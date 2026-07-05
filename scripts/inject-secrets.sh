#!/usr/bin/env sh
# Build-time secret injection for Netlify. Set these in:
#   Netlify > Site configuration > Environment variables
#     SITE_PASSWORD       (optional; if set, enables the login gate)
#     SITE_USER           (optional, defaults to "btx")
#     SUPABASE_ANON_KEY   (optional; if unset, edit public/config.js instead)
set -e

if [ -n "$SITE_PASSWORD" ]; then
  {
    printf '/*\n'
    printf '  Basic-Auth: %s:%s\n' "${SITE_USER:-btx}" "$SITE_PASSWORD"
    printf '  X-Robots-Tag: noindex, nofollow\n'
  } > public/_headers
  echo "inject-secrets: password gate ENABLED"
else
  {
    printf '/*\n'
    printf '  X-Robots-Tag: noindex, nofollow\n'
  } > public/_headers
  echo "inject-secrets: no SITE_PASSWORD -> gate DISABLED (site is read-public)"
fi

if [ -n "$SUPABASE_ANON_KEY" ]; then
  sed -i "s#PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE#${SUPABASE_ANON_KEY}#" public/config.js
  echo "inject-secrets: injected Supabase anon key into public/config.js"
else
  echo "inject-secrets: SUPABASE_ANON_KEY not set; using whatever is in public/config.js"
fi
