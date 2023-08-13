import {Client, Events} from "discord.js";
import {listenForCommands} from "./commands.ts";
import {env} from "./env.ts";

const client = new Client({intents: []});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

await listenForCommands(client);

await client.login(env.DISCORD_TOKEN);
