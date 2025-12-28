import { GraphFunction } from "@/hooks/definitions";
import { getShadow } from "@/hooks/_main/getShadowColor";

interface Input {
    graphFunction: GraphFunction,
    onToggle: (id: number) => void
}

export function Input(
    { graphFunction, onToggle }: Input)  
{   
    return (
        <div 
            className="w-12 h-8 border border-neutral-600 flex items-center justify-center text-xl font-bold text-white uppercase rounded-lg cursor-pointer select-none transition-all"
            onClick={() => onToggle(graphFunction.id)}
            style={{
                borderColor: graphFunction.color,
                color: graphFunction.visible ? '#FFFF00' : graphFunction.color, 
                backgroundColor: graphFunction.visible ? graphFunction.color : getShadow(graphFunction.color, 0.1) 
            }}
        />
    )
}