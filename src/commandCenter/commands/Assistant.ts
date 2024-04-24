import {
    CommandInteraction,
    Client,
    ApplicationCommandType,
    ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../../Command'
import 'dotenv/config'
import { fetchOpenAIChatCompletion } from '../../openai'

export const Assistant: Command = {
    name: 'assistant',
    description: 'assistant command',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'query',
            description: ' tell me a nerdy joke',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (_: Client, interaction: CommandInteraction) => {
        const userInput = interaction.options.get('query')?.value as string
        console.log(userInput)
        if (userInput === null || userInput === undefined) {
            // await interaction.reply('Please provide a query');
            return
        }

        try {
            const generatedText = await fetchOpenAIChatCompletion(userInput)
            console.log(generatedText)
            await interaction.followUp(generatedText)
        } catch (error) {
            console.error(error)
            // Consider providing a more user-friendly error message here
            // await interaction.reply('An error occurred. Please try again later.');
        }
    },
}
