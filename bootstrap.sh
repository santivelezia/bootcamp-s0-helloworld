#!/usr/bin/env bash
# bootstrap.sh · Quickstart 90-seg · bootcamp-s0-helloworld
#
# Uso:
#   curl -fsSL https://raw.githubusercontent.com/santivelezia/bootcamp-s0-helloworld/main/bootstrap.sh | bash
#
# O local: bash bootstrap.sh
#
# Target: clic -> localhost:3000 corriendo en < 90 segundos
# Smart4AI · Diferenciador #2 · Zero-to-Demo

set -euo pipefail

REPO_URL="https://github.com/santivelezia/bootcamp-s0-helloworld.git"
SLUG="bootcamp-s0-helloworld"
SUPABASE_URL="https://ipwmrpzwuvheupjexiqk.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwd21ycHp3dXZoZXVwamV4aXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNjgxOTgsImV4cCI6MjA5NDY0NDE5OH0.khNm16hqVC_IrqHfcdz7aFDRbPdvjz9L_vtyg-U7KvM"

BOLD=$(tput bold 2>/dev/null || echo "")
GREEN=$(tput setaf 2 2>/dev/null || echo "")
BLUE=$(tput setaf 4 2>/dev/null || echo "")
YELLOW=$(tput setaf 3 2>/dev/null || echo "")
RESET=$(tput sgr0 2>/dev/null || echo "")

log()  { echo "${BOLD}${BLUE}→${RESET} $1"; }
ok()   { echo "${BOLD}${GREEN}✓${RESET} $1"; }
warn() { echo "${BOLD}${YELLOW}⚠${RESET} $1"; }

log "Verificando prerequisitos..."
command -v git  >/dev/null 2>&1 || { warn "git no instalado. https://git-scm.com"; exit 1; }
command -v node >/dev/null 2>&1 || { warn "node no instalado. https://nodejs.org (v18+)"; exit 1; }
command -v npm  >/dev/null 2>&1 || { warn "npm no instalado (suele venir con node)"; exit 1; }

NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "${NODE_MAJOR}" -lt 18 ]; then
  warn "Node v${NODE_MAJOR} es muy viejo. Necesitas v18+."
  exit 1
fi
ok "git, node v${NODE_MAJOR}, npm presentes"

if [ -d "${SLUG}" ]; then
  log "Carpeta ${SLUG} ya existe. Haciendo pull..."
  cd "${SLUG}"
  git pull --rebase --autostash
else
  log "Clonando ${REPO_URL}..."
  git clone "${REPO_URL}"
  cd "${SLUG}"
fi
ok "Repo listo en $(pwd)"

log "Configurando .env.local con keys read-only del proyecto compartido..."
cat > .env.local <<EOF
# Keys del proyecto Supabase compartido del bootcamp Claude For Devs
# Son keys PÚBLICAS (RLS protege los datos). Safe para embeber.
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# ANTHROPIC_API_KEY: la tuya. Sin ella, /api/tagline responde 500.
# ANTHROPIC_API_KEY=sk-ant-...
EOF
ok ".env.local creado"

log "Instalando dependencias (npm install)..."
npm install --prefer-offline --no-audit --no-fund
ok "Dependencias instaladas"

log "Levantando dev server en localhost:3000..."

(
  sleep 3
  if   command -v xdg-open >/dev/null 2>&1; then xdg-open http://localhost:3000
  elif command -v open     >/dev/null 2>&1; then open     http://localhost:3000
  elif command -v wslview  >/dev/null 2>&1; then wslview  http://localhost:3000
  fi
) &

ok "Listo. El browser se abrirá en ~3 segundos."
echo ""
echo "${BOLD}🚀 ${SLUG} corriendo en http://localhost:3000${RESET}"
echo ""

npm run dev
