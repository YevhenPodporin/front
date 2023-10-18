import {UserProfile} from "../../api/models/UserProfile";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserProfileState {
    user: UserProfile,
    isLoading: boolean,
    error: string,
}

const initialState: UserProfileState = {
    user: {
        email: '',
        date_of_birth: '',
        file_path: '',
        id: null,
        first_name: '',
        last_name: '',
        is_online: false
    },
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name:'getUserProfile',
    initialState,
    reducers:{
        userProfileFetching(state){
            state.isLoading = true
            state.error = ''
        },
        userProfileFetchingSuccess(state,action:PayloadAction<UserProfile>){
            state.isLoading = false
            state.user = action.payload
            state.error = ''
        },
        userProfileFetchingError(state,action:PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default userSlice.reducer;