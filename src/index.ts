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

const addTwoNumbers = (a, b) => {
    return a + b;
};

it("Should add the two numbers together", () => {
    expect(addTwoNumbers(2, 4)).toEqual(6);
    expect(addTwoNumbers(10, 10)).toEqual(20);
});