import { screenSizeHandler } from "../_main/adjustScreenSize";
import { loadGraphle } from "../_main/loadGraphle";
import { barInputHandler } from "./handleBarInput";
import { graphleCurrentStatus } from "./handleCurrentStatus";
import { graphFunctionHandler } from "./handleFunctions";

export function Handler() {
    const { currentSize } = screenSizeHandler()
    const { todaysGraphle, isLoading } = loadGraphle()

    /** Graphle Function Handler */
    const { currentGraphFunctions,
            updateGraphFunctions,
            toggleGraphFunction } = graphFunctionHandler({ todaysGraphle })

    /** Graphle Game Status Handler */
    const { guessGraphFunction, 
            currentStatus } = graphleCurrentStatus({ updateGraphFunctions, currentGraphFunctions, todaysGraphle }) 
    
    /** Graphle Bar Handler */
    const { disableBar,
            currentUserInput,
            handleKeyDown,
            handleChange,
            currentPlaceholder,
            currentCSS } = barInputHandler({ graphFunctionCount: currentGraphFunctions.length, gameStatus: currentStatus, guessGraphFunction })
 
    return {
        isLoading,
        currentSize,                                    // Current Screen Size
        currentGraphFunctions: currentGraphFunctions,   // Current Array with our graph functions
        currentStatus: currentStatus,                   // Current Graphle Game Status
        guessGraphFunction: currentGraphFunctions,      // Guess Graph function
        toggleGraphFunction,                            // Toggle visibility of graph function     
        disableBar, currentUserInput,                   // Bar properties...
        handleChange, handleKeyDown,                   
        currentPlaceholder, currentCSS
}
}
