#!/bin/sh
set -e

MAX_ATTEMPTS=5
SLEEP_SECONDS=5

for i in $(seq 1 $MAX_ATTEMPTS); do

  echo "Attempt $i: Connecting to SQL Server..."
  if npx prisma migrate deploy; then
    echo "Migration successful ✅"
    exit 0
  fi

  echo "Migration failed. Retrying in ${SLEEP_SECONDS}s..."
  sleep $SLEEP_SECONDS
done

echo "Migration failed after ${MAX_ATTEMPTS} attempts!"
exit 1
