import { MongoDb, Record } from "@/db/init"
import { NextResponse } from "next/server"

/**
 * Handles POST request to retrieve or create user's profile
 * @param {Request} request - Incoming HTTP request object.
 * @returns {Promise<NextResponse>} JSON response containing User object
 */
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        throw new Error("No user query")
    }

    try {
        const database = new MongoDb()
        let record: Record | false = await database.getProfile(userId)
        
        if (!record) {
            const { id, username } = await request.json()
            await database.addProfile({ id, username })
            record = { id, username }
        }
        return NextResponse.json(record, { status: 200 })
    } catch (e) {
        return NextResponse.json(e, { status: 400 })
    }

}