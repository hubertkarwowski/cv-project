$ErrorActionPreference = 'Stop'

# 'Stop' ignores native exit codes but treats redirected stderr as fatal,
# and uv/alembic log to stderr, so only the exit code decides here.
function Invoke-Uv {
    $ErrorActionPreference = 'Continue'
    uv @args
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Push-Location (Join-Path $PSScriptRoot '..\backend')
try {
    Invoke-Uv sync
    Invoke-Uv run alembic upgrade head
    Invoke-Uv run python -m app.db.seed_dictionaries
}
finally {
    Pop-Location
}
