import { eq } from 'drizzle-orm'
import { startups } from '~/database/schema'

export default defineEventHandler(async (event) => {
    const { id, name, content } = await readBody(event);
    const result = await db.update(startups).set({name, content}).where(eq(startups.id, id));
    return result;
})