import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RoiCalculator } from '@/components/roi-calculator'

describe('RoiCalculator', () => {
  it('renders the ahorro-mensual readout for industria A', () => {
    render(<RoiCalculator industria="A" />)
    const ahorro = screen.getByTestId('ahorro-mensual')
    expect(ahorro).toBeInTheDocument()
    // Industria A label appears multiple times (header + footer); use getAllByText
    expect(screen.getAllByText(/servicios profesionales/i).length).toBeGreaterThan(0)
  })

  it('recalculates ahorro when horas change', () => {
    render(<RoiCalculator industria="A" />)
    const horasInput = screen.getByLabelText(/horas\/semana/i) as HTMLInputElement
    const initialAhorro = screen.getByTestId('ahorro-mensual').textContent

    fireEvent.change(horasInput, { target: { value: '20' } })

    const updatedAhorro = screen.getByTestId('ahorro-mensual').textContent
    expect(updatedAhorro).not.toBe(initialAhorro)
  })

  it('uses a different multiplier for industria C (SaaS) vs A', () => {
    const { rerender, container } = render(<RoiCalculator industria="A" />)
    const ahorroA = container.querySelector('[data-testid="ahorro-mensual"]')
      ?.textContent

    rerender(<RoiCalculator industria="C" />)
    const ahorroC = container.querySelector('[data-testid="ahorro-mensual"]')
      ?.textContent

    expect(ahorroA).toBeTruthy()
    expect(ahorroC).toBeTruthy()
    expect(ahorroA).not.toBe(ahorroC)
  })
})
