import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({ 
    model: "gpt-3.5-turbo",
    apiKey: "sk-X0elCqFwBaSuKkLwmcvMKGMlacmRAwmb2hjaKm4MxBu2cdIY",
    configuration: {
        baseURL: 'https://api.302.ai/v1/'
    }
});



export default defineEventHandler(async (event) => {
    const { question, history } = (await readBody(event)) as {
        question: string
        history: string[]
    }

    if (!question) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No question provided',
        })
    }

    // console.log(question)

    const sanitizedQuestion = question.trim().replaceAll('\n', ' ')


    event.node.res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
    })
    const sendData = (data: string) => {
        event.node.res.write(`data: ${data}\n\n`)
    }

    sendData(JSON.stringify({ data: '' }))

    try {
        console.log('/////')
        const messages = [
            new HumanMessage(question),
        ];

        const response = await model.invoke(messages);
        sendData(JSON.stringify({ content: response.content }))
    } catch (error) {
        console.error('error', error)
    } finally {
        sendData('[DONE]')
        event.node.res.end()
    }
})