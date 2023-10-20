import React, { Fragment, useEffect, useState } from 'react';
import './Header.scss';
import { Toolbar } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageWithStatus from "../ImageWithStatus/ImageWithStatus";
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import { fetchUserProfile } from "../../store/redusers/ActionCreator";
import { privateRoutes, publicRoutes } from "../../routes";
import { popupSlice } from "../../store/redusers/ShowHidePopupSlice";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import UserProfilePopup from "../UserProfilePopup/UserProfilePopup";
import UseWindowSize from '../../Hooks/useWindowSize';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../api/hooks/useAuth';

function Header() {
    const {error, isLoading} = useAppSelector(state => state.userProfileReducer)
    const {file_path, first_name, is_online, last_name} = useAppSelector(state => state.userProfileReducer.user)
    const dispatch = useAppDispatch();
    const {width, height} = UseWindowSize();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {signOut} = useAuth();

    useEffect(() => {
        if (!isLoading && error) {
            navigate(publicRoutes[0].path)
        }
    }, [error, isLoading])


    const showPopup = () => {
        dispatch(popupSlice.actions.showPopup())
    }

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])

    useEffect(() => {
        if (width !== 0 && width <= 900) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width, height])

    return (
        <header className={'header_main'}>
            <PopupWrapper children={<UserProfilePopup/>}/>
            <Toolbar
                className={'toolbar'}
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
                        return path !== '*' && title && (
                            <NavLink
                                key={index}
                                to={path.includes('/network/*') ? '/network/my' : path.includes('/chat') ? '/chat' : path}
                                children={title}
                                className={({isActive}) => {
                                    return isActive || (path.includes('/chat') && location.pathname.includes('/chat')) ? 'active_link' : ''
                                }}
                                end/>
                        )
                    })}
                    <button className={"signout_btn"} onClick={signOut}><ExitToAppIcon/></button>
                </nav>

            </Toolbar>

        </header>
    )
}

export default Header;