import { useState, useEffect, Dispatch } from "react";
import { getSessionStorageItem, setSessionStorageItem } from "../utils/sessionStorageUtils.tsx";

export function useSessionStorage(key: string): [string, Dispatch<string>] {
    const [value, setValue] = useState(getSessionStorageItem<string>(key))

    useEffect(() => {
        setSessionStorageItem(key, value)
    }, [key, value]);

    return [value, setValue]
}
