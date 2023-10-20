import { FormEvent, useEffect, useState } from 'react';
import { io, Socket, } from 'socket.io-client';
import { useAppSelector } from '../api/hooks/redux';

export default function TestPage() {

    useEffect(() => {
        const token = localStorage.getItem('token')
        const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000',
            {
                autoConnect: false,
                auth: {token}
            },
        );

        newSocket.connect();


        newSocket.emit('joinRoom', {id:'OLEG'});
    }, [])

    return (
        <div className="test-page">


        </div>
    )
};
