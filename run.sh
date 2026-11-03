#!/usr/bin/env bash
set -euo pipefail

scripts="$(dirname "$0")/scripts"

case "${1:-}" in
  setup) exec bash "$scripts/dev-setup.sh" ;;
  docker) exec bash "$scripts/docker-up.sh" ;;
  *)
    echo "Usage: run.sh <command>" >&2
    echo "Available commands: setup, docker" >&2
    exit 1
    ;;
esac
