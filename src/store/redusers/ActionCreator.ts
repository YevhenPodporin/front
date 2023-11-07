import {AppDispatch} from "../store";
import {userSlice} from "./UserProfileSlice";
import axios from "axios";
import {UserProfile} from "../../api/models/UserProfile";
import { toast } from 'react-toastify';

export const fetchUserProfile = () => async (dispatch:AppDispatch)=> {
    try {
        dispatch(userSlice.actions.userProfileFetching());
        const response = await axios.get<UserProfile>(`${process.env.REACT_APP_PUBLIC_URL}/profile`, {
            headers:{authorization:`Bearer ${localStorage.getItem('token')}`}
        });
        dispatch(userSlice.actions.userProfileFetchingSuccess(response.data))
    } catch (e:any){
        toast.error(e.response.data)
        dispatch(userSlice.actions.userProfileFetchingError(e.response.data))
    }
}