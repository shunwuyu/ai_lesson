import type { Config } from 'drizzle-kit'

if (!process.env.NUXT_POSTGRESQL_DATABASE_URL) {
    throw new Error('NUXT_POSTGRESQL_DATABASE_URL is not set')
}


export default {
    schema: './database/schema',
    dialect: 'postgresql',
    out: './database/migrations',
    dbCredentials: {
        url: process.env.NUXT_POSTGRESQL_DATABASE_URL
    }
} satisfies Config