import { Dispatch, SetStateAction } from "react";
import { COLORS, GraphFunction } from "@/hooks/definitions"
import { formatGraphFunction } from "./functionFormat";

function isGraphFunctionValid(
    expression: string
): boolean {
    const test = formatGraphFunction(expression)
    if (Number.isNaN(test(1))) {
        return false
    }
    return true
}

export function addGraphFunction(
    setCurrentFunctions: Dispatch<SetStateAction<GraphFunction[]>>,
    expression: string,
): GraphFunction[] | void {
    if (!isGraphFunctionValid(expression)) {
        return
    }
    
    setCurrentFunctions((previousFunctions) => {
        const currentFunctions = previousFunctions || []
        const colorIndex = currentFunctions.length
        const color = COLORS[colorIndex-1]
        const newestFunction: GraphFunction = {
            id: Date.now(),
            expression: expression,
            visible: true,
            color: color
        }

        return [...currentFunctions, newestFunction]
    })
}