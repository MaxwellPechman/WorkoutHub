export type UserLogin = {
    name: string,
    password: string
}

export const defaultUserLogin: UserLogin = {
    name: "",
    password: ""
}

export type UserRegister = {
    name: string,
    mail: string,
    password: string
}

export const defaultUserRegister: UserRegister = {
    name: "",
    mail: "",
    password: ""
}
