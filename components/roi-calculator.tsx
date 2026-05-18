'use client'

import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type IndustriaVariant = 'A' | 'B' | 'C' | 'D'

interface BaselineConfig {
  label: string
  multiplier: number
  avgRate: number
  icon: string
}

export interface RoiCalculatorProps {
  industria: IndustriaVariant
  className?: string
  cursoPriceUsd?: number
}

const BASELINES: Record<IndustriaVariant, BaselineConfig> = {
  A: {
    label: 'Servicios profesionales',
    multiplier: 1.0,
    avgRate: 75,
    icon: '💼',
  },
  B: {
    label: 'E-commerce / Retail digital',
    multiplier: 0.85,
    avgRate: 45,
    icon: '🛒',
  },
  C: {
    label: 'SaaS / Tech startups',
    multiplier: 1.2,
    avgRate: 95,
    icon: '⚡',
  },
  D: {
    label: 'Educación / Infoproductos',
    multiplier: 0.95,
    avgRate: 55,
    icon: '🎓',
  },
}

const CURSO_PRICE_DEFAULT = 297

const fmtUsd = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

export function RoiCalculator({
  industria,
  className = '',
  cursoPriceUsd = CURSO_PRICE_DEFAULT,
}: RoiCalculatorProps) {
  const baseline = BASELINES[industria]

  const [horasSemana, setHorasSemana] = useState<number>(5)
  const [tarifaHora, setTarifaHora] = useState<number>(baseline.avgRate)
  const [vecesMes, setVecesMes] = useState<number>(4)

  const calc = useMemo(() => {
    const horasAhorradasMes = horasSemana * vecesMes * baseline.multiplier
    const ahorroMensual = horasAhorradasMes * tarifaHora
    const ahorroAnual = ahorroMensual * 12
    const paybackDias =
      cursoPriceUsd > 0 && ahorroMensual > 0
        ? Math.ceil((cursoPriceUsd / ahorroMensual) * 30)
        : 0
    const roi12m =
      cursoPriceUsd > 0
        ? Math.round(((ahorroAnual - cursoPriceUsd) / cursoPriceUsd) * 100)
        : 0

    return {
      horasAhorradasMes: Math.round(horasAhorradasMes),
      ahorroMensual: Math.round(ahorroMensual),
      ahorroAnual: Math.round(ahorroAnual),
      paybackDias,
      roi12m,
    }
  }, [
    horasSemana,
    tarifaHora,
    vecesMes,
    baseline.multiplier,
    cursoPriceUsd,
  ])

  return (
    <Card className={`p-6 md:p-8 space-y-8 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {baseline.icon}
        </span>
        <div>
          <p className="text-sm text-muted-foreground">Calibrado para</p>
          <p className="text-lg font-semibold">{baseline.label}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="horas-semana" className="text-sm">
            Horas/semana en esta tarea
          </Label>
          <Input
            id="horas-semana"
            type="number"
            min={0}
            max={80}
            step={0.5}
            value={horasSemana}
            onChange={(e) => setHorasSemana(Number(e.target.value))}
            className="text-2xl h-14 tabular-nums"
            aria-describedby="horas-help"
          />
          <p id="horas-help" className="text-xs text-muted-foreground">
            Estimado conservador
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tarifa-hora" className="text-sm">
            Tu tarifa USD/hora
          </Label>
          <Input
            id="tarifa-hora"
            type="number"
            min={0}
            max={1000}
            step={5}
            value={tarifaHora}
            onChange={(e) => setTarifaHora(Number(e.target.value))}
            className="text-2xl h-14 tabular-nums"
            aria-describedby="tarifa-help"
          />
          <p id="tarifa-help" className="text-xs text-muted-foreground">
            Default: promedio sector
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="veces-mes" className="text-sm">
            Veces/mes que la haces
          </Label>
          <Input
            id="veces-mes"
            type="number"
            min={1}
            max={100}
            step={1}
            value={vecesMes}
            onChange={(e) => setVecesMes(Number(e.target.value))}
            className="text-2xl h-14 tabular-nums"
          />
          <p className="text-xs text-muted-foreground">Frecuencia mensual</p>
        </div>
      </div>

      <div className="border-t pt-8 space-y-6 transition-all duration-200">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Ahorras al mes</p>
          <p
            data-testid="ahorro-mensual"
            className="text-6xl md:text-7xl font-bold tabular-nums tracking-tight"
          >
            {fmtUsd(calc.ahorroMensual)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            ({calc.horasAhorradasMes} horas/mes liberadas)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Payback del curso
            </p>
            <p className="text-3xl font-semibold tabular-nums">
              {calc.paybackDias > 0 ? `${calc.paybackDias} días` : '—'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">ROI a 12 meses</p>
            <p className="text-3xl font-semibold tabular-nums">
              {calc.roi12m > 0 ? `${calc.roi12m}%` : '—'}
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground border-t pt-4">
        Multiplier para {baseline.label}: ×{baseline.multiplier.toFixed(2)} ·
        Curso virtual: {fmtUsd(cursoPriceUsd)} · Cálculos en USD.
      </p>
    </Card>
  )
}
