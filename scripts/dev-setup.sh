#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../backend"

uv sync
uv run alembic upgrade head
uv run python -m app.db.seed_dictionaries
