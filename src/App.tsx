import React, {useEffect} from 'react';
import './App.scss';
import {useLocation, useNavigate, Navigate} from 'react-router-dom';

import {ToastContainer} from "react-toastify";
import "react-toastify/scss/main.scss"
import Header from "./components/Header/Header";

import AppRouter from "./AppRouter";
import {useAppSelector} from "./api/hooks/redux";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const showHeader = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';
    const isAuth = !!localStorage.getItem('token');
    const {user, error} = useAppSelector(state => state.userProfileReducer);

    useEffect(() => {
        if (!isAuth && showHeader) {
            navigate('/login')
        }else if(isAuth && !showHeader){
            navigate('/profile')
        }
    }, [location.pathname])

    return (
        <><ToastContainer position={"bottom-center"}/>
            {showHeader && <Header/>}
                <AppRouter isAuth={isAuth}/>
        </>
    );
}

export default App;
