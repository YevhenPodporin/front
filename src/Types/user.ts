export type userSignInType = {
    email:string,
    password:string
}

export type userSignUpType = {
    email:string,
    first_name:string,
    last_name:string,
    date_of_birth:string,
    file?:null,
    password:string,
}