import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const config = useRuntimeConfig()

const client = postgres(config.postgresqlDatabaseUrl)

export const db = drizzle(client)