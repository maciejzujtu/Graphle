'use client'
import { Menu } from "@/components/__start/menuScreen"
import { loadProfile } from "@/hooks/_main/loadProfile"


export default function() {
    const profile = loadProfile()

    if (!profile) {
        return (
            <div>
                Loading Discord Profile...
            </div>       
        )
    }
    
    return (
        <div>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>ID:</strong> {profile.id}</p>
            <div>
                <Menu/>
            </div>
        </div>
    )
}