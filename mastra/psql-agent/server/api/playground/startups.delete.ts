import { eq } from 'drizzle-orm'
import { startups } from '~/database/schema'

export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)
    const result = await db.delete(startups).where(eq(startups.id, id as string));
    return result 
    
})