import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PaginationParams, RequestToFriendBody, UsersResponse } from '../../Types/Network';
import { objectToQueryString } from '../../helpers/objectToQueryString';
import { toast } from 'react-toastify';

export const NetworkApi = createApi({
    reducerPath: 'getUsers',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/network`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('token')}`,)
            return headers
        }
    }),

    endpoints: (build) => {

        const baseBuild = build.query<UsersResponse, PaginationParams>({
            query: (arg) => {
                return {
                    url: `/get_users?${objectToQueryString(arg)}`,
                }
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },

            merge: (currentCache, newItems) => {
                if (newItems.list.length) {
                    return {
                        ...currentCache,
                        ...newItems,
                        list: [...currentCache.list, ...newItems.list]
                    };
                }
                return currentCache;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },

            transformErrorResponse(baseQueryReturnValue: any) {
                if (baseQueryReturnValue && baseQueryReturnValue.data.errors) {
                    toast.error(baseQueryReturnValue.data.errors)
                    return baseQueryReturnValue.data.errors
                }
            }
        })
        return {
            fetchAllUsers: baseBuild,
            fetchRequests: baseBuild,
            fetchMyFriends: baseBuild,

            requestToFriend: build.mutation<{ errors: [] | null, message: '' }, RequestToFriendBody>({
                query: (request) => {
                    return {
                        url: `/request`,
                        method: 'POST',
                        body: {...request},
                    }
                },
                transformErrorResponse(baseQueryReturnValue: any) {
                    if (baseQueryReturnValue && baseQueryReturnValue.data.errors) {
                        toast.error(baseQueryReturnValue.data.errors)
                        return baseQueryReturnValue.data.errors
                    }
                }
            })
        }
    }
})

