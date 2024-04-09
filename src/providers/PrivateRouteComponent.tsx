import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { toast } from 'react-toastify';
import { useAppSelector } from '../api/hooks/redux';
import { CircularProgress } from '@mui/material';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({element}) => {
    const isAuth = !!localStorage.getItem('token') || !!localStorage.getItem('google_token');
    const loading = useAppSelector(s=>s.userProfileReducer.isLoading)

    useEffect(() => {
        if (!isAuth) {
            toast.error('You are not authorized')
        }
    }, [isAuth])
    return isAuth ? (
        <>
            {loading && <CircularProgress sx={{position:'fixed', top:'50%',left:'50%'}} />}
            <Header/>
            <div className={'main_wrapper'}>{element}</div>
        </>
    ) : (
        <Navigate to="/login" replace={true}/> // Redirect to the login page
    );
};

export default PrivateRoute;
