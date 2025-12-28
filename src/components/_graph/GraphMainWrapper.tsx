import { ReactNode } from "react"
import { Screen } from "@/hooks/definitions"

export function MainWrapper({ 
    children, props }: { children: ReactNode, props: Screen    
}) {
    if (!props.isLoaded) {
        return (
            <div className="h-screen w-full bg-neutral-900"/>
        )
    }

    return (
        <div className="h-[110dvh] w-full bg-neutral-900 overflow-hidden relative">
            {children}
        </div>
    )
}