import { DiscordUser, getDiscordUserData } from "./userToken"

export async function getProfileData(): Promise<DiscordUser | null> {
    const discordUserData = await getDiscordUserData()
    const response = await fetch(`/profile?userId=${discordUserData.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordUserData)
    })
    if (!response.ok) {
        return null
    }
    return await response.json() as DiscordUser
}