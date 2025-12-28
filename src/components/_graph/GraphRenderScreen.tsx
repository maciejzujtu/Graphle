import { ReactNode } from "react";
import { isScreenTooSmall } from "@/hooks/_main/adjustScreenSize"
import { Screen } from "@/hooks/definitions";

function SmallScreenWarning({ 
    props } : { props: Screen }) 
{
    const minW = process.env.NEXT_PUBLIC_MIN_WIDTH!
    const minH = process.env.NEXT_PUBLIC_MIN_HEIGHT

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center text-neutral-400 bg-neutral-900">
            <div className="mb-4 text-4xl">📱</div>
            <h2 className="text-xl font-bold text-white mb-2">Device too small</h2>
            <p className="text-sm mb-4">Please resize your window.</p>
            <div className="p-3 bg-neutral-800 rounded text-xs font-mono border border-neutral-700">
                <p className="text-red-400">Current: {props.width}px × {props.height}px</p>
                <p className="text-green-500 mt-1">Needs: {minW}px × {minH}px</p>
            </div>
        </div>
    )
}

export function Render({
    children, props}: { children: ReactNode, props: Screen }) 
{
    if (isScreenTooSmall(props)) {
        return (
            <SmallScreenWarning props={props} />
        )    
    }

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col w-full max-w-md h-full px-4 pt-2 pb-20 text-white">
                {children}
            </div>
        </div>
    )
}