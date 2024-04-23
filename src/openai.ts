import OpenAI from 'openai'
import 'dotenv/config'

const API_KEY = process.env.API_KEY

if (!API_KEY) {
    throw new Error('API_URL or API_KEY is missing')
}
const openai = new OpenAI({ apiKey: process.env.API_KEY })

export async function fetchOpenAIChatCompletion(
    userInput: string
): Promise<string> {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userInput },
            ],
            stream: true, // Enable streaming for chunks
        })

        let generatedText: string = '' // Initialize empty string
        for await (const chunk of completion) {
            if (chunk.choices[0]?.delta?.content === undefined) {
                break
            }
            generatedText += chunk.choices[0]?.delta?.content
        }
        return generatedText
    } catch (error) {
        console.error(error)
        throw new Error('An error occurred while processing your request.')
    }
}
