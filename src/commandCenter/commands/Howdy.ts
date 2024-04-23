import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../../Command'

export const Howdy: Command = {
    name: 'howdy',
    description: 'Howdy command',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = `Howdy!👋 How are you doing today ${client.user?.username}?`

        await interaction.followUp({
            //https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses
            ephemeral: true,
            content,
        })
    },
}
