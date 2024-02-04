import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../hooks/useSessionStorage.tsx";

export function LogoutSection() {
    const navigate = useNavigate()
    const [session, setSession] = useSessionStorage("session_id")

    function logout() {
        setSession("")
        navigate("/")
    }

    return (
        <ul className="px-4 flex gap-x-3">
            <li className="px-2 py-1.5 bg-blue-500 font-barlow-semi-condensed text-base text-white cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
                onClick={() => logout()}>Logout
            </li>
        </ul>
    )
}