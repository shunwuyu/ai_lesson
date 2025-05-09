import { pgTable, varchar, text } from 'drizzle-orm/pg-core'

export const startups = pgTable('startups', {
    
    id: varchar('id', { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),
    name: varchar({length: 256}).notNull(),
    content: text()
})

export type Startup = typeof startups.$inferSelect