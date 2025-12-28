import "@/app/globals.css"
import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full w-full">
            <body className="h-full w-full bg-neutral-900 text-white overflow-hidden antialiased">
                {children}
            </body>
        </html>
    )
}