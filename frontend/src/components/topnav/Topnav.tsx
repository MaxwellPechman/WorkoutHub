import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "../providers/PageProvider.tsx";
import { useSessionStorage } from "../../hooks/useSessionStorage.tsx";
import { LoginSection } from "./LoginSection.tsx";
import { LogoutSection } from "./LogoutSection.tsx";
import wh_icon from "../../../assets/wh_icon.png";

export function Topnav() {
    const navigate = useNavigate()
    const pageContext = useContext(PageContext)
    const [session] = useSessionStorage("session_id")

    function updateTopnav(page: string) {
        if(page == "Workout" || page == "Ranking" || page == "About" || page == "None") {
            pageContext.setType(page)
        }

        navigate(page.toLowerCase())
    }

    return (
        <div className="w-screen h-20 fixed z-20 bg-white flex justify-between items-center">
            <ul className="flex items-center gap-x-5">
                <img className="px-6 w-30 h-14 cursor-pointer" src={wh_icon} alt="icon image"
                     onClick={() => updateTopnav("/")}/>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "Workout" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => updateTopnav("/")}>Workout
                </li>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "Ranking" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => updateTopnav("/ranking")}>Ranking
                </li>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "About" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => updateTopnav("/about")}>About
                </li>
            </ul>
            {
                session === null || session === ""
                ?
                    <LoginSection/>
                    :
                    <LogoutSection/>
            }
        </div>
    )
}