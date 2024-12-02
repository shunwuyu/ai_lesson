import dotenv from 'dotenv'
import OpenAI from 'openai';
import Koa from 'koa';
import Router from 'koa-router';
import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_KEY,
    baseURL:'https://api.gptsapi.net/v1'
})

const app = new Koa()
const router = new Router();
app.use(cors())
app.use(bodyParser())

router.get('/', ctx => {
    ctx.body = 'hello world'
})

router.post('/logo', async (ctx) => {
    console.log(ctx.request.body)
    // ctx.body = 'hello'
    const { title, desc} = ctx.request.body
    const prompt = `
    你是一个logo设计师，
    请为应用名为${title},
    描述为${desc}的移动端App
    设计一个高端，大气，上档次的logo
    `
    const response = await client.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    ctx.body = {
        url: response.data[0].url
    }
    // console.log(response.data[0].url)
})

app.use(router.routes())

app.listen(3000)

// const main = async () => {
//     const response = await client.images.generate({
//         model: "dall-e-3",
//         prompt: "A spaceship flying through the universe",
//         n: 1,
//         size: "1024x1024",
//     });
//     console.log(response.data[0].url)
// }

// main();