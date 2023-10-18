import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { toast } from 'react-toastify';
import { chatListItem, CreateChatType } from '../../Types/Chat';
import transformErrorResponse from '../../helpers/transformErrorResponse';

export const ChatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/chat`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
            return headers
        }
    }),
    tagTypes: ['CreatedChat'],
    endpoints: (build) => ({
        getChatList: build.query<chatListItem[] | [], void>({
            query: () => '/list',
            transformErrorResponse: transformErrorResponse,
            providesTags: ['CreatedChat']
        }),
        createChat: build.mutation<{ error: string | null, chat: chatListItem }, CreateChatType>({
            query: (request: CreateChatType) => {
                return {
                    url: `/create`,
                    method: 'POST',
                    body: request,
                }
            },
            invalidatesTags: (result) => {
                if (result && result.error) {
                    toast.error(result.error)
                }
                return ['CreatedChat']
            },
        })
    })
})

export const {
    useGetChatListQuery,
    useCreateChatMutation
} = ChatApi

