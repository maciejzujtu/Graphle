import { getProfileData } from "@/app/(api)/___endpoints/profileData"
import { DiscordUser } from "@/app/(api)/___endpoints/userToken"
import { useEffect, useState } from "react"

/**
 * @description
 *  Main hook that will determine whether or not the player was loaded in.
 * @returns {DiscordUser | undefined} Username and their user Id or undefined 
 */
export function loadProfile(): DiscordUser | undefined {
    const [userData, setUserData] = useState<DiscordUser>()
    useEffect(() => {
        const f = async () => {
            const profileData = await getProfileData()
            if (profileData) {
                setUserData(profileData)
            }   
        }
        f()
    }, [])

    return userData
}