import { jsonNull } from "./json.ts";

export function getSessionStorageItem<Type>(key: string): Type {
    const item = sessionStorage.getItem(key) ?? jsonNull
    return JSON.parse(item)
}

export function setSessionStorageItem(key: string, value: string) {
    sessionStorage.setItem(key, JSON.stringify(value))
}