export interface UserProfile {
    id?:number,
    first_name:string,
    last_name:string,
    date_of_birth:string,
    file_path?:string,
    is_online:boolean,
    email:string
}