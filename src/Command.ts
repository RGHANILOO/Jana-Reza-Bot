import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

/**
 * defining the structure of the slash command 
 */
export  interface Command extends ChatInputApplicationCommandData{
    run: (client: Client, interaction: CommandInteraction) => void;
}