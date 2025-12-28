import Json from '@/../.json'
import { Dispatch, SetStateAction } from 'react'

export const DUMMY_GRAPHLE: GraphFunction = {
    id: 0,
    color: "#FFFFFB",
    expression: "1",
    visible: true,
}

// .env.local
export const AXIS = Number(process.env.NEXT_PUBLIC_AXIS_LENGTH!) || 4
export const MIN_WIDTH = Number(process.env.NEXT_PUBLIC_MIN_WIDTH!)    || 450
export const MIN_HEIGHT = Number(process.env.NEXT_PUBLIC_MIN_HEIGHT!)  || 450
export const LIMIT = Number(process.env.NEXT_PUBLIC_FUNCTIONS_PER_GRAPH!)
export const GRAPHLE_START = process.env.NEXT_PUBLIC_GRAPHLE_START!    || "27-12-2025"
// .json
export const COLORS = Json.GraphFunctions.ColorSchema
export type JsonConfig = {
    Functions: {
        colorSchema: string[],
        replacements: Record<string, string[]>
    }
}

export interface GraphFunction {
    id: number,
    expression: string,
    color: string,
    visible: boolean,
}

export type GraphleStatus = "PLAYING" | "LOST" | "WON"

export interface UseGraphleGame {
    functions: GraphFunction[]
    gameStatus: GraphleStatus
    toggleGraphFunction: (id: number) => void
    submitGuess: (expression: string) => void
}

export type FunctionState = "GOOD" | "BAD" | "OUT_OF_BOUNDS"

export interface Screen {
    width: number,
    height: number,
    isLoaded: boolean
}
