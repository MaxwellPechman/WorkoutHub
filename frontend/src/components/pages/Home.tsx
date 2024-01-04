import { Topnav } from "../topnav/Topnav.tsx";
import { useContext } from "react";
import { PageContext } from "../providers/PageProvider.tsx";

export function HomePage() {
    const pageContext = useContext(PageContext)

    pageContext.setType("Home")

    return (
        <div className="w-screen h-screen bg-neutral-200">
            <Topnav/>
        </div>
    )
}