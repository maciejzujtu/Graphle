import { useEffect, useState } from "react"
import { MIN_HEIGHT, MIN_WIDTH, Screen } from "@/hooks/definitions"

// TODO: Move it to main part.

export function isScreenTooSmall(props: Screen): boolean {
    return (
        props.width < MIN_WIDTH ||
        props.height < MIN_HEIGHT
    )
}

export function screenSizeHandler() {
    const [screenSize, setScreenSize] = useState<Screen>({
        width: 0, height: 0, isLoaded: false
    })

    useEffect(() => {
        function handleResize() {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isLoaded: true
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { currentSize: screenSize}
}

