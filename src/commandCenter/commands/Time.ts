import {
    CommandInteraction,
    Client,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} from 'discord.js'
import { Command } from '../../Command'
import dayjs from 'dayjs'
import { stringToTime } from '../utils/stringToTime'

export const Time: Command = {
    name: 'time',
    description: 'turn a local time into a global timestamp',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'when',
            description:
                "a time like 'tomorrow at 4pm' or 'next week sunday at 12'",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (_: Client, interaction: CommandInteraction) => {
        const userInput = interaction.options.get('when')?.value as string
        let targetTime
        try {
            targetTime = stringToTime(userInput, interaction.createdAt)
        } catch (error) {
            console.error(error)
            targetTime = null
        }
        const content = targetTime
            ? `Here's your timestamp for <t:${dayjs(targetTime).unix()}> \`<t:${dayjs(targetTime).unix()}>\``
            : "Sorry, I didn't understand."

        await interaction.followUp({
            content,
            ephemeral: true,
        })
    },
}
