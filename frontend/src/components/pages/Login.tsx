import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultUserLogin, UserLogin } from "../../user.ts";
import wh_icon from "../../../assets/wh_icon.png"
import axios from "axios";

export function LoginPage() {
    const [user, setUser] = useState<UserLogin>(defaultUserLogin)
    const navigate = useNavigate()

    function loginUser(user: UserLogin) {
        axios.post("http://127.0.0.1:3300/user/login", user, {
            withCredentials: true
        })
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                console.log("An error occured while transmitting data to backend " + error)
            })
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col gap-y-10 justify-center items-center">
            <img className="w-44 h-16 cursor-pointer" src={wh_icon} alt="icon iamge" onClick={() => navigate("/")}/>
            <div className="w-[18rem] h-[24rem] bg-white shadow-2xl flex flex-col items-center">
                <h1 className="py-6 text-3xl font-barlow-semi-condensed">Login here</h1>
                <div className="py-2 flex flex-col gap-y-3 items-center">
                    <div className="flex flex-col">
                        <label className="font-barlow-semi-condensed font-bold" htmlFor="username">Username</label>
                        <input className="p-1 font-barlow-semi-condensed text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="text"
                               name="username"
                               minLength={8}
                               maxLength={16}
                               placeholder="Enter username"
                               onChange={(event) => setUser({
                                   name: event.target.name,
                                   password: user.password
                               })}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-barlow-semi-condensed font-bold" htmlFor="password">Password</label>
                        <input className="p-1 font-barlow-semi-condensed text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="password"
                               name="password"
                               minLength={8}
                               placeholder="Enter password"
                               onChange={(event) => setUser({
                                   name: user.name,
                                   password: event.target.name
                               })}/>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-y-6">
                    <button className="px-3 py-2 bg-blue-500 font-barlow-semi-condensed text-white text-xl cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => loginUser(user)}>Login</button>
                    <div className="flex flex-col gap-y-2">
                        <button className="text-sm hover:underline font-barlow-semi-condensed" onClick={() => navigate("/register")}>Forgot password</button>
                        <button className="text-sm hover:underline font-barlow-semi-condensed" onClick={() => navigate("/register")}>Register here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}