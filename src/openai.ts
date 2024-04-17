// import OpenAI from 'openai';
import 'dotenv/config';

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
console.log(API_KEY, API_URL);
if (!API_URL || !API_KEY) {
    throw new Error('API_URL or API_KEY is missing');
}

export const fetchOpenAIChatCompletion = async (prompt: string): Promise<string> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Auhtorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a friendly AI assistant.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]

        })
    })
    const data = await response.json();
    return data.choices[0].message.content.trim();
};