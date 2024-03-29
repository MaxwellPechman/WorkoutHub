import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { defaultUserRegister, UserRegister } from "../../user.ts";
import { setSessionStorageItem } from "../../utils/sessionStorageUtils.tsx";
import axios from "axios";
import wh_icon from "../../../assets/wh_icon.png";

export function RegisterPage() {
    const [user, setUser] = useState<UserRegister>(defaultUserRegister)
    const navigate = useNavigate()

    function registerUser(user: UserRegister) {
        axios.post("http://127.0.0.1:3300/user/register", user, {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data)

                if(response.data == false) {
                    console.log("Invalid Register.")

                } else {
                    setSessionStorageItem("session_id", response.data)
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log("An error occured while transmitting data to backend " + error)
            })
    }

    return (
        <div className="w-screen h-screen bg-white flex flex-col gap-y-10 justify-center items-center">
            <img className="w-44 h-16 cursor-pointer" src={wh_icon} alt="icon iamge" onClick={() => navigate("/")}/>
            <div className="w-[20rem] h-[27rem] bg-white shadow-2xl flex flex-col items-center">
                <h1 className="py-6 text-3xl font-barlow-semi-condensed">Register account</h1>
                <div className="py-2 flex flex-col gap-y-3 items-center">
                    <div className="flex flex-col">
                        <label className="font-barlow-semi-condensed font-bold" htmlFor="username">Username</label>
                        <input
                            className="p-1 font-barlow-semi-condensed text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
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
                        <label className="font-barlow-semi-condensed font-bold" htmlFor="mail">E-Mail</label>
                        <input
                            className="p-1 font-barlow-semi-condensed text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
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
                        <label className="font-barlow-semi-condensed font-bold" htmlFor="password">Password</label>
                        <input
                            className="p-1 font-barlow-semi-condensed text-neutral-800 border-b-2 border-b-neutral-500 hover:border-b-neutral-900 transition duration-200 ease-in-out focus:outline-none focus:border-b-neutral-900"
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
                    <button
                        className="px-3 py-2 bg-blue-500 font-barlow-semi-condensed text-white text-xl cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out"
                        onClick={() => registerUser(user)}>Create account
                    </button>
                    <button className="hover:underline font-barlow-semi-condensed" onClick={() => navigate("/login")}>Login here</button>
                </div>
            </div>
        </div>
    )
}