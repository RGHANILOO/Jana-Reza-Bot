import {
    CommandInteraction,
    Client,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from 'discord.js'
import { Command } from '../../Command'
import { stringToTime } from '../utils/stringToTime'
import dayjs from 'dayjs'
import { fetchOpenAIChatCompletion } from '../../openai'

const partySystemPrompt =
    'You are specialised in generating fun party ideas and games that are doable over voice chats like discord. When prompted by a user you will respond with a JSON object containing a name and description of the party.'

export const Partify: Command = {
    name: 'partify',
    description: 'start a party!',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'theme',
            description:
                'what kind of party? e.g. "halloween skeletons party games"',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'when',
            description:
                "a time like 'tomorrow at 4pm' or 'next week sunday at 12'",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (_: Client, interaction: CommandInteraction) => {
        console.log(interaction.options.get('theme')?.value)
        const timeInput = interaction.options.get('when')?.value as string
        const targetTime = stringToTime(timeInput, interaction.createdAt)

        const generatedPartyIdea = await fetchOpenAIChatCompletion(
            interaction.options.get('theme')?.value as string,
            partySystemPrompt
        )
        const partyJson = JSON.parse(generatedPartyIdea)
        console.log(partyJson)
        // this gives us an object to use in creating the event
        // { name: string, description: string }

        // code to generate event goes here

        await interaction.followUp({
            content: `OK! You've got a party coming up at <t:${dayjs(targetTime).unix()}>`,
        })
    },
}
