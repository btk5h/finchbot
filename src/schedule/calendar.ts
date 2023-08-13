import ical, {CalendarResponse, VEvent} from "node-ical";
import {FINCH_CALENDAR} from "../env.ts";
import {eachDayOfInterval, Interval, isWithinInterval, startOfDay} from "date-fns";

export async function fetchFinchCalendar(): Promise<CalendarResponse> {
    return ical.async.fromURL(FINCH_CALENDAR);
}

export async function findAndPartitionEventsByDay(interval: Interval) {
    const calendar = await fetchFinchCalendar();

    const events = new Map<number, VEvent[]>(
        eachDayOfInterval(interval).map(day => [day.getTime(), []])
    );

    for (const event of Object.values(calendar)) {
        if (event.type !== "VEVENT") continue;
        if (event.datetype === "date") continue;

        if (isWithinInterval(event.start, interval)) {
            events.get(startOfDay(event.start).getTime())!.push(event);
        }
    }

    return events;
}
