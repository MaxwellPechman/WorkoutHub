import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultUserRegister, UserRegister } from "../../user.ts";
import axios from "axios";

export function RegisterPage() {
    const [user, setUser] = useState<UserRegister>(defaultUserRegister)
    const navigate = useNavigate()

    function registerUser(user: UserRegister) {
        axios.post("http://127.0.0.1:3300/user/register", user, {
            withCredentials: true
        })
            .then((response) => {
                navigate("/")
                console.log("Backend request was successful " + response.statusText)
            })
            .catch((error) => {
                console.log("An error occured while transmitting data to backend " + error)
            })
    }

    return (
        <div className="w-screen h-screen bg-neutral-100 flex justify-center items-center">
            <div className="w-[20rem] h-[27rem] bg-white shadow-2xl flex flex-col items-center">
                <h1 className="py-6 text-3xl">Register account</h1>
                <div className="py-2 flex flex-col gap-y-3 items-center">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="username">Username</label>
                        <input className="p-1 text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="text"
                               name="username"
                               minLength={8}
                               maxLength={16}
                               placeholder="Enter username"
                               onChange={(event) => setUser({
                                   name: event.target.value,
                                   mail: user.mail,
                                   password: user.password
                               })}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="mail">E-Mail</label>
                        <input className="p-1 text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="text"
                               name="mail"
                               placeholder="Enter E-Mail"
                               onChange={(event) => setUser({
                                   name: user.name,
                                   mail: event.target.value,
                                   password: user.password
                               })}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="password">Password</label>
                        <input className="p-1 text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
                               type="password"
                               name="password"
                               minLength={8}
                               placeholder="Enter password"
                               onChange={(event) => setUser({
                                   name: user.name,
                                   mail: user.mail,
                                   password: event.target.value
                               })}/>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-y-4">
                    <button className="px-3 py-2 bg-green-600 text-white text-xl cursor-pointer hover:bg-green-700 transition duration-200 ease-in-out" onClick={() => registerUser(user)}>Create account</button>
                    <button className="hover:underline" onClick={() => navigate("/login")}>Login here</button>
                </div>
            </div>
        </div>
    )
}