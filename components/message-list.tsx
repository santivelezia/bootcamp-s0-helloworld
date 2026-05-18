import { createClient } from '@/lib/supabase/server'

type Message = {
  id: string
  content: string
  created_at: string
}

export async function MessageList() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('s0_messages')
    .select('id, content, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    return (
      <p
        role="status"
        className="text-sm text-muted-foreground border rounded-md p-3"
      >
        No pudimos cargar los mensajes ({error.message}).
      </p>
    )
  }

  const messages = (data ?? []) as Message[]

  if (messages.length === 0) {
    return (
      <p
        role="status"
        className="text-sm text-muted-foreground border rounded-md p-3"
      >
        Aún no hay mensajes. Escribe el primero arriba.
      </p>
    )
  }

  const fmt = new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  })

  return (
    <ul
      data-testid="message-list"
      className="space-y-2"
      aria-label="Últimos mensajes"
    >
      {messages.map((m) => (
        <li
          key={m.id}
          className="rounded-md border p-3 text-sm flex items-start justify-between gap-3"
        >
          <span className="break-words">{m.content}</span>
          <time
            dateTime={m.created_at}
            className="text-xs text-muted-foreground shrink-0 tabular-nums"
          >
            {fmt.format(new Date(m.created_at))}
          </time>
        </li>
      ))}
    </ul>
  )
}
