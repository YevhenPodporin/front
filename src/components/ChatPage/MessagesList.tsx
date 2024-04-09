import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../api/hooks/redux';
import { editMessage, messageListItem } from '../../Types/Chat';
import UseOutsideClick from '../../Hooks/useOutsideClick';
import { Avatar, MenuItem, MenuList } from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';



type PropsType = {
    list: messageListItem[],
    setEditMessageId: (data: Pick<editMessage, 'message_id' | 'value'>) => void
}

function MessagesList({list, setEditMessageId}: PropsType) {
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const {id} = useAppSelector(state => state.userProfileReducer.user);
    const {id: chatId} = useParams<{ id: string }>();

    const [isOpenContextMenu, setIsOpenContextMenu] = useState<number | boolean>(false);
    const [menuPlacement, setMenuPlacement] = useState({clientX: 0, clientY: 0});
    const currentChat = useAppSelector(state => (state.chatSlice.data.find((item)=>(item.id === Number(chatId)))));

    const myProfile = useAppSelector(state => state.userProfileReducer.user)



    const hideContextMenu = (res: boolean) => {
        setIsOpenContextMenu(res);
    }
    const current = UseOutsideClick(Boolean(isOpenContextMenu), hideContextMenu)

    const copyText = (value: string) => {
        navigator.clipboard.writeText(value);
        toast.success('Message was copy successful', {position: 'bottom-center'})
    }

    return (
        <>
            {list.map((data, index) => {
                const isLastMessage = index === 0;
                const isMyMessage = data.sender_id === id;
                const senderImage = isMyMessage? myProfile.file_path: myProfile.id === currentChat?.from_user_id ? currentChat.to_user.profile.file_path: currentChat?.from_user.profile.file_path
                const fileName = data?.file?.split('-').at(-1);
                const localCreatedAt = new Date(data.created_at).toLocaleDateString();
                const diffDate = localCreatedAt !== new Date(list[index + 1]?.created_at).toLocaleDateString();
                return (
                    <div className={'wrapper'} key={data.id}>
                        {diffDate &&
                            <div className={'messages_date'}>
                                <div className={'chat_left_line'}></div>
                                <span className={'date'}>{localCreatedAt}</span>
                                <div className={'chat_right_line'}></div>
                            </div>}
                        <div
                            key={data.id}
                            ref={isLastMessage ? lastMessageRef : undefined}
                            className={isMyMessage ? "message__item my_message" : "message__item not_my"}
                        >

                            {data.updated_at && <span
                                className={'updated_at'}>Изменено: {new Date(data.updated_at).toLocaleDateString()}
                            </span>}
                            {!isMyMessage && <Avatar src={senderImage} className={"avatar"}/>}

                            <div className={"item"}
                                 onContextMenu={(e) => {
                                     e.preventDefault();
                                     setMenuPlacement({clientX: e.clientX, clientY: e.clientY})
                                     setIsOpenContextMenu(data.id)
                                 }}
                            >
                                <div>
                                    {data.file && <div className={'image'}>
                                        {fileName && fileName.includes('webm')
                                            ? <audio controls src={data.file.split(';')[0]}/>
                                            : <img src={data.file} alt={'image'}/>}
                                        {fileName && !fileName.includes('webm') &&
                                            <a href={data.file}>Save file: {fileName}</a>}
                                    </div>}
                                    <div>{data.message}</div>
                                </div>
                                <span
                                    className={'time'}>{new Date(data.created_at).toLocaleTimeString().slice(0, 5)}
                            </span>
                            </div>
                            {isMyMessage && <Avatar src={senderImage} className={"avatar"}/>}

                            {isOpenContextMenu === data.id && <MenuList
                                style={{left: menuPlacement.clientX, top: menuPlacement.clientY}}
                                ref={current}
                                className={'context_menu_wrapper'}>
                                {data.sender_id === id && <MenuItem
                                    children={'Edit message'}
                                    onClick={() => setEditMessageId({message_id: data.id, value: data.message})}
                                />}
                                <MenuItem
                                    children={'Copy text'}
                                    onClick={() => copyText(data.message)}
                                />
                            </MenuList>}
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default MessagesList;