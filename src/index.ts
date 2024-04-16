import 'dotenv/config'
import { Client} from "discord.js"
import ready from './listeners/ready';

const token = process.env.TOKEN;
if (!token) {
    console.error('No token provided');
    process.exit(1);
}
console.log('FACTROID IS starting .....')
const client = new Client({
    intents: []

});

ready(client);
client.login(token);