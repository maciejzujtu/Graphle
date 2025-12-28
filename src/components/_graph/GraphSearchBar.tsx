import { ChangeEventHandler, KeyboardEventHandler } from "react"

interface Bar {
    disableBar: boolean,
    currentUserInput: string,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    handleKeyDown: KeyboardEventHandler<HTMLInputElement>,
    currentPlaceholder: string,
    currentCSS: string
}

export function Bar(
    { disableBar, handleChange, handleKeyDown, 
        currentPlaceholder, currentCSS, currentUserInput }: Bar) 
{
    return (
        <div className="relative w-full">
            <input
                type="text"
                value={currentUserInput}
                onChange={handleChange}
                disabled={disableBar}
                onKeyDown={handleKeyDown}
                placeholder={currentPlaceholder}
                className={`
                    w-full p-3 rounded 
                    bg-neutral-800 border 
                    text-white focus:outline-none text-center text-sm
                    transition-colors duration-200
                    ${currentCSS}
                `}
            />
        </div>
    )
}