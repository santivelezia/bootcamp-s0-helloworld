import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const setTheme = vi.fn()
let currentTheme = 'light'

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: currentTheme,
    setTheme,
    resolvedTheme: currentTheme,
  }),
}))

import { ThemeToggle } from '@/components/theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme.mockClear()
    currentTheme = 'light'
  })

  it('renders an accessible toggle button', () => {
    render(<ThemeToggle />)
    expect(
      screen.getByRole('button', { name: /cambiar a tema oscuro/i })
    ).toBeInTheDocument()
  })

  it('switches to dark when clicked from light', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('switches to light when clicked from dark', () => {
    currentTheme = 'dark'
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('light')
  })
})
