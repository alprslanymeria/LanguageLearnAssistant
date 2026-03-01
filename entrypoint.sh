#!/bin/sh
set -e

MAX_ATTEMPTS=5
SLEEP_SECONDS=5

for i in $(seq 1 $MAX_ATTEMPTS); do

  echo "ATTEMPT $i: CONNECTING TO SQL SERVER..."
  if npx prisma migrate deploy; then
    echo "MIGRATION SUCCESSFUL ✅"
    exit 0
  fi

  echo "MIGRATION FAILED. RETRYING IN ${SLEEP_SECONDS}s..."
  sleep $SLEEP_SECONDS
done

echo "MIGRATION FAILED AFTER ${MAX_ATTEMPTS} ATTEMPTS!"
exit 1
