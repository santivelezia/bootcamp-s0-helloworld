import { test, expect } from '@playwright/test'

test('happy path: landing → toggle → ROI page → back', async ({ page }) => {
  // 1. Landing carga con titulo
  await page.goto('/')
  await expect(
    page.getByRole('heading', { level: 1, name: /hola desde taskflow/i })
  ).toBeVisible()

  // 2. Theme toggle existe y es accesible
  const toggle = page.getByRole('button', { name: /cambiar a tema/i })
  await expect(toggle).toBeVisible()

  // 3. Navegar a /roi
  await page.getByRole('link', { name: /calcular tu roi/i }).click()
  await expect(page).toHaveURL(/\/roi$/)
  await expect(
    page.getByRole('heading', { level: 1, name: /cuánto te ahorras/i })
  ).toBeVisible()

  // 4. ROI calculator visible y reactivo
  const ahorro = page.getByTestId('ahorro-mensual')
  await expect(ahorro).toBeVisible()
  const initialAhorro = await ahorro.textContent()

  await page.getByLabel(/horas\/semana/i).fill('10')
  const updatedAhorro = await ahorro.textContent()
  expect(updatedAhorro).not.toBe(initialAhorro)

  // 5. Volver a TaskFlow
  await page.getByRole('link', { name: /volver a taskflow/i }).click()
  await expect(page).toHaveURL('/')
})
