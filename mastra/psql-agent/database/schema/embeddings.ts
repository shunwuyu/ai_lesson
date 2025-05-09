import { pgTable, text, varchar, vector, index } from 'drizzle-orm/pg-core';
import { startups } from './startup';


export const embeddings = pgTable('embeddings', {
    id: varchar('id', {length: 191})
        .primaryKey()
        .$defaultFn(() => nanoid()),
    content: text('content').notNull(),
    embedding: vector('embedding', {dimensions: 1536}).notNull(),
    startupId: varchar('startup_id', { length: 191 }).references(() => startups.id, {
        onDelete: 'cascade'
    })

}, (table) => [index('embedding_index').using('hnsw', table.embedding.op('vector_cosine_ops'))])

export type Embedding = typeof embeddings.$inferSelect;