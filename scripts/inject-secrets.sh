#!/usr/bin/env sh
# Build-time secret injection for Netlify. Set these in:
#   Netlify > Site configuration > Environment variables
#     SITE_PASSWORD       (required for the password gate)
#     SITE_USER           (optional, defaults to "btx")
#     SUPABASE_ANON_KEY   (optional; if unset, edit public/config.js instead)
set -e

if [ -n "$SITE_PASSWORD" ]; then
  # Regenerate _headers cleanly so any password characters are handled safely.
  {
    printf '/*\n'
    printf '  Basic-Auth: %s:%s\n' "${SITE_USER:-btx}" "$SITE_PASSWORD"
    printf '  X-Robots-Tag: noindex, nofollow\n'
  } > public/_headers
  echo "inject-secrets: wrote password gate to public/_headers"
else
  echo "inject-secrets: WARNING - SITE_PASSWORD not set; site will NOT be password protected."
fi

if [ -n "$SUPABASE_ANON_KEY" ]; then
  # Anon key contains no '#', so '#' is a safe sed delimiter here.
  sed -i "s#PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE#${SUPABASE_ANON_KEY}#" public/config.js
  echo "inject-secrets: injected Supabase anon key into public/config.js"
else
  echo "inject-secrets: SUPABASE_ANON_KEY not set; using whatever is in public/config.js"
fi
