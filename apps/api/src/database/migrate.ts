import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_MIGRATION_URL
if (!connectionString) throw new Error("DATABASE_MIGRATION_URL is required")

async function main() {
  const pool = new Pool({ connectionString })
  try {
    await migrate(drizzle(pool), { migrationsFolder: "./drizzle" })
  } finally {
    await pool.end()
  }
}

void main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
