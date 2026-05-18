import Link from 'next/link'
import type { Metadata } from 'next'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { RoiCalculator } from '@/components/roi-calculator'

export const metadata: Metadata = {
  title: 'ROI Calculator · Smart4AI',
  description:
    'Calcula cuánto te ahorras al automatizar una tarea con Claude. Baselines por industria.',
}

export default function RoiPage() {
  return (
    <main className="container mx-auto max-w-3xl flex-1 flex flex-col gap-8 px-4 py-10 md:py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Smart4AI Diferenciador #3
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">
            ¿Cuánto te ahorras con IA?
          </h1>
          <p className="text-muted-foreground mt-2 text-balance">
            Calculadora calibrada para Servicios profesionales (consultorías,
            agencias, legal, contabilidad). 3 inputs → ahorro real al mes.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <RoiCalculator industria="A" />

      <footer className="border-t pt-6">
        <Link href="/" className={buttonVariants({ variant: 'outline' })}>
          ← Volver a TaskFlow
        </Link>
      </footer>
    </main>
  )
}
