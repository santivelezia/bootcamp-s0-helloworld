import Link from 'next/link'
import { Suspense } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageForm } from '@/components/message-form'
import { MessageList } from '@/components/message-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { TaglineCard } from '@/components/tagline-card'

export default function Home() {
  return (
    <main className="container mx-auto max-w-2xl flex-1 flex flex-col gap-10 px-4 py-10 md:py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Smart4AI · Bootcamp Claude For Devs
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">
            Hola desde TaskFlow AI
          </h1>
          <p className="text-muted-foreground mt-2 text-balance">
            Una demo mínima de Next.js 16 + Supabase + Claude Haiku 4.5.
            Cada mensaje queda guardado con Row Level Security.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <TaglineCard />

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Déjale un mensaje al bootcamp</h2>
          <p className="text-sm text-muted-foreground">
            Se guardan en una tabla Postgres con RLS estricta.
          </p>
        </div>
        <MessageForm />
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Últimos 10 mensajes</h2>
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground">Cargando mensajes…</p>
          }
        >
          <MessageList />
        </Suspense>
      </section>

      <footer className="border-t pt-6 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Construido con el <code className="font-mono">agente-demo-builder v0.1</code>
        </p>
        <Link href="/roi" className={buttonVariants({ variant: 'outline' })}>
          Calcular tu ROI
        </Link>
      </footer>
    </main>
  )
}
