import 'dotenv/config'
import { Client, Intents } from "discord.js"

const token = process.env.TOKEN;
const client = new Client({
    intents: [Intents.FLAGS.GUILDS],

});
client.once("ready", () => {
    console.log("   Ready!");
})

client.login(token);