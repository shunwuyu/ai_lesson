import { startups } from '../../../database/schema';

export default defineEventHandler(async (event) => {
    const result = await db.select().from(startups)
    return result
})