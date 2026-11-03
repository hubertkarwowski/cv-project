$ErrorActionPreference = 'Stop'

$maxAttempts = 15

# 'Stop' ignores native exit codes but treats redirected stderr as fatal,
# and docker/alembic log to stderr, so only the exit code decides here.
function Invoke-Compose {
    $ErrorActionPreference = 'Continue'
    docker compose @args
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

function Test-BackendReady {
    $ErrorActionPreference = 'Continue'
    $null = docker compose exec -T backend true
    return $LASTEXITCODE -eq 0
}

Push-Location (Join-Path $PSScriptRoot '..')
try {
    Invoke-Compose build
    Invoke-Compose up -d

    $attempt = 1
    while (-not (Test-BackendReady)) {
        if ($attempt -ge $maxAttempts) {
            [Console]::Error.WriteLine("backend container not ready after $maxAttempts attempts")
            exit 1
        }
        Write-Host "Waiting for backend container ($attempt/$maxAttempts)..."
        $attempt++
        Start-Sleep -Seconds 2
    }

    Invoke-Compose exec -T backend uv run alembic upgrade head
    Invoke-Compose exec -T backend uv run python -m app.db.seed_dictionaries
}
finally {
    Pop-Location
}
