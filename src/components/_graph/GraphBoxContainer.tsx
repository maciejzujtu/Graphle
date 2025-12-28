import { ReactNode } from "react";

export function GraphContainer({ children }: { children: ReactNode } ) {
    return (
        <div className="flex-1 min-h-0 w-full border-2 border-neutral-700 black rounded-lg overflow-hidden relative shadow-xl mb-4">
            <div className="absolute inset-0">
                {children}
            </div>
        </div>
    )
}