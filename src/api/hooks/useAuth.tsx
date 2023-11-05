import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { userSignInType, userSignUpType } from '../../Types/user';
import { privateRoutes } from '../../routes';


type errorObjectType = {
    label:string,
    message:string
}

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const signIn = async (data:userSignInType) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/login`, data).then(res=>res.data)
            localStorage.setItem('token',response.accessToken )
            setUser(response);
            toast.success("Login Successfull");
            navigate(privateRoutes[0].path);
        } catch (err:any) {
            if(err.response.data.errors){
                err.response.data.errors.forEach((error:errorObjectType)=>{
                    toast.error(error.message)
                })
            }else if( err.response.data.error){
                toast.error( err.response.data.error)
            }
        }
    };

    const signUp = async (data:userSignUpType) => {
        try {
             const {data : authResult} = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/register`, data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            })
            let userObj = { ...authResult.data?.token };
            setUser(userObj);
            localStorage.setItem('token',authResult.data?.token )
            toast.success("Sign Up Successful");
            navigate(privateRoutes[0].path);
        } catch (err:any) {
            if(err.response.data.errors){
                err.response.data.errors.forEach((error:errorObjectType)=>{
                    toast.error(error.message)
                })
            }else{
                toast.error("An Error Occuered")
            }
        }
    };

    const signOut = async () => {
             await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/sign_out`,null,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(()=>{
                 localStorage.removeItem('token')
                 navigate('/login');
                 navigate(0);
                 setUser(null);
             }).catch(()=>{
                 toast.error("An Error Occuered")
             })

    };

    return { user, signIn, signUp, signOut };
};