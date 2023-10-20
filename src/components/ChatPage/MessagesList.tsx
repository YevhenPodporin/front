import React, { Ref, useEffect, useRef } from 'react';
import { useAppSelector } from '../../api/hooks/redux';
import { messageListItem } from '../../Types/Chat';


function MessagesList({list}: { list: messageListItem[] }) {
    const lastMessageRef = useRef(null)
    const {first_name, id} = useAppSelector(state => state.userProfileReducer.user);

    useEffect(() => {
        console.log(lastMessageRef)
    }, [lastMessageRef])

    return (
        <>
            {list.map((data, index) => {
                const isLastMessage = index === 0;
                const isMyMessage = data.sender_id === id;

                return (
                    <div
                        key={data.id}
                        ref={isLastMessage ? lastMessageRef : undefined}

                        className={isMyMessage ? "message__item my_message" : "message__item not_my"}
                    >
                        <div className={"item"}>
                            <span>{data.message}</span>
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