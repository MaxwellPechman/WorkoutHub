import { useContext } from "react";
import { PageContext } from "../providers/PageProvider.tsx";
import { Topnav } from "../topnav/Topnav.tsx";

export function WorkoutPage() {
    const pageContext = useContext(PageContext)

    pageContext.setType("Workout")

    return (
        <div className="w-screen h-screen bg-neutral-200">
            <Topnav/>
        </div>
    )
}