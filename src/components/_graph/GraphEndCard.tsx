import { GraphleStatus } from "@/hooks/definitions"
import { useState } from "react"

export function EndCard(
    { hasGameEnded }: { hasGameEnded: GraphleStatus }) 
{

    const [isClosed, setCloseState] = useState<boolean>(false)

    if (hasGameEnded === "PLAYING") {
        return // If you still play don't show the end card.
    }

    if (isClosed) {
        return // If you clicked the close button
    }

    // TODO:
    // API call to the Db, to retrieve info about user's statistics.

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center">
                <div className="text-4xl">XD</div>
                <h2 className="text-2xl font-bold text-white">
                    
                </h2>
                
                <p className="text-neutral-400">
                    <br/>
                    <span className={`font-mono font-bold text-xl red`}>
                        sin(x)
                    </span>
                </p>
                
                <button  
                    onClick={() => setCloseState(true)}
                    className="mt-2 px-6 py-2 bg-white text-black font-bold rounded hover:bg-neutral-200 transition-colors"
                >
                    
                    Close
                </button>
            </div>
        </div>
    )
}