import { describe, it, expect } from 'vitest'
import { DEMO_MODEL } from '@/lib/anthropic'

describe('lib/anthropic', () => {
  it('exposes the Haiku 4.5 model id for demos', () => {
    expect(DEMO_MODEL).toBe('claude-haiku-4-5-20251001')
  })

  it('uses a stable Anthropic model id (not "latest")', () => {
    expect(DEMO_MODEL).toMatch(/^claude-haiku-\d+-\d+-\d{8}$/)
  })
})
