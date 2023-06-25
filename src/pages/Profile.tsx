import React, {Fragment, useEffect} from 'react';
import {useAuth} from "../api/hooks/useAuth";
import {useAppDispatch, useAppSelector} from "../api/hooks/redux";
import {fetchUserProfile} from "../store/redusers/ActionCreator";
import Header from "../components/Header/Header";

function Profile() {
    const {signOut} = useAuth();


    return (
        <Fragment>
            <button onClick={signOut}>Sign out</button>
        </Fragment>
    );
}

export default Profile;