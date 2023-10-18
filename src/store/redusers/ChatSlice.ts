import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatListItem } from '../../Types/Chat';


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
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})
export default chatSlice.reducer;