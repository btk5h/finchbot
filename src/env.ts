export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN!

if (!DISCORD_CLIENT_ID) {
    throw new Error("Environment variable DISCORD_CLIENT_ID must be set")
}

if (!DISCORD_TOKEN) {
    throw new Error("Environment variable DISCORD_TOKEN must be set")
}
