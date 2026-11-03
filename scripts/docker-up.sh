#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

max_attempts=15

docker compose build
docker compose up -d

attempt=1
until docker compose exec -T backend true; do
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "backend container not ready after $max_attempts attempts" >&2
    exit 1
  fi
  echo "Waiting for backend container ($attempt/$max_attempts)..."
  attempt=$((attempt + 1))
  sleep 2
done

docker compose exec -T backend uv run alembic upgrade head
docker compose exec -T backend uv run python -m app.db.seed_dictionaries
