export type userSignInType = {
    email:string,
    password:string
}

export type userSignUpType = {
    email:string,
    first_name:string,
    last_name:string,
    date_of_birth:string,
    file?:File | null,
    password:string,
}

export interface userEditProfile extends Omit<userSignUpType, 'password'>{}