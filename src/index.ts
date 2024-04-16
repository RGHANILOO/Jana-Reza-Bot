import 'dotenv/config'
import { Client} from "discord.js"
import ready from './listeners/ready';
import interactionCreator from './listeners/interactionCreator';

const token = process.env.TOKEN;
console.log('FACTROID IS starting .....')
const client = new Client({
    intents: []

});

ready(client); // registering the listener
interactionCreator(client); //listerning to interactipon 
client.login(token);