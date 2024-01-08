import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../api/hooks/redux';
import { messageListItem } from '../../Types/Chat';
import UseOutsideClick from '../../Hooks/useOutsideClick';
import { MenuItem, MenuList } from '@mui/material';


function MessagesList({list}: { list: messageListItem[] }) {
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const {id} = useAppSelector(state => state.userProfileReducer.user);
    const [isOpenContextMenu, setIsOpenContextMenu] = useState<number | boolean>(false);

    const hideContextMenu = (res: boolean) => {
        setIsOpenContextMenu(res);
    }
    const current = UseOutsideClick(Boolean(isOpenContextMenu), hideContextMenu)

    useEffect(() => {
        // if(lastMessageRef.current){
        //     lastMessageRef.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "start"
        //     })
        // }
    }, [lastMessageRef, list])

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
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setIsOpenContextMenu(data.id)
                        }}
                        className={isMyMessage ? "message__item my_message" : "message__item not_my"}
                    >
                        <div className={"item"}>
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

                        {isOpenContextMenu === data.id && <MenuList
                            ref={current}
                            className={'context_menu_wrapper'}>
                            <MenuItem children={'OLEG'}/>
                        </MenuList>}
                    </div>
                )
            })}
        </>
    )

}

export default MessagesList;