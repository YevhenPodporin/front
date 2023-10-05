import React, { useEffect } from 'react';
import './Header.scss';
import { Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageWithStatus from "../ImageWithStatus/ImageWithStatus";
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import { fetchUserProfile } from "../../store/redusers/ActionCreator";
import { privateRoutes } from "../../routes";
import { popupSlice } from "../../store/redusers/ShowHiePopup";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import UserProfilePopup from "../UserProfilePopup/UserProfilePopup";


function Header() {
    const {file_path, first_name, is_online, last_name} = useAppSelector(state => state.userProfileReducer.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    const showPopup = () => {
        dispatch(popupSlice.actions.showPopup(true))
    }

    return (
        <header className={'header_main'}>
            <PopupWrapper children={<UserProfilePopup/>}/>
            <Toolbar
                component="nav"
                variant="regular"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                <div className={'left_side'} onClick={showPopup}>
                    <ImageWithStatus status={is_online} file_path={file_path}/>
                    <Typography children={first_name + ' ' + last_name}/>
                </div>
                <nav className={'header__links'}>
                    {privateRoutes.map(({path, title}, index) => {
                        return path !== '*' && (
                            <NavLink
                                key={index}
                                to={path.includes('/network/*')?'/network/my':path}
                                children={title}
                                className={({isActive}) => {
                                    return isActive ? 'active_link' : ''
                                }}
                            end/>
                        )
                    })}
                </nav>
            </Toolbar>
        </header>
    )
}

export default Header;