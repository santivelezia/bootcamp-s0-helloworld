# bootstrap.ps1 · Quickstart 90-seg · bootcamp-s0-helloworld
#
# Uso:
#   iwr -useb https://raw.githubusercontent.com/santivelezia/bootcamp-s0-helloworld/main/bootstrap.ps1 | iex
#
# O local: .\bootstrap.ps1
#
# Si PowerShell bloquea el script:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#
# Target: clic -> localhost:3000 en < 90 segundos
# Smart4AI · Diferenciador #2 · Zero-to-Demo

$ErrorActionPreference = 'Stop'

$RepoUrl         = "https://github.com/santivelezia/bootcamp-s0-helloworld.git"
$Slug            = "bootcamp-s0-helloworld"
$SupabaseUrl     = "https://ipwmrpzwuvheupjexiqk.supabase.co"
$SupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwd21ycHp3dXZoZXVwamV4aXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNjgxOTgsImV4cCI6MjA5NDY0NDE5OH0.khNm16hqVC_IrqHfcdz7aFDRbPdvjz9L_vtyg-U7KvM"

function Log  ([string]$msg) { Write-Host "->  $msg" -ForegroundColor Blue }
function Ok   ([string]$msg) { Write-Host "OK  $msg" -ForegroundColor Green }
function Warn ([string]$msg) { Write-Host "!!  $msg" -ForegroundColor Yellow }

Log "Verificando prerequisitos..."
if (-not (Get-Command git  -ErrorAction SilentlyContinue)) { Warn "git no instalado: https://git-scm.com/download/win"; exit 1 }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Warn "node no instalado: https://nodejs.org (v18+)"; exit 1 }
if (-not (Get-Command npm  -ErrorAction SilentlyContinue)) { Warn "npm no instalado (suele venir con node)"; exit 1 }

$nodeVer   = (node --version) -replace '^v',''
$nodeMajor = [int]($nodeVer.Split('.')[0])
if ($nodeMajor -lt 18) { Warn "Node v$nodeMajor es muy viejo. Necesitas v18+."; exit 1 }
Ok "git, node v$nodeMajor, npm presentes"

if (Test-Path $Slug) {
    Log "Carpeta $Slug ya existe. Haciendo pull..."
    Set-Location $Slug
    git pull --rebase --autostash
} else {
    Log "Clonando $RepoUrl..."
    git clone $RepoUrl
    Set-Location $Slug
}
Ok "Repo listo en $(Get-Location)"

Log "Configurando .env.local con keys read-only del proyecto compartido..."
$envContent = @"
# Keys del proyecto Supabase compartido del bootcamp Claude For Devs
# Son keys PUBLICAS (RLS protege los datos). Safe para embeber.
NEXT_PUBLIC_SUPABASE_URL=$SupabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SupabaseAnonKey

# ANTHROPIC_API_KEY: la tuya. Sin ella, /api/tagline responde 500.
# ANTHROPIC_API_KEY=sk-ant-...
"@
Set-Content -Path ".env.local" -Value $envContent -Encoding utf8
Ok ".env.local creado"

Log "Instalando dependencias (npm install)..."
npm install --prefer-offline --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { Warn "npm install fallo."; exit 1 }
Ok "Dependencias instaladas"

Log "Levantando dev server en localhost:3000..."
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000"
} | Out-Null

Ok "Listo. El browser se abrira en ~3 segundos."
Write-Host ""
Write-Host "$Slug corriendo en http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm run dev
