import { Plot } from "mafs";
import { GraphFunction } from "@/hooks/definitions"
import { formatGraphFunction } from "./functionFormat";

export function drawGraphFunctions(
    functions: GraphFunction[]
) {
    return functions.map((func) => {
        if (!func.visible) {
            return null
        }

        const graphFunction = formatGraphFunction(func.expression)
        return (
            <Plot.OfX
                key={func.id}
                y={(x) => graphFunction(x) }
                color={func.color}
            />
        )
    })
}