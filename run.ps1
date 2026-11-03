$ErrorActionPreference = 'Stop'

$scripts = @{
    setup  = 'dev-setup.ps1'
    docker = 'docker-up.ps1'
}

$command = $args[0]

if (-not $command -or -not $scripts.ContainsKey($command)) {
    [Console]::Error.WriteLine('Usage: run.ps1 <command>')
    [Console]::Error.WriteLine('Available commands: setup, docker')
    exit 1
}

& (Join-Path $PSScriptRoot "scripts\$($scripts[$command])")
exit $LASTEXITCODE
