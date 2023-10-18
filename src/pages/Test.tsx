import { FormEvent, useEffect, useState } from 'react';
import { io, Socket, } from 'socket.io-client';
import { useAppSelector } from '../api/hooks/redux';

export default function TestPage() {
    const [messages, setMessages] = useState<string[]>([]);
    const token = localStorage.getItem('token');
    const [message, setMessage] = useState('');
    const {first_name, id} = useAppSelector(state => state.userProfileReducer.user);
    const [roomId, setRoomId] = useState('');
    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);


    useEffect(() => {
        const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000',
            {
                autoConnect: false,
                auth: {token}
            },
        );
        socket.connect();
        setSocket(socket)
    }, [])

    // socket.on('connected-to-room',(roomId)=>{
    //     // setRoomId(roomId)
    // })
    useEffect(() => {
        if (socket) {
            socket.on('receive-message', (data) => {
                setMessages(prev => [...prev, data])
            })
        }
    }, [socket])


    const onInput = (e: string) => {
        setMessage(e)
    }

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        socket.emit('send-message', message)
        setMessage('')
    }

    return (
        <div className="test-page">
            <div className={'list'}>{messages.map(message => {
                return (
                    <div>{message}</div>
                )
            })}</div>

            <form onSubmit={sendMessage}>
                <input value={message} onChange={(e) => onInput(e.target.value)}/>
                <button>Send</button>
            </form>

        </div>
    )
};
