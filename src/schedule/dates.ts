import {endOfWeek, Interval, startOfWeek} from "date-fns";

export function startOfRaidWeek(date: Date): Date {
    return startOfWeek(date, {weekStartsOn: 2});
}

export function endOfRaidWeek(date: Date): Date {
    return endOfWeek(date, {weekStartsOn: 2});
}

export function intervalOfRaidWeek(date: Date): Interval {
    return {
        start: startOfRaidWeek(date),
        end: endOfRaidWeek(date)
    }
}
