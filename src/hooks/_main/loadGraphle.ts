import { getTodaysGraphle } from "@/app/(api)/___endpoints/todaysGraphle"
import { Graphle } from "@/db/init"
import { useEffect, useState } from "react"
import { DUMMY_GRAPHLE } from "../definitions"

export function loadGraphle(): { todaysGraphle: Graphle, isLoading: boolean } {
    const [isLoading, setIsLoading] = useState(true)
    const [todaysGraphle, setTodaysGraphle] = useState<Graphle>({ 
        id: "LOADING", 
        props: DUMMY_GRAPHLE 
    })

    useEffect(() => {
        const fetchGraphle = async () => {
            try {
                const data = await getTodaysGraphle()
                if (data) setTodaysGraphle(data)
            } finally {
                setIsLoading(false)
            }
        }
        fetchGraphle()
    }, [])

    return { todaysGraphle, isLoading }

}