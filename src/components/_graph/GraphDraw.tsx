'use client'
import "@/../node_modules/mafs/core.css" // Include this XD
import { drawGraphFunctions } from "@/hooks/__graphFunctions/functionDraw"
import { GraphFunction } from "@/hooks/definitions"
import { Mafs, Coordinates } from "mafs"

export function DrawGraph(
    { functions }: { functions: GraphFunction[] })
{
    const axis = Number(process.env.NEXT_PUBLIC_AXIS_LENGTH!) || 4
    const subdivisions = Number(process.env.NEXT_PUBLIC_SUBDIVISIONS_COUNT!) || 1
    return (
        <Mafs
            pan={false}
            zoom={false}
            preserveAspectRatio={false}
            viewBox={{ 
                    x: [-axis, axis],
                    y: [-axis-8, axis] // -8 makes it even xd
            }}
        >
             <Coordinates.Cartesian subdivisions={subdivisions} />
            { drawGraphFunctions(functions) }
        </Mafs>
    )
}