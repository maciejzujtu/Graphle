import React, { useState } from "react";
import { FunctionState, GraphFunction, GraphleStatus, LIMIT } from "../definitions";
import { graphFunctionState } from "../__graphFunctions/functionState";

function _currentBarPlaceholder(gameStatus: GraphleStatus, state: FunctionState) {
    if (state !== "GOOD") {
        switch (state) {
            case "BAD": 
                return "Invalid syntax!"
            case "OUT_OF_BOUNDS": 
                return "Out of bounds!"
            default: 
                return "Error!"
        }
    }

    switch (gameStatus) {
        case "LOST":
            return "You've lost today's Graphle!"
        case "WON":
            return "You've won today's Graphle!"
        case "PLAYING": 
            return "Guess the function"
    }
}

function _currentBarCSS(state: FunctionState) {
    if (state !== "GOOD") {
        return `
            text-red-500
            placeholder-red-400
            animate-shake
            border-red-500
        `
    } 

    return `
        border-neutral-600
        placeholder-neutral-500    
    `
}

export function barInputHandler({
    graphFunctionCount, 
    gameStatus, 
    guessGraphFunction
} : {
    graphFunctionCount: number,
    gameStatus: GraphleStatus,
    guessGraphFunction: (graphExpression: string) => void
}) {
    const [currentUserInput, setUserInput] = useState<string>("")
    const [isBarError, setBarError] = useState<FunctionState>("GOOD")
    
    const isPlaying = gameStatus === "PLAYING"
    const isOutOfTries = graphFunctionCount >= LIMIT
    const cd = 500

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return

        const state = graphFunctionState(currentUserInput) 

        if (state !== "GOOD") {
            const savedInput = currentUserInput 
            setBarError(state)
            setUserInput("") 
            setTimeout(() => {
                setBarError("GOOD")
                setUserInput(savedInput) 
            }, cd)
            return
        }

        if (isOutOfTries) {
            return
        }

        guessGraphFunction(currentUserInput)
        setUserInput("") 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

    const currentPlaceholder = _currentBarPlaceholder(gameStatus, isBarError)
    
    // Pass the state string directly
    const currentCSS = _currentBarCSS(isBarError)
 
    return {
        // Disable if there is an active error, out of tries, or game over
        disableBar: (isBarError !== "GOOD" || isOutOfTries || !isPlaying),
        currentUserInput,
        handleKeyDown,
        handleChange,
        currentPlaceholder,
        currentCSS
    }
}