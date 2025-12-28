import { Graphle, MongoDb, Record } from "@/db/init"
import { NextResponse } from "next/server"

/**
 * Handles POST request to retrieve or create user's profile
 * @param {Request} request - Incoming HTTP request object.
 * @returns {Promise<NextResponse>} JSON response containing User object
 */
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const graphleId = searchParams.get('id')

    if (!graphleId) {
        throw new Error("No graphle query")
    }

    try {
        const database = new MongoDb()
        const record: Graphle | false = await database.getGraphle(graphleId)
        
        if (!record) {
            throw new Error("You should not be seeing this one")
        }
        return NextResponse.json(record, { status: 200 })
    } catch (e) {
        return NextResponse.json(e, { status: 400 })
    }

}