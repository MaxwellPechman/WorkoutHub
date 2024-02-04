import { getSessionStorageItem } from "../utils/sessionStorageUtils.tsx";
import axios from "axios";

export async function loadWorkouts() {
    const token = getSessionStorageItem<string>("session_id")

    type Session = {
        token: string
    }

    const session: Session = {
        token: token
    }

    return await axios.post("http://127.0.0.1:3300/workout/get", session, {
        withCredentials: true
    })
}

export async function loadUsername() {
    const token = getSessionStorageItem<string>("session_id")

    type Session = {
        token: string
    }

    const session: Session = {
        token: token
    }

    return await axios.post("http://127.0.0.1:3300/user/username", session, {
        withCredentials: true
    })
}