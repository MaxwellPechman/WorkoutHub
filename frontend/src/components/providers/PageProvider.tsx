import { createContext, useState } from "react";
import { ChildrenProps } from "../ChildrenProps.ts";

export type PageType = "Home" | "Workout" | "Ranking" | "About" | "None"

export type PageContextState = {
    type: PageType
    setType: (type: PageType) => void
}

export const PageContext = createContext<PageContextState>({} as PageContextState)

export function PageProvider({ children }: ChildrenProps) {
    const [type, setType] = useState<PageType>("None")

    return (
        <PageContext.Provider value={{ type: type, setType: setType }}>
            {children}
        </PageContext.Provider>
    )
}