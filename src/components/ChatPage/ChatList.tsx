import React, { useEffect, useState } from 'react';
import { CircularProgress, List, ListItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { chatSlice } from '../../store/redusers/ChatSlice';
import { useAppDispatch, useAppSelector } from '../../api/hooks/redux';
import { useGetChatListQuery } from '../../store/services/ChatService';


function ChatList() {
    const [isShow, setIsShow] = useState<boolean>(true);
    const params = useParams();

    const myProfile = useAppSelector(state => state.userProfileReducer.user)
    const navigate = useNavigate();

    const chatList = useAppSelector(state => state.chatSlice.data)
    const dispatch = useAppDispatch();
    const {data, isLoading, error} = useGetChatListQuery();

    useEffect(() => {
        if (data && !isLoading) {
            dispatch(chatSlice.actions.setChatList(data))
        }
    }, [data])

    return (
        <div className={isShow ? 'chat_list_wrapper' : 'chat_list_wrapper hide'}>
            {isLoading && <CircularProgress/>}
            {/*<div className={'arrow_icon'} onClick={()=>setIsShow(false)}>{<ArrowBackIosNewTwoToneIcon/>}</div>*/}

            <List className={'chat_list_items'}>
                {chatList.length && chatList.map(({id, from_user_id, to_user_id, from_user, to_user}) => {

                    return (
                        <ListItem
                            key={id}
                            onClick={() => {
                                navigate(`/chat/${id}`)
                            }}
                            className={(params.id && +params.id === +id) ? 'active' : 'item'}
                        >
                            {myProfile.id === from_user_id ? to_user.profile.first_name : from_user.profile.first_name}
                        </ListItem>
                    )
                })}
                {error && <h4>Something wrong</h4>}
            </List>
        </div>
    )
}

export default ChatList;