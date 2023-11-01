import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../api/hooks/redux';
import { messageListItem } from '../../Types/Chat';


function MessagesList({list}: { list: messageListItem[] }) {
    const lastMessageRef = useRef(null)
    const {id} = useAppSelector(state => state.userProfileReducer.user);

    useEffect(() => {
        console.log(lastMessageRef)
    }, [lastMessageRef])

    return (
        <>
            {list.map((data, index) => {
                const isLastMessage = index === 0;
                const isMyMessage = data.sender_id === id;
                const fileName = data?.file?.split('-').at(-1);

                return (
                    <div
                        key={data.id}
                        ref={isLastMessage ? lastMessageRef : undefined}

                        className={isMyMessage ? "message__item my_message" : "message__item not_my"}
                    >
                        <div className={"item"}>
                            <div>
                                {data.file && <div className={'image'}>
                                    {fileName && fileName.includes('webm')
                                        ? <audio controls src={data.file.split(';')[0]}/>
                                        : <img src={data.file}/>}
                                    <a href={data.file}>Save file: {fileName}</a>
                                </div>}
                                <div>{data.message}</div>
                            </div>
                            <span
                                className={'time'}>{new Date(data.created_at).toLocaleTimeString().slice(0, 5)}
                            </span>
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default MessagesList;