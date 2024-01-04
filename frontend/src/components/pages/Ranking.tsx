import { useContext } from "react";
import { PageContext } from "../providers/PageProvider.tsx";
import { Topnav } from "../topnav/Topnav.tsx";

export function RankingPage() {
    const pageContext = useContext(PageContext)

    pageContext.setType("Ranking")

    return (
        <div className="w-screen h-screen bg-neutral-200">
            <Topnav/>
        </div>
    )
}