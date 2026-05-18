# 🎬 Recording script · Hello TaskFlow AI

> Sesión 0 del bootcamp · smoke test del `agente-demo-builder v0.1` · duración total estimada: 8-12 min

---

## 1. Pixar Story Spine (interno · no se lee en vivo)

| Acto | Contenido |
|---|---|
| **Once upon a time** | Un builder no-developer abría su editor cada mañana y solo veía un README vacío y una carpeta sin layout claro. Quería construir, pero no sabía por dónde arrancar. |
| **Every day** | Cada vez que quería montar una idea pequeña, perdía 2-3 horas en setup: scaffold, Tailwind, Shadcn, autenticación, base de datos, deploy. Para cuando llegaba al producto, ya había perdido el flow. |
| **Until one day** | Descubrió que un solo agente de Claude Code, bien diseñado, podía hacer todo ese pipeline mientras él miraba: leer un script, crear el repo en GitHub, scaffold de Next.js 16, configurar Supabase con RLS, integrar Claude API, deployar a Vercel, y dejarle solo el trabajo creativo. |
| **Because of that** | El builder pasó de mirar archivos vacíos a ver código real corriendo en `bootcamp-s0-helloworld.vercel.app` en 60-90 minutos. Con tests, dark mode, a11y, y un ROI Calculator que calcula su retorno real. |
| **Until finally** | Lo que antes le tomaba 4-5 noches de trabajo, ahora es un comando: `agente-demo-builder · sesion=N`. Y el resultado es demo-quality+: pasa los 5 tests sin sonrojarse. |
| **Ever since** | Cada sesión del bootcamp empieza con un demo deployado el mismo día. La distancia entre idea y código corriendo se mide en minutos, no en noches. |

**Validación interna:** ¿"Until one day" es realmente sorprendente? **Sí:** que un agente cree GitHub repo + scaffold + Supabase + Vercel + tests + ROI calculator + receipts en Notion en 60 min es genuinamente nuevo para builders no-tech.

---

## 2. Parte A — PREGRABADA (texto EXACTO · no improvisar)

> Patrón **"muestra y calla":** cuando aparece el output, Santiago para de hablar. El visual habla solo.

### Bloque A.1 · Hook (≈15 seg)

[ACCIÓN: pantalla negra → fade in al editor con la terminal vacía abajo]

**Santiago:**
> "¿Cuántas tardes has perdido en setup antes de escribir la primera línea del producto que te interesa? Si la respuesta no es cero, te quiero mostrar algo."

[CORTE]

### Bloque A.2 · Setup del problema (≈25 seg)

[ACCIÓN: zoom a una carpeta vacía · mostrar mentalmente el checklist]

**Santiago:**
> "Antes, para una app pequeña tenía que correr `create-next-app`, instalar Shadcn, configurar Supabase, escribir las políticas de seguridad a mano, integrar Claude API, escribir los tests, configurar Vercel… y eso *antes* de tocar el producto. Hoy quiero que vean un agente que hace todo esto y me deja solo lo creativo."

[CORTE]

### Bloque A.3 · Demo principal (≈3 min)

[ACCIÓN: terminal limpia · escribir un solo comando]

**Santiago:**
> "Voy a invocar al agente con una sesión 0, que llamo Hello TaskFlow."

[TIPEA: `Lee agents/agente-demo-builder/agent.md y ejecútalo con sesion=0`]
[ENTER]

**[PAUSA 5 seg — dejar que aparezcan los primeros log lines del agente. El visual habla por sí solo: el agente está pensando.]**

[ACCIÓN: scroll rápido por los logs de stages 1-4]

**Santiago (susurro):**
> "Creó el repo en GitHub. Scaffold de Next.js 16. Configuró Shadcn. Y ya está pidiéndome las keys de Supabase."

[ZOOM al mensaje del agente que pide las keys]

**[PAUSA 4 seg — dejar que la audiencia lea el mensaje del agente · pidiendo solo lo que no puede inferir]**

[ACCIÓN: Santiago pega las keys en una sola línea desde su gestor de contraseñas]

[ACCIÓN: continúa el log, mostrar stages 5-11 pasando]

**Santiago:**
> "Mientras corre, fíjense en algo: cada commit cuenta una historia. No hay un commit gigante 'init'. Hay scaffold, ui, supabase, claude api. Eso es lo que veré yo mañana cuando vuelva al código."

[ZOOM al output de `git log --oneline` que aparece después del stage 13]

**[PAUSA 6 seg — dejar que se lea cada commit. El log es la narrativa.]**

[ACCIÓN: abrir la URL de Vercel que el agente reporta]

