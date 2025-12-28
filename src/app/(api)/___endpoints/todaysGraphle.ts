import { Graphle } from "@/db/init"
import { formatUnixToDate, getDaysPassed } from "@/hooks/_main/timeFormat"
import { GRAPHLE_START } from "@/hooks/definitions"

export async function getTodaysGraphle(): Promise<Graphle> {
    const daysSinceStart = getDaysPassed(GRAPHLE_START)
    const response = await fetch(`/graphle?id=DAY_0`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
        throw new Error(`Could not find graphle`)
    }
    return await response.json()
}