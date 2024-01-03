import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
            <div className="w-[20rem] h-[24rem] bg-white shadow-2xl flex flex-col items-center">
                <h1 className="py-6 text-3xl">Login here</h1>
                <div className="py-2 flex flex-col gap-y-3 items-center">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="username">Username</label>
                        <input className="p-1 text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="text"
                               name="username"
                               minLength={8}
                               maxLength={16}
                               placeholder="Enter username"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="password">Password</label>
                        <input className="p-1 text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="password"
                               name="password"
                               minLength={8}
                               placeholder="Enter password"/>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-y-4">
                    <button className="px-3 py-2 bg-green-600 text-white text-xl cursor-pointer hover:bg-green-700 transition duration-200 ease-in-out">Login</button>
                    <div className="flex flex-col gap-y-1">
                        <button className="text-base hover:underline" onClick={() => navigate("/register")}>Forgot password</button>
                        <button className="text-base hover:underline" onClick={() => navigate("/register")}>Register here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}