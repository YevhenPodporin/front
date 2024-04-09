import React, { useEffect, useState } from 'react';
import { Avatar, Badge, CircularProgress, List, ListItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { chatSlice } from '../../store/redusers/ChatSlice';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { useGetChatListQuery } from '../../store/services/ChatService';
import Typography from '@mui/material/Typography';
import UseWindowSize from '../../Hooks/useWindowSize';


function ChatList() {
    const [isShow, setIsShow] = useState<boolean>(true);
    const params = useParams();
    const windowSize = UseWindowSize();
    const myProfile = useAppSelector(state => state.userProfileReducer.user)
    const navigate = useNavigate();
    const chatList = useAppSelector(state => state.chatSlice.data)
    const dispatch = useAppDispatch();
    const {data, isLoading, error} = useGetChatListQuery();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(chatSlice.actions.setChatList(data))
        }
    }, [isLoading])


    useEffect(() => {
        if (windowSize.width !== 0) {
            if (windowSize.width <= 992 && !isMobile) {
                setIsMobile(true);
            } else if (windowSize.width > 992 && isMobile) {
                setIsMobile(false);
            }
        }
    }, [windowSize])

    return (
        <div className={isMobile && isShow ? 'chat_list_wrapper hide' : 'chat_list_wrapper'}>
            {isLoading && <CircularProgress sx={{position: 'fixed', top: '50%', left: '50%'}}/>}
            {/*<div className={'arrow_icon'} onClick={()=>setIsShow(false)}>{<ArrowBackIosNewTwoToneIcon/>}</div>*/}

            <List className={'chat_list_items'}>
                {chatList.length && !isLoading ? chatList.map(({
                                                                   id,
                                                                   from_user_id,
                                                                   from_user,
                                                                   to_user,
                                                                   last_message,
                                                                   unread_messages
                                                               }) => {
                    return (
                        <ListItem
                            divider={true}
                            key={id}
                            onClick={() => navigate(`/chat/${id}`)}
                            className={(params.id && +params.id === +id) ? 'active' : 'item'}
                        >
                            <Avatar
                                src={myProfile.id === from_user_id ? to_user.profile.file_path : from_user.profile.file_path}/>
                            <div className={'name_message'}>
                                {myProfile.id === from_user_id ? to_user.profile.first_name : from_user.profile.first_name}
                                <Typography className={'last_message'}
                                            children={last_message}/>
                            </div>
                            {unread_messages > 0
                                ? <Badge badgeContent={unread_messages} color={'secondary'} max={10}/>
                                : null}
                        </ListItem>
                    )
                }) : <p>Chat list is empty</p>}
                {error && <h4>Something wrong</h4>}
            </List>
        </div>
    )
}

export default ChatList;