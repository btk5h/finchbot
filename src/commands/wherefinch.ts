import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("wherefinch")
    .setDescription("Where in the world is Finch today?")

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({content: 'Finch is gone :('});
}
