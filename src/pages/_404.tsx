import React from 'react';
import {redirect, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function NotFoundPage() {
    const navigate = useNavigate();

    setTimeout(()=>{
        navigate(-1)
    },2000)
    toast.error("Page not found. You will redirect automatically")
    return (
        <div>not found page</div>
    );
}

export default NotFoundPage;