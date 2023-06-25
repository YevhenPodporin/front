import {useState} from "react";
import {toast} from "react-toastify";
import axios, {AxiosError} from "axios";
import {redirect, RedirectFunction, useNavigate} from "react-router-dom";

export type userSignInType = {
    email:string,
    password:string
}

export type userSignUpType = {
    email:string,
    first_name:string,
    last_name:string,
    date_of_birth:string,
    file?:object,
    password:string,
}
export const useAuth = () => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const signIn = async (data:userSignInType) => {
        try {
            let authresult = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/login`, data);
            let userObj = { ...authresult.data, token:authresult.data.data?.token };
            localStorage.setItem('token',authresult.data.data?.accessToken )
            setUser(userObj);
            toast.success("Login Successfull");
            navigate("/profile");
        } catch (err) {
            toast.error("Email or password incorrect")
        }
    };

    const signUp = async (data:userSignUpType) => {
        try {
            let authresult = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/register`, data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            })
            let userObj = { ...authresult.data?.token };
            setUser(userObj);
            localStorage.setItem('token',authresult.data.data?.token )
            toast.success("Sign Up Successful");
            navigate('/profile');
        } catch (err:any) {
            if(err.response.data.error){
                err.response.data.error.forEach((message:any)=>{
                    toast.error(message.msg)
                })
            }else{
                toast.error("An Error Occuered")
            }
        }
    };
    const checkIsAuth  = ()=>{
        if(!!localStorage.getItem('token')){
            // navigate("/profile");
        }else{
            toast.error("You are not authorized")
            // navigate("/login")
        }
    }
    const signOut = () => {
        localStorage.removeItem('token')
        navigate('/login');
        setUser(null);
    };

    return { user, signIn, signUp, signOut,checkIsAuth };
};