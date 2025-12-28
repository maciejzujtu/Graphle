import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
    return (
        <header className="shrink-0 w-full flex justify-center border-neutral-700 pb-2">
            <h1 className="text-2xl font-bold tracking-wider uppercase text-white">
                {children}
            </h1>
        </header>
    )
}