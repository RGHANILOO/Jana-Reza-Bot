import { Client } from "discord.js";
/**
 * sepreating and registering a listner to listen to 
 * variety of messages, user activities  etc
 * 
 */
export default (client: Client): void => {
    // :void as its non value returning func
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        console.log(`${client?.user?.username} is online and ready !`)
    });

}