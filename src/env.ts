export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN!

export const FINCH_CALENDAR = process.env.FINCH_CALENDAR!

if (!DISCORD_CLIENT_ID) {
    throw new Error("Environment variable DISCORD_CLIENT_ID must be set")
}

if (!DISCORD_TOKEN) {
    throw new Error("Environment variable DISCORD_TOKEN must be set")
}

if (!FINCH_CALENDAR) {
    throw new Error("Environment variable FINCH_CALENDAR must be set")
}
