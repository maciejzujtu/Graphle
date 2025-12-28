import { AXIS, FunctionState } from "@/hooks/definitions"
import { formatGraphFunction } from "./functionFormat";

export function graphFunctionState(
    expression: string): FunctionState
{
    try {

        if (!expression || expression.trim() === "") {
            return "BAD"
        }

        const graphFunction = formatGraphFunction(expression)
        if (Number.isNaN(graphFunction(1))) {
            return "BAD"
        }

        let isFunctionVisible = false
        for (let x = -AXIS; x <= AXIS; x += 0.5) {
            const y = graphFunction(x)
            if (!Number.isNaN(y) && y >= -AXIS && y <= AXIS) {
                isFunctionVisible = true
                break
            }
        }
        if (!isFunctionVisible) {
            return "OUT_OF_BOUNDS"
        }

        return "GOOD"
    } catch {
        return "BAD"
    }
}