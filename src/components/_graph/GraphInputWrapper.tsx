import { GraphFunction } from "@/hooks/definitions";
import { ReactNode } from "react";
import { Input } from "./GraphInput";

interface InputWrapper {
    functions: GraphFunction[],
    onToggle: (id: number) => void
    children: ReactNode
}

export function InputWrapper(
    { functions, onToggle, children }: InputWrapper)
{
    return (
        <div className="shrink-0 w-full flex flex-col gap-3">
            <div className="flex justify-center gap-2 flex-wrap">
                {functions.map((func) => 
                    <Input 
                        key={func.id} 
                        graphFunction={func} 
                        onToggle={onToggle} 
                    />
                )}
            </div>
            {children}                    
        </div> 
    )
}