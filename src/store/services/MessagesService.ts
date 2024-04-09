import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { objectToQueryString } from '../../helpers/objectToQueryString';
import transformErrorResponse from '../../helpers/transformErrorResponse';
import { getMessages, MessagesResponse } from '../../Types/Chat';


export const MessageApi = createApi({
    reducerPath: 'getMessages',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/chat`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
            return headers
        }
    }),
    tagTypes: ['Request', 'Search'],
    endpoints: (build) => {

        return {
           getMessages: build.query<MessagesResponse, getMessages>({
                query: (arg) => {
                    return {
                        url: `/messages?${objectToQueryString(arg)}`,
                    }
                },
                serializeQueryArgs: ({endpointName}) => {
                    return endpointName
                },

                forceRefetch({currentArg, previousArg}) {
                    return currentArg !== previousArg;
                },

                transformErrorResponse:transformErrorResponse,
                providesTags: (result, error, arg) => {
                    return ['Request',{ type: 'Search', id: arg.chat_id }];
                }

            })

        }
    }
})

export const {
    useGetMessagesQuery
} = MessageApi

