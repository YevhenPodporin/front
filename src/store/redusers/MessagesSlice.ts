import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageListItem, MessagesResponse } from '../../Types/Chat';
import { Direction, OrderBy, PaginationParams } from '../../Types/Network';


interface MessagesState {
    data: messageListItem[] | [],
    count:number,
    pagination: PaginationParams['pagination']
}

const initialState: MessagesState = {
    data: [],
    count:0,
    pagination: {
        take: 25,
        skip: 0,
        direction: Direction.desc,
        order_by: OrderBy.created_at
    },
}


export const messagesSlice = createSlice({
    name: 'messagesList',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessagesResponse>) => {
            state.data = action.payload.list
            state.count = action.payload.count
        },
        addNewMessage: (state, action: PayloadAction<messageListItem>) => {
            state.data = [action.payload, ...state.data]
        },
        nextPage:(state, action:PayloadAction) => {
            state.pagination.skip = state.pagination.skip + state.pagination.take
        },
        nextPageMessages:(state, action: PayloadAction<MessagesResponse>)=>{
            state.data = [...state.data,...action.payload.list]
        },
        clearState: (state, action: PayloadAction) => {
            state.data = initialState.data
            state.count = initialState.count
            state.pagination = initialState.pagination
        },
    }
})
export default messagesSlice.reducer;