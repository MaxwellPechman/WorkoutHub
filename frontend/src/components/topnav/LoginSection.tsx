import { useNavigate } from "react-router-dom";

export function LoginSection() {
    const navigate = useNavigate()

    return (
        <ul className="px-4 flex gap-x-3">
            <li className="py-1.5 font-barlow-semi-condensed text-base text-neutral-900 cursor-pointer border-b-2 border-b-white hover:border-b-blue-400 transition duration-200 ease-in-out"
                onClick={() => navigate("/login")}>Login
            </li>
            <li className="py-1.5 px-2 font-barlow-semi-condensed text-base text-white bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
                onClick={() => navigate("/register")}>Sign up for free
            </li>
        </ul>
    )
}