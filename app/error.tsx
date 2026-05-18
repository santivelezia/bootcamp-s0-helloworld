'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error boundary:', error)
  }, [error])

  return (
    <main className="container mx-auto max-w-2xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">Algo salió mal</h1>
      <p className="text-muted-foreground">
        Tuvimos un problema renderizando esta página. Puedes intentar otra vez —
        si persiste, mira la consola del browser para detalles.
      </p>
      {error.digest ? (
        <p className="text-xs text-muted-foreground font-mono">
          digest: {error.digest}
        </p>
      ) : null}
      <Button onClick={reset}>Reintentar</Button>
    </main>
  )
}
