import React from 'react';
import {useAppSelector} from "../../api/hooks/redux";
import './UserProfile.scss';
import ImageWithStatus from "../ImageWithStatus/ImageWithStatus";
function UserProfilePopup() {
    const {user} = useAppSelector(state => state.userProfileReducer);
    const {file_path,first_name, is_online, last_name} = user;
    return (
        <div className={'content_wrapper'}>
            <ImageWithStatus status={is_online} file_path={file_path}/>
        </div>
    );
}

export default UserProfilePopup;