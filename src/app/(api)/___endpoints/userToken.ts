import { DiscordSDK } from "@discord/embedded-app-sdk"

export interface DiscordUser {
    id: string,
    username: string
}

/**
 * Internal "API" to retrieve a valid OAuth2 access token.
 *  This function implements caching strategy to prevent
 * re-authentication the user on every call.
 */
async function getUserToken(): Promise<{ accessToken: string }> {
    const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID! as string
    const SDK = new DiscordSDK(CLIENT_ID)
    await SDK.ready()

    let accessToken: string | null = sessionStorage.getItem('discord_access_token')
    // If access is not in storage, send a pop up request
    // to the user and ask him to connect with the Activity
    if (!accessToken) {
        const { code } = await SDK.commands.authorize({
            client_id: CLIENT_ID,
            response_type: 'code',
            state: '',
            prompt: 'none',
            scope: ['identify', 'guilds', 'applications.commands'],
        })
        const response = await fetch('/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        })
        if (!response.ok) {
            throw new Error("Bad response")
        }
        const data = await response.json()
        accessToken = data.access_token as string
        sessionStorage.setItem('discord_access_token', accessToken)
    }

    return { accessToken }
}

/**
 * Main function to fetch the current user's profile.
 * @returns {Promise<DiscordUser>}
 */
export async function getDiscordUserData(): Promise<DiscordUser> {
    const { accessToken } = await getUserToken()
    const url = 'https://discord.com/api/v10/users/@me'  
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error("Bad response");
    }
    const data = await response.json()
    return {
        id: data.id,
        username: data.username
    }
}