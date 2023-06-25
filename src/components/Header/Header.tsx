import React, {useEffect, useState} from 'react';
import './Header.scss';
import {Toolbar} from "@mui/material";
import {useLocation, NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageWithStatus from "../ImageWithStatus/ImageWithStatus";
import {useAppDispatch, useAppSelector} from "../../api/hooks/redux";
import {fetchUserProfile} from "../../store/redusers/ActionCreator";

type HeaderProps = {
    file_path?: string,
    first_name?: string,
    is_online?:boolean
}

function Header() {
    const {file_path,first_name, is_online} = useAppSelector(state => state.userProfileReducer.user)
    const location = useLocation();
    const [isShow, setIsShow] = useState(false);
    const dispatch = useAppDispatch();

    const navLinks = [
        {title: 'Profile', url: '/profile'},
        {title: 'Chat', url: '/chat'},
        {title: 'Friends', url: '/friends'},
    ]
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setIsShow(false)
        } else {
            setIsShow(true);
        }
        return () => {
            setIsShow(false)
        }
    }, [location])
    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [])
    return isShow ? (
        <header className={'header_main'}>
            <Toolbar
                component="nav"
                variant="regular"
                sx={{justifyContent: 'space-between', gap: 5, overflowX: 'auto'}}
            >
                <div className={'left_side'}>
                    <ImageWithStatus status={is_online} file_path={file_path}/>
                    <Typography children={first_name}/>
                </div>
                <div>
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.url}
                            children={link.title}
                            className={({isActive, isPending}) => {
                                return isActive ? 'active_link' : ''
                            }}
                        />
                    ))}
                </div>
            </Toolbar>
        </header>
    ) : null
}

export default Header;