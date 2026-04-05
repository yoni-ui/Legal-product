# Tebekaye local dev: API (8000) + Web (3000)
# Prerequisites: Node 20+, Python 3.11+, Postgres (e.g. Docker Desktop + `docker compose up -d`)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "== Tebekaye: installing / checking dependencies =="

$nextRoot = "$Root\node_modules\next"
$nextWeb = "$Root\apps\web\node_modules\next"
if (-not (Test-Path $nextRoot) -and -not (Test-Path $nextWeb)) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "npm install failed (e.g. EBUSY: close other Node/Cursor terminals, then run: cd `"$Root`"; npm install)"
    }
}
if (-not (Test-Path $nextRoot) -and -not (Test-Path $nextWeb)) {
    Write-Error "Next.js missing. From repo root run: npm install"
    exit 1
}

Set-Location "$Root\apps\api"
python -m pip install -e ".[dev]" --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    python -m pip install -e "."
}

Write-Host ""
Write-Host "Starting API on http://localhost:8000 (new window)..."
Start-Process powershell -WorkingDirectory "$Root\apps\api" -ArgumentList @(
    "-NoExit", "-Command",
    "python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"
)

Write-Host "Starting Web on http://localhost:3000 (new window)..."
Start-Process powershell -WorkingDirectory $Root -ArgumentList @(
    "-NoExit", "-Command",
    "npm run dev"
)

Write-Host ""
Write-Host "Done. Apply SQL migrations if you have not yet (see README)."
Write-Host "If login fails: start Docker Desktop, then run: docker compose up -d"
