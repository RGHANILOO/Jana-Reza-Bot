import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commandCenter/Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction)
        }
    })
}
const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    // this is where the slash command will be handled
    const slashCommand = Commands.find(command => command.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({content: 'we havea problem'})
        return;
    }
    await interaction.deferReply();
    slashCommand.run(client, interaction);


};