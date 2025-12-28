import { useEffect, useState } from "react"
import { addGraphFunction } from "../__graphFunctions/functionAdd"
import { GraphFunction } from "../definitions"
import { Graphle } from "@/db/init"

export function graphFunctionHandler(
    { todaysGraphle } : { todaysGraphle: Graphle })
{
    const [graphFunctions, setGraphFunctions] = useState<GraphFunction[]>(
        todaysGraphle?.props ? [todaysGraphle.props] : []
    )

    useEffect(() => {
        if (todaysGraphle?.props) {
            setGraphFunctions([todaysGraphle.props])
        }
    }, [todaysGraphle])

    const toggleGraphFunction = (id: number) => {
        setGraphFunctions((prev) => prev.map(f => 
            f.id === id ? { ...f, visible: !f.visible } : f
        ))
    }

    const updateGraphFunctions = (expression: string) => {
        return addGraphFunction(setGraphFunctions, expression)
    }

    return {
        currentGraphFunctions: graphFunctions,
        updateGraphFunctions: updateGraphFunctions,
        toggleGraphFunction: toggleGraphFunction
    }
}