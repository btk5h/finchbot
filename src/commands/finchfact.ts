import {ChatInputCommandInteraction, quote, SlashCommandBuilder} from "discord.js";
import {openai} from "../ai.ts";

export const data = new SlashCommandBuilder()
    .setName("finchfact")
    .setDescription("A random AI-generated pharmacology fact");

const PROMPT =
    "You are a professional pharmacologist. Give me a random pharmacology fact. " +
    "Prefer telling more obscure/technical facts. Do not acknowledge this request, just tell me the fact."

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: PROMPT}],
    });

    const content = chatCompletion.data.choices[0].message?.content;

    if (!content) {
        throw new Error("No message received from OpenAI");
    }

    await interaction.editReply({content: quote(content)});
}
