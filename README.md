# Hello TaskFlow AI

> Demo del bootcamp **Claude For Devs** de Smart4AI · Sesión 0 · smoke test del `agente-demo-builder v0.1`.

[![status](https://img.shields.io/badge/status-work--in--progress-orange)](https://github.com/santivelezia/bootcamp-s0-helloworld)
[![deployed](https://img.shields.io/badge/deployed-vercel-black)](https://bootcamp-s0-helloworld.vercel.app)

Una landing minimalista que combina **Next.js 16 + Supabase (RLS) + Claude Haiku 4.5**.
Cada mensaje queda guardado en Postgres, el tagline del día lo genera Claude, y la página `/roi` calcula tu retorno de inversión al automatizar con IA.

---

## 🚀 Quickstart 90-seg

**Windows (PowerShell):**
```powershell
iwr -useb https://raw.githubusercontent.com/santivelezia/bootcamp-s0-helloworld/main/bootstrap.ps1 | iex
```

> Si PowerShell bloquea el script: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` y vuelve a correrlo.

**Mac / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/santivelezia/bootcamp-s0-helloworld/main/bootstrap.sh | bash
```

**Manual (3 pasos):**
```bash
git clone https://github.com/santivelezia/bootcamp-s0-helloworld.git
cd bootcamp-s0-helloworld
npm install && npm run dev
```

⏱️ Target medible: **< 90 segundos** desde `iwr`/`curl` hasta `localhost:3000`.

> El bootstrap inyecta automáticamente las keys del proyecto Supabase compartido del bootcamp (anon · read-only · safe by design). Para que `/api/tagline` funcione, añade tu propia `ANTHROPIC_API_KEY` al `.env.local`.

---

## 💰 ROI Calculator

Visita [`/roi`](https://bootcamp-s0-helloworld.vercel.app/roi) para calcular cuánto te ahorras automatizando tu tarea más repetitiva.

3 inputs · 3 outputs · baselines precalculados para las 4 industrias oficiales Smart4AI:

| Variante | Industria |
|---|---|
| **A** | Servicios profesionales (consultorías, agencias, legal, contabilidad) |
| **B** | E-commerce / Retail digital |
| **C** | SaaS / Tech startups |
| **D** | Educación / Infoproductos digitales |

Esta demo monta la variante **A** por defecto. El componente `<RoiCalculator industria="..." />` es reusable.

---

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) App Router |
| Lenguaje | TypeScript 5 (strict + `noUncheckedIndexedAccess`) |
| UI | [Shadcn/ui](https://ui.shadcn.com) (Base UI) + Tailwind CSS v4 |
| Dark mode | [next-themes](https://github.com/pacocoursey/next-themes) (system aware) |
| Backend | [Supabase](https://supabase.com) Postgres + Row Level Security |
| IA | [@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk) · `claude-haiku-4-5-20251001` |
| Tests | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) |
| Deploy | [Vercel](https://vercel.com) Hobby (free) |

---

## 🔑 Variables de entorno

Crea `.env.local` (el bootstrap lo hace por ti):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ipwmrpzwuvheupjexiqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...   # safe en cliente (RLS)
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # SOLO server-side
ANTHROPIC_API_KEY=sk-ant-...           # opcional · sin ella /api/tagline retorna 500
```

`.env*.local` está en `.gitignore` por default.

---

## 📂 Estructura

```
bootcamp-s0-helloworld/
├── app/
│   ├── page.tsx                # landing: tagline + form + lista + toggle
│   ├── roi/page.tsx            # ROI Calculator industria A
│   ├── api/tagline/route.ts    # POST · Claude Haiku 4.5
│   ├── layout.tsx              # ThemeProvider (system)
│   └── error.tsx               # error boundary
├── components/
│   ├── ui/                     # Shadcn (button, input, dialog, card, label)
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── message-form.tsx        # insert en s0_messages (client)
│   ├── message-list.tsx        # select últimos 10 (server)
│   ├── tagline-card.tsx        # llama /api/tagline
│   └── roi-calculator.tsx      # ★ Diferenciador #3
├── lib/
│   ├── supabase/client.ts      # createBrowserClient
│   ├── supabase/server.ts      # createServerClient (cookies)
│   ├── anthropic.ts            # SDK + DEMO_MODEL
│   └── utils.ts                # cn helper (Shadcn)
├── supabase/migrations/        # s0_messages + RLS policies
├── scripts/apply-migrations.mjs # pg client para migrations
├── tests/                      # Vitest (3 specs)
├── e2e/                        # Playwright (1 happy path)
├── bootstrap.sh                # ★ Diferenciador #2 · Mac/Linux
├── bootstrap.ps1               # ★ Diferenciador #2 · Windows
└── RECORDING_SCRIPT.md         # script Pixar Spine + pausas
```

---

## 🧪 Tests

```bash
npm run test       # Vitest · 3 specs (theme, roi, anthropic)
npm run test:e2e   # Playwright · 1 happy path end-to-end
npm run typecheck  # tsc --noEmit · 0 errores
```

---

## 🚢 Deploy propio

```bash
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel --prod
```

---

## 🎬 Recording

El demo incluye [`RECORDING_SCRIPT.md`](./RECORDING_SCRIPT.md) con:
- Pixar Story Spine (6 actos)
- Parte A pregrabada (texto exacto + cues de edición)
- Parte B análisis en vivo (preguntas a audiencia + transición)

---

## 📜 Licencia

MIT · construido para **Claude For Devs** · [Smart4AI](https://smart4ai.io).

> *"Si subes este repo a GitHub y lo ven 100 devs, no te da pena."*
> — frase guía del `agente-demo-builder v0.1` que generó este código.
