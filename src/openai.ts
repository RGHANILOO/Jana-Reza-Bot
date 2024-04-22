
import 'dotenv/config';
import OpenAI from "openai";
import { Prompt } from "./types";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
console.log(API_KEY, API_URL);
if (!API_URL || !API_KEY) {
    throw new Error('API_URL or API_KEY is missing');
}
const openai = new OpenAI({ apiKey: process.env.API_KEY });



export async function fetchOpenAIChatCompletion(prompt: Prompt): Promise<string> {
    let prompt = ''
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Hello!" },
            ],
            stream: true, // Enable streaming for chunks
        });

        let generatedText: string = ""; // Initialize empty string
        for await (const chunk of completion) {
            generatedText += chunk.choices[0];

        }
        return generatedText;

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while processing your request.');
    }
}
