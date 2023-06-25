import React, {useEffect} from 'react';
import './App.scss';
import {Route, BrowserRouter, Routes, useLocation, useNavigate, ActionFunctionArgs,} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/_404";
import {ToastContainer} from "react-toastify";
import "react-toastify/scss/main.scss"
import Header from "./components/Header/Header";
import Chat from "./pages/Chat";
import Friends from "./pages/Friends";
import {useAppDispatch, useAppSelector} from "./api/hooks/redux";
import {fetchUserProfile} from "./store/redusers/ActionCreator";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const showHeader = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

    const {user, isLoading} = useAppSelector(state => state.userProfileReducer);


    useEffect(() => {
        if (!localStorage.getItem('token') && showHeader) {
            navigate('/login')
        }
    }, [location.pathname])
    return (
        <><ToastContainer position={"bottom-center"}/>
            {showHeader && <Header/>}
            <Routes>
                <Route path="/" Component={Login}/>
                <Route path="/profile" Component={Profile}/>
                <Route path="/chat" Component={Chat}/>
                <Route path="/friends" Component={Friends}/>
                <Route path="/login" Component={Login}/>
                <Route path="/register" Component={Register}/>
                <Route path="*" Component={NotFoundPage}/>
            </Routes></>
    );
}

export default App;
