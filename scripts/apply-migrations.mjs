// scripts/apply-migrations.mjs
// Aplica todas las migrations bajo supabase/migrations/ contra la DB de Supabase.
// Uso: node scripts/apply-migrations.mjs
// Requiere: DATABASE_URL en env (o .env.local con SUPABASE_URL + DATABASE_PASSWORD)

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations')

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('Set DATABASE_URL env var (postgres connection string).')
  process.exit(1)
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
await client.connect()
console.log('Connected to Supabase Postgres')

const files = (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort()
console.log(`Found ${files.length} migration(s)`)

for (const file of files) {
  const sql = await readFile(path.join(migrationsDir, file), 'utf8')
  console.log(`-> applying ${file}`)
  await client.query(sql)
  console.log(`OK ${file}`)
}

await client.end()
console.log('All migrations applied successfully.')
