import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { toast } from 'react-toastify';
import { userEditProfile } from '../../Types/user';
import { UserProfile } from '../../api/models/UserProfile';
import transformErrorResponse from '../../helpers/transformErrorResponse';

export const UserProfileApi = createApi({
    reducerPath: 'userProfile',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/profile`,
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
            return headers
        },
    }),
    endpoints: (build) => {
        return {
            editProfile: build.mutation<UserProfile, FormData>({
                query: (request) => {
                    console.log(request)
                    return {
                        url: `/edit`,
                        method: 'POST',
                        body: request,
                    }
                },

                transformErrorResponse: transformErrorResponse,
            })
        }
    }
})

export const {
    useEditProfileMutation
} = UserProfileApi

