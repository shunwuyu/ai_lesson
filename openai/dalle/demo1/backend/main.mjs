import dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:'sk-EotDnSmaUpIchUFfXMOpmx0QBHUPe43c2Rr8UOUiEzBwCYUJ',
    baseURL:''
})

const main = async () => {
    const response = await client.images.generate({
        model: "dall-e-3",
        prompt: "A spaceship flying through the universe",
        n: 1,
        size: "1024x1024",
    });
    console.log(response.data[0].url)
}

main();