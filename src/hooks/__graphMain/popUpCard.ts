import { useEffect, useState } from "react";
import { GraphleStatus } from "../definitions"

const PAYLOAD = {
    
}


export function showEndCard(
    gameStatus: GraphleStatus)
{
    const [hasGameEnded, setGameState] = useState<GraphleStatus>("PLAYING")

    useEffect(() => {
        setGameState(gameStatus)
    }, [gameStatus])
    
    return hasGameEnded
} 