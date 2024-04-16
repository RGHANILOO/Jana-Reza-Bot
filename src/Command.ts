import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

/**
 * defining the structure of the slash command 
 */
export type Command = ChatInputApplicationCommandData & {
    run: (client: Client, interaction: CommandInteraction) => void;
};