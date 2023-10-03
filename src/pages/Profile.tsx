import React, {Fragment} from 'react';
import {useAuth} from "../api/hooks/useAuth";
import {useAppSelector} from "../api/hooks/redux";

function Profile() {
    const {signOut} = useAuth();
    // const user = useAppSelector(state => state.userProfileReducer.user)
    return (
        <Fragment>
            <button style={{marginTop:"100px"}} onClick={signOut}>Sign out</button>
        </Fragment>
    );
}

export default Profile;