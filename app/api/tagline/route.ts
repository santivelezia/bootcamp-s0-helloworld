import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getAnthropic, DEMO_MODEL } from '@/lib/anthropic'

export const runtime = 'nodejs'

const RequestSchema = z.object({
  tema: z.string().min(1).max(120).optional(),
})

const SYSTEM_PROMPT = `Eres el copywriter del bootcamp "Claude For Devs" de Smart4AI. \
Generas taglines en español, una sola línea, máximo 12 palabras, sin emojis, \
sin comillas, con tono inspirador pero concreto. Hablas a builders no-developers \
que están aprendiendo a construir con IA.`

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bad request body' }, { status: 400 })
  }

  const tema = parsed.data.tema?.trim() ?? 'el bootcamp Claude For Devs'

  try {
    const anthropic = getAnthropic()
    const message = await anthropic.messages.create({
      model: DEMO_MODEL,
      max_tokens: 80,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Genera UN tagline sobre: ${tema}. Una sola línea. Sin emojis.`,
        },
      ],
    })

    const block = message.content[0]
    const text = block && block.type === 'text' ? block.text.trim() : ''
    if (!text) {
      return NextResponse.json({ error: 'Empty response' }, { status: 502 })
    }

    return NextResponse.json({ result: text })
  } catch (error) {
    console.error('Anthropic API error:', error)
    const detail =
      error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Generation failed', detail },
      { status: 500 }
    )
  }
}
