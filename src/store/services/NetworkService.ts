import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PaginationParams, RequestToFriendBody, UsersResponse } from '../../Types/Network';
import { objectToQueryString } from '../../helpers/objectToQueryString';
import { toast } from 'react-toastify';
import transformErrorResponse from '../../helpers/transformErrorResponse';

//TODO make global error handler for base query and check 401 && jwt error if so force redirect to login

export const NetworkApi = createApi({
    reducerPath: 'getUsers',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/network`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
            return headers
        }
    }),
    tagTypes: ['Request', 'Search'],
    endpoints: (build) => {

        const baseBuild = build.query<UsersResponse, PaginationParams>({
            query: (arg) => {
                return {
                    url: `/get_users?${objectToQueryString(arg)}`,
                }
            },
            serializeQueryArgs: ({endpointName}) => {
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
            forceRefetch({currentArg, previousArg}) {
                return currentArg !== previousArg;
            },

            transformErrorResponse:transformErrorResponse,
            providesTags: (result, error, arg) => {
                const searchTag = arg.filter.search || 'no_search'; // Если параметр поиска не указан, используйте 'no_search' в качестве id
                return ['Request',{ type: 'Search', id: searchTag }];
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
                invalidatesTags: (result) => {
                    if (result && !result.errors) {
                        toast.success(result.message)
                    }
                    return [{type:'Request', id:'Request'}]
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

export const {
    useFetchAllUsersQuery,
    useFetchMyFriendsQuery,
    useFetchRequestsQuery,
    useRequestToFriendMutation
} = NetworkApi

