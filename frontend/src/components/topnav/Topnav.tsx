import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "../providers/PageProvider.tsx";
import wh_icon from "../../../assets/wh_icon.png";

export function Topnav() {
    const navigate = useNavigate()
    const pageContext = useContext(PageContext)

    return (
        <div className="w-screen h-20 fixed bg-white flex justify-between items-center">
            <ul className="flex items-center gap-x-5">
                <img className="px-6 w-30 h-14 cursor-pointer" src={wh_icon} alt="icon image"
                     onClick={() => navigate("/")}/>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "Home" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => navigate("/")}>Home
                </li>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "Workout" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => navigate("/workout")}>Workout
                </li>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "Ranking" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => navigate("/ranking")}>Ranking
                </li>
                <li className={`py-1 text-2xl text-neutral-900 font-barlow-semi-condensed cursor-pointer border-b-2 ${pageContext.type === "About" ? "border-b-blue-400" : "border-b-white"} hover:border-b-blue-400 transition duration-200 ease-in-out`}
                    onClick={() => navigate("/about")}>About
                </li>
            </ul>
            <ul className="px-4 flex gap-x-3">
                <li className="py-1.5 font-barlow-semi-condensed text-base text-neutral-900 cursor-pointer border-b-2 border-b-white hover:border-b-blue-400 transition duration-200 ease-in-out"
                    onClick={() => navigate("/login")}>Login
                </li>
                <li className="py-1.5 px-2 font-barlow-semi-condensed text-base text-white bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
                    onClick={() => navigate("/register")}>Sign up for free
                </li>
            </ul>
        </div>
    )
}