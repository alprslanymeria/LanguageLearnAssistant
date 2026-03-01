#!/bin/sh
set -e

if [ -n "$GCP_KEY_BASE64" ]; then
  echo "$GCP_KEY_BASE64" | base64 -d > /app/key.json
  echo "DECODE ✅"
fi


if [ ! -f "/app/key.json" ]; then
  echo "WARNING: /app/key.json NOT FOUND. GCP SERVICES MAY NOT WORK."
fi

exec node server.js
