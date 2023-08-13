import {cleanEnv, str, url} from "envalid";

export const env = cleanEnv(process.env, {
    DISCORD_CLIENT_ID: str({desc: "The application id of the Discord application"}),
    DISCORD_TOKEN: str({desc: "The bot token of the Discord application"}),
    FINCH_CALENDAR: url({desc: "A link to Finch's schedule, in .ics format"}),
    OPENAI_KEY: str({desc: "The API key for the OpenAI API"})
});
