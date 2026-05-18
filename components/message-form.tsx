'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export function MessageForm() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const trimmed = content.trim()
    if (trimmed.length === 0) {
      setError('Escribe algo antes de enviar.')
      return
    }
    if (trimmed.length > 280) {
      setError('Máximo 280 caracteres.')
      return
    }

    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('s0_messages')
      .insert({ content: trimmed })

    if (dbError) {
      setError(dbError.message)
      return
    }

    setContent('')
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" aria-label="Enviar mensaje">
      <div className="space-y-2">
        <Label htmlFor="message-content">Tu mensaje</Label>
        <Input
          id="message-content"
          type="text"
          maxLength={280}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Hola desde TaskFlow…"
          disabled={isPending}
          aria-describedby="message-help"
        />
        <p id="message-help" className="text-xs text-muted-foreground tabular-nums">
          {content.length} / 280
        </p>
      </div>

      {error ? (
        <p
          role="alert"
          className="text-sm text-red-600 dark:text-red-400 font-medium"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending || content.trim().length === 0}>
        {isPending ? 'Enviando…' : 'Enviar mensaje'}
      </Button>
    </form>
  )
}
