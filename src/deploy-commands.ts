import {REST, Routes} from "discord.js";
import {env} from "./env.ts";
import {commands} from "./commands.ts";

const commandData = Array.from(commands.values()).map(c => c.data.toJSON());

const rest = new REST().setToken(env.DISCORD_TOKEN)

console.log(`Deploying ${commandData.length} slash commands`)

const data: any[] = await rest.put(
    Routes.applicationCommands(env.DISCORD_CLIENT_ID),
    { body: commandData },
) as any;

console.log(`Deployed ${data.length} slash commands`)
