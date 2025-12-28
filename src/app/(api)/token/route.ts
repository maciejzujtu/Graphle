import { NextRequest, NextResponse } from 'next/server'

/**
 * Exchanges a temporary authorizastion code for Discord's Access Token
 * @param {NextRequest} request - Request object containing our code
 * @returns {Promise<NextResponse>} JSON response containing access and refresh token
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    /**
     * Parse the authorization code from the client-side request.
     * This code is returned by Discord in the URL query params after the user logs in.
     */
    const { code } = await request.json()

    /** Send a POST request to Discord's token endpoint */
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id:  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID! as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET! as string,
            grant_type: 'authorization_code',
            code: code
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })

    if (!response.ok) {
        throw new Error("Bad response")
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
}
