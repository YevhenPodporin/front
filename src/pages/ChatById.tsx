import ChatList from '../components/ChatPage/ChatList';
import '../assets/styles/ChatPage.scss'
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../api/hooks/redux';
import { Direction, OrderBy, PaginationParams } from '../Types/Network';
import { messageListItem, MessagesResponse, Notifications } from '../Types/Chat';
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatInput, { clickHandlerProps } from '../components/ChatPage/ChatInput';
import MessagesList from '../components/ChatPage/MessagesList';
import { chatSlice } from '../store/redusers/ChatSlice';

interface MessagesState {
    data: messageListItem[] | [],
    count: number,
    pagination: PaginationParams['pagination']
}

const initialState = {
    data: [],
    count: 0,
    pagination: {
        take: 10,
        skip: 0,
        direction: Direction.desc,
        order_by: OrderBy.created_at
    },
}

let timeout: any = undefined;
let typing = false;

function ChatById() {
    const {id: chatId} = useParams<{ id: string }>();
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const [currentMessages, setCurrentMessages] = useState<MessagesState>(initialState);
    const [userTyping, setUserTyping] = useState('');
    const {first_name, id} = useAppSelector(state => state.userProfileReducer.user);
    const lastMessageRef = useRef(null)

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000',
            {
                autoConnect: false,
                auth: {token}
            },
        );

        newSocket.connect();
        setSocket(newSocket);

        return () => {
            newSocket.emit('stop-typing', chatId);
            newSocket.disconnect()
            setUserTyping('')
            setSocket(null)
            setCurrentMessages(initialState)
        }
    }, [chatId])


    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', {id: chatId});

            socket.on('receive-message', (data: messageListItem) => {
                setCurrentMessages(prev => (
                    {...prev, data: [data, ...prev.data]}
                ))
            })

            socket.on('someoneTyping', (data: { first_name: string, id: string }) => {
                setUserTyping(data.first_name)
            })

            socket.on('stop-typing', () => {
                setUserTyping('')
            });

            socket.on('notification', (data: Notifications) => {
                dispatch(chatSlice.actions.editNotification(data))
            })

            socket.emit('getMessages', {
                chat_id: Number(chatId),
                pagination: initialState.pagination
            }, (response: MessagesResponse) => {
                setCurrentMessages(prev => ({
                    data: response.list,
                    count: response.count,
                    pagination: initialState.pagination
                }))
            })
        }
    }, [socket])

    const sendMessage = async ({message, file}: clickHandlerProps) => {
        if (!socket) return;
        const reader = new FileReader();
        console.log(message,file)
        if (file) {
            reader.readAsDataURL(file.data)
            reader.onloadend = () => {
                socket.emit('send-message', {
                    file: {data: reader.result, fileName: file.fileName},
                    message,
                    chat_id: chatId
                }, (status: string) => {
                    console.log(status)
                })
            }
        } else {
            socket.emit('send-message', {message, chat_id: chatId})
        }
    }

    function timeoutFunction() {
        if (!socket) return;

        typing = false;
        socket.emit('stop-typing', chatId);
    }

    const onInput = () => {
        if (!socket) return;

        if (!typing) {
            typing = true
            socket.emit('typing', {first_name, chat_id: chatId});
            timeout = setTimeout(timeoutFunction, 3000);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 3000);
        }
    }

    const nextFunction = () => {
        if (!socket) return;

        socket.emit('getMessages', {
            chat_id: Number(chatId),
            pagination: {
                ...currentMessages.pagination,
                skip: currentMessages.pagination.skip + currentMessages.pagination.take
            }
        }, (response: MessagesResponse) => {
            setCurrentMessages(prev => (
                {
                    ...prev,
                    pagination: {
                        ...prev.pagination,
                        skip: prev.pagination.skip + prev.pagination.take
                    },
                    count: response.count,
                    data: [...prev.data, ...response.list]
                }
            ))
        })
    }


    return chatId && socket ? (
        <div className={'chat_wrapper'}>
            <ChatList/>
            <Box className={'messages'}>

                <div
                    id={"messages_wrapper"}
                    className={'messages_wrapper'}>
                    <InfiniteScroll
                        dataLength={currentMessages.data.length} //This is important field to render the next data
                        next={nextFunction}
                        inverse={true}
                        className={'infinite__scroll'}
                        hasMore={currentMessages.data.length < currentMessages.count}
                        loader={null}
                        scrollableTarget={'messages_wrapper'}
                    >
                        {currentMessages.data.length ? <MessagesList list={currentMessages.data}/> : null}
                    </InfiniteScroll>
                </div>

                <div className={'bottom_block'}>
                    {userTyping && <div className={'user_typing'}>
                        <span className={"text"}>{userTyping} is typing</span>
                        <div className="typingIndicatorContainer">
                            <div className="typingIndicatorBubble">
                                <div className="typingIndicatorBubbleDot"></div>
                                <div className="typingIndicatorBubbleDot"></div>
                                <div className="typingIndicatorBubbleDot"></div>
                            </div>
                        </div>
                    </div>}
                    <ChatInput
                        submitHandler={sendMessage}
                        onInput={onInput}
                    />
                </div>
            </Box>

            <div></div>
        </div>
    ) : null;
}

export default ChatById;
