export type UserRegister = {
    email: string,
    username: string,
    password: string,
    handphone: string,
}

export type UserRegisterResponse = {
    message : string
}

export type UserLoginResponse = {
    token : string
    message : string
}

export type UserLogin = {
    email: string,
    password: string,
}

export type UserResetPassword = {
    oldPassword : string,
    newPassword: string
}
