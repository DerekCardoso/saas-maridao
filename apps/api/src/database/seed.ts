import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { serviceCategories } from "./schema"

const connectionString = process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL
if (!connectionString) throw new Error("Database URL is required")

const categories = [
  ["eletrica", "Eletrica"],
  ["hidraulica", "Hidraulica"],
  ["montagem-moveis", "Montagem de Moveis"],
  ["pintura", "Pintura"],
  ["reparos-gerais", "Reparos Gerais"],
  ["instalacoes", "Instalacoes"]
] as const

async function main() {
  const pool = new Pool({ connectionString })
  const db = drizzle(pool)
  try {
    await db
      .insert(serviceCategories)
      .values(categories.map(([slug, name]) => ({ slug, name })))
      .onConflictDoNothing()
  } finally {
    await pool.end()
  }
}

void main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
