import { startups } from '~/database/schema'

export default defineEventHandler(async (event) => {
    const { name, content} = await readBody(event);
    const result = await db.insert(startups).values({
        name, content
    })
    return result;
})