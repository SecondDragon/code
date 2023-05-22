export interface RegisterPayload{
    username:string;
    password:string;
    confirmPassword:string;
    email:string;
}
export interface RegisterResult{
    success: boolean,
    data: { token:string },
    message?:string
}

export interface LoginPayload{
    username:string;
    password:string;
}
export interface LoginResult{
    success: boolean,
    data: { token:string },
    message?:string
}