import { useNavigate } from "react-router-dom";

export function Topnav() {
    const navigate = useNavigate()

    return (
        <div className="w-screen h-16 fixed bg-green-700 flex justify-between items-center">
            <ul className="px-4 flex gap-x-5">
                <li className="text-xl text-white cursor-pointer hover:text-neutral-200 transition duration-200 ease-in-out">Home</li>
                <li className="text-xl text-white cursor-pointer hover:text-neutral-200 transition duration-200 ease-in-out">Workout</li>
                <li className="text-xl text-white cursor-pointer hover:text-neutral-200 transition duration-200 ease-in-out">About</li>
            </ul>
            <ul className="px-4 flex gap-x-3">
                <li className="py-1.5 text-base text-white cursor-pointer hover:text-neutral-200 transition duration-200 ease-in-out" onClick={() => navigate("/login")}>Login</li>
                <li className="py-1.5 px-2 text-base text-white bg-neutral-900 cursor-pointer hover:bg-neutral-800 transition duration-200 ease-in-out" onClick={() => navigate("/register")}>Sign up for free</li>
            </ul>
        </div>
    )
}