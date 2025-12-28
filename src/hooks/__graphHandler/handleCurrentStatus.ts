import { useCallback, useState } from "react";
import { GraphFunction, GraphleStatus, LIMIT } from "../definitions";
import { formatGraphFunction } from "../__graphFunctions/functionFormat";
import { Graphle } from "@/db/init";

const isGuessCorrect = (usersExpression: string, todaysGraphleExpression: string): boolean => {
    try {
        const user = formatGraphFunction(usersExpression)
        const admin = formatGraphFunction(todaysGraphleExpression)
        const EPS = 0.001
        
        for (let i = -5; i <= 5; i++) {
            const a = user(i)
            const b = admin(i)
            
            if (!isFinite(a) || !isFinite(b)) continue
            if (Math.abs(a - b) > EPS) {
                return false
            }
        }
        return true
    } catch {
        return false
    }
}

export function graphleCurrentStatus
({ updateGraphFunctions, currentGraphFunctions, todaysGraphle } : 
{ 
    updateGraphFunctions: (expression: string) => void | GraphFunction[], 
    currentGraphFunctions: GraphFunction[],
    todaysGraphle: Graphle }) 
{
    const [currentStatus, setCurrentStatus] = useState<GraphleStatus>("PLAYING")

    const guessGraphFunction = useCallback((expression: string) => {
        updateGraphFunctions(expression)
        if (isGuessCorrect(expression, todaysGraphle.props.expression)) {
            setCurrentStatus("WON")
        }

        if (currentGraphFunctions.length >= (LIMIT-1)) {
            setCurrentStatus("LOST")
        }
    }, [updateGraphFunctions])

    return {
        guessGraphFunction: guessGraphFunction,
        currentStatus: currentStatus
    }
}