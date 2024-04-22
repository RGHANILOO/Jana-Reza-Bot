import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../Command";
// import OpenAI from "openai";
import 'dotenv/config';
import { fetchOpenAIChatCompletion } from "../../openai";
import { Prompt } from "../../types";

// const API_KEY = process.env.API_KEY;
// const API_URL = process.env.API_URL;
// console.log(API_KEY, API_URL);
// if (!API_URL || !API_KEY) {
//     throw new Error('API_URL or API_KEY is missing');
// }
// const openai = new OpenAI(API_KEY);

export const Assistant: Command = {
    name: "asssistant",
    description: "assistant command",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: "query",
        description: " tell me a nerdy joke",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: async (_: Client, interaction: CommandInteraction) => {
        const userInput = interaction.options.get('query');
        if (userInput === null || userInput === undefined) {
            await interaction.reply('Please provide a query');
            return;
        }
        const prompt: Prompt = { content: 'query'  || ''};
        
        try {
            const generatedText = await fetchOpenAIChatCompletion(prompt);
            await interaction.reply(generatedText);

        } catch (error) {
            console.error(error);
            // Consider providing a more user-friendly error message here
            await interaction.reply('An error occurred. Please try again later.');
        }
    }
}
// try {
//     const openai = new OpenAI(API_KEY);
//     // get the user query from the interaction
//     const query = interaction.options.get('query');
//     // call the open ai api to get the response

//     // Define the type of params object explicitly
//     interface Params {
//         messages: { role: string, content: string }[];
//         model: string;
//     }

//     // Construct the params object
//     const params: Params = {
//         messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
//         model: "No models available",
//     };

//     // Call the OpenAI API to get the response
//     const response = await openai.chat.completions.create(params);

//     const botReply = response.choices[0]?.message.content || 'I am sorry, I did not understand that';
//     // respond back to user with the response
//     await interaction.reply(botReply);
// } catch (error) {
//     console.error(error);
//     await interaction.reply('There was an error while processing your request');
// }
