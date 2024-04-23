import { Client } from 'discord.js'
// we register all the commands with the client in the ready event
import { Commands } from '../commandCenter/Commands'

/**
 * sepreating and registering a listner to listen to
 * variety of messages, user activities  etc
 *
 */
export default (client: Client): void => {
    // :void as its non value returning func
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return
        }
        // registering all the commands
        await client.application.commands.set(Commands)
        console.log(`${client?.user?.username} is online and ready !`)
    })
}
