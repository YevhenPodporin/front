import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatInput, { chatInputType, clickHandlerProps } from './ChatInput';
import { useAppSelector } from '../../api/hooks/redux';
import { sendMessageType } from '../../Types/Chat';


let timeout: any = undefined;
let typing = false;

function ChatMain() {
    const {id: chatId} = useParams();
    const {first_name, id} = useAppSelector(state => state.userProfileReducer.user);
    const currentChat = useAppSelector(state => state.chatSlice.data)
    const token = localStorage.getItem('token');

    const [messages, setMessages] = useState<any[]>([]);
    const [socket, setSocket] = useState<any | null>(null);
    const [userTyping, setUserTyping] = useState('');

    useEffect(() => {
        if (chatId) {
            const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000',
                {
                    autoConnect: false,
                    auth: {token}
                },
            );

            newSocket.connect();
            setSocket(newSocket);
            let recipient = currentChat.find(chat => +chat.id === Number(chatId))


            if (recipient) {
                const to_user_id = recipient.to_user_id === id ? recipient.from_user_id : recipient.to_user_id
                newSocket.emit('join-room', {id: chatId, to_user_id});
            }

            newSocket.on('receive-message', (data) => {
                setMessages(prev => [...prev, data])
            })
            newSocket.on('someoneTyping', (data: { first_name: string, id: string }) => {
                setUserTyping(data.first_name)
            })
            newSocket.on('stop-typing', () => {
                setUserTyping('')
            });

        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [chatId, currentChat])


    const sendMessage = async ({message, file}: clickHandlerProps) => {
        const reader = new FileReader();
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
            socket.emit('send-message', {message, chat_id: chatId}, (status: string) => {
                console.log(status)
            })
        }
    }

    function timeoutFunction() {
        typing = false;
        socket.emit('stop-typing', chatId);
    }

    const onInput = (e:React.FormEvent<HTMLDivElement>) => {

        if (!typing) {
            typing = true
            socket.emit('typing', {first_name, chat_id: chatId});
            timeout = setTimeout(timeoutFunction, 3000);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 3000);
        }
    }

    return (
        <Box className={'messages'}>
            <div className={'messages_wrapper'}>{messages.map((data, index) => {
                return (
                    <div key={index}>{data.message}</div>
                )
            })}
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
                /></div>
        </Box>
    )

}

export default ChatMain;