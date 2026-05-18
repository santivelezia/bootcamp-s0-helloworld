'use client'

import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function TaglineCard() {
  const [tagline, setTagline] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const generate = () => {
    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch('/api/tagline', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ tema: 'TaskFlow AI bootcamp' }),
        })
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const json = (await response.json()) as { result?: string; error?: string }
        if (json.error) throw new Error(json.error)
        setTagline(json.result ?? '')
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido')
      }
    })
  }

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="p-6 space-y-3" aria-live="polite">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Tagline del día · generado por Claude Haiku 4.5
      </p>
      <p
        data-testid="tagline"
        className="text-2xl md:text-3xl font-semibold text-balance min-h-[3rem]"
      >
        {error
          ? '— El endpoint /api/tagline aún no está conectado'
          : tagline ?? '…'}
      </p>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={generate}
          disabled={isPending}
        >
          {isPending ? 'Generando…' : 'Generar otro'}
        </Button>
      </div>
    </Card>
  )
}
