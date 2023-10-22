import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatListItem, Notifications } from '../../Types/Chat';


interface ChatListState {
    data: chatListItem[] | [],
    isLoading: boolean,
    error: string,
}

const initialState: ChatListState = {
    data: [],
    isLoading: false,
    error: '',
}


export const chatSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {
        setChatList: (state, action: PayloadAction<chatListItem[]>) => {
            state.data = action.payload
        },
        editNotification:(state,action:PayloadAction<Notifications>)=>{
            state.data = state.data.map(chat=>{
                if(chat.id === action.payload.to_chat_id){
                    return {
                        ...chat,
                        last_message:action.payload.message,
                        unread_messages:action.payload.unread_messages}
                }else{
                    return chat
                }
            })
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})
export default chatSlice.reducer;