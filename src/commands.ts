import {readdir} from "fs/promises";
import {ChatInputCommandInteraction, Client, Events, SlashCommandBuilder} from "discord.js";

export type FileBasedCommand = {
    data: SlashCommandBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
};

export const commands = await collectCommands();

async function collectCommands(): Promise<Map<string, FileBasedCommand>> {
    const commands = new Map<string, FileBasedCommand>();

    const commandDir = `${import.meta.dir}/commands`;
    const commandFiles = await readdir(commandDir);

    for (const commandFile of commandFiles) {
        const command: FileBasedCommand = import.meta.require(`${commandDir}/${commandFile}`);

        if (!command.data || !command.execute) {
            throw new Error(`${commandFile} must export data and execute members.`);
        }

        commands.set(command.data.name, command);
    }

    return commands;
}

export async function listenForCommands(client: Client) {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
}
