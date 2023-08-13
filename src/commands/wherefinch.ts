import {bold, ChatInputCommandInteraction, SlashCommandBuilder, time} from "discord.js";
import {addWeeks, format, max} from "date-fns";
import {VEvent} from "node-ical";
import {intervalOfRaidWeek} from "../schedule/dates.ts";
import {findAndPartitionEventsByDay} from "../schedule/calendar.ts";

export const data = new SlashCommandBuilder()
    .setName("wherefinch")
    .setDescription("Where in the world is Finch?")
    .addStringOption(option =>
        option
            .setName("week")
            .setRequired(false)
            .setDescription("What week of Finch's schedule we talking about?")
            .addChoices(
                {name: "last week", value: "-1"},
                {name: "this week", value: "0"},
                {name: "next week", value: "1"},
                {name: "in two weeks", value: "2"}
            )
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const queryWeek = interaction.options.getString("week", false) ?? "0";
    const startDay = addWeeks(new Date(), Number(queryWeek));
    const interval = intervalOfRaidWeek(startDay);
    const schedule = await findAndPartitionEventsByDay(interval);

    let reply = `Here's Finch's class schedule for the week starting on ${time(new Date(interval.start), "D")}:\n\n`

    schedule.forEach((events, encodedDate) => {
        const date = new Date(encodedDate);
        const dayOfWeek = format(date, "EEEE");

        reply += `${bold(dayOfWeek)} - ${formatAvailability(events)}\n`
    });

    await interaction.editReply({content: reply});
}

function formatAvailability(events: VEvent[]) {
    if (events.length === 0) {
        return "I am free from the wheel :tada:";
    }

    const endDate = max(events.map(e => e.end));
    return `Class ends at ${time(endDate, "t")}`
}