**Santiago:**
> "Y aquí está corriendo. Tagline generado en vivo por Claude. Form que escribe en Supabase. Y…"

[CLIC: el botón "Calcular tu ROI"]

**[PAUSA 3 seg — el ROI Calculator carga · números grandes · diseño Stripe-like]**

**Santiago (más suave):**
> "Esto es lo que el agente construye nativamente: la calculadora de ROI por industria. No es una promesa. Es código corriendo."

[CORTE]

### Bloque A.4 · Cierre pregrabado (≈10 seg)

[ACCIÓN: zoom out al editor + browser side-by-side]

**Santiago:**
> "Ahora pasemos a lo que importa: ¿cómo está hecho este agente por dentro? ¿Y qué pueden empezar a hacer ustedes con la misma idea?"

[CORTE]

---

## 3. Parte B — ANÁLISIS EN VIVO (bullets flexibles)

> Después del pregrabado, Santiago sale en vivo.

### Puntos clave a cubrir (4 bullets)

- **Punto 1 · Arquitectura del agente:** 15 stages, dos paralelos (frontend + backend via subagentes). Cada stage tiene INPUT / PROCESO / OUTPUT / VALIDACIÓN como contrato. No hay magia: hay schema.
- **Punto 2 · Los 3 diferenciadores Smart4AI nativos:** Receipts (Notion automático), Zero-to-Demo 90 seg (bootstrap dual), ROI Calculator embebido. Los recibos son auditables, no marketing.
- **Punto 3 · Anti-patrón evitado:** ningún `as any`, ningún `@ts-ignore`, RLS desde la primera migración. Calidad demo-quality+: si 100 devs lo ven, no da pena.
- **Punto 4 · Lo que tú puedes hacer mañana:** el mismo agente, con una sesión diferente, construye tu primera idea pequeña en una tarde. No tienes que escribir el agente — tienes que escribir el spec.

### Preguntas a la audiencia

❓ **Pregunta 1 (después de la pausa de 6 seg en commits):**
> "¿Cuántos de ustedes han abierto un repo viejo y se han preguntado 'qué carajos hice acá'? Si la respuesta es la mayoría, eso es exactamente lo que esto resuelve." — esperar 10 seg respuesta

❓ **Pregunta 2 (después del ROI Calculator):**
> "Si supieras que automatizar UNA tarea repetitiva te paga el curso en 12 días, ¿cuál sería la primera tarea que automatizarías esta semana?" — esperar 10 seg respuesta

### Preguntas anticipadas del público

| Pregunta posible | Respuesta breve |
|---|---|
| "¿Funciona con mis datos sensibles?" | Sí · las tablas tienen RLS desde la creación. El demo público usa políticas abiertas para fines educativos; en tu app reemplazas la policy y listo. |
| "¿Cuánto cuesta correr esto?" | El demo en sí: ~$0.001 por tagline (Haiku 4.5). El agente que lo construye: $2-5 USD por run completo de 60-90 min. |
| "¿Y si Claude se equivoca en el código?" | El agente tiene 5 tests de calidad obligatorios: `tsc --noEmit` debe retornar 0, los tests deben pasar, el deploy debe retornar HTTP 200. Si alguno falla, no se reporta como done. |
| "¿Por qué Next.js 16 y no Astro / Remix / SvelteKit?" | Decisión deliberada: estándar de mercado para builders no-devs, ecosistema gigante, deploy más sencillo a Vercel. Otros stacks vendrán en sesiones futuras. |

### Señal de cierre

> "Eso fue el agente-demo-builder. La próxima sesión tomamos esta misma máquina y la usamos para construir SU primer demo: uno con el script que escribieron en el pre-trabajo. Nos vemos."

---

## 4. Notas técnicas para edición

- Resolución: 1920×1080 mínimo · preferir 2K
- Audio: mono · -16 LUFS · sin música de fondo en bloques con código
- Subtítulos: español Colombia · siempre incluir
- Color de pausa: subtítulo translúcido durante PAUSAs si hay texto en pantalla
- Duración objetivo total: 8-12 min (Parte A ~4-5 min + Parte B ~5-7 min)

---

## 5. Checklist pre-grabación

- [ ] Demo funciona end-to-end en local antes de grabar
- [ ] `.env.local` con las 4 keys configuradas
- [ ] Pestañas/notificaciones cerradas (Slack, mail, etc.)
- [ ] Resolución de pantalla 1920×1080
- [ ] Modo claro vs oscuro definido (consistente)
- [ ] Mouse pointer visible y grande (sistema)
- [ ] Audio test: 30 seg de grabación de prueba
