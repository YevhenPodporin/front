import {AppDispatch} from "../store";
import {userSlice} from "./UserProfileSlice";
import axios from "axios";
import {UserProfile} from "../../api/models/UserProfile";

export const fetchUserProfile = () => async (dispatch:AppDispatch)=> {
    try {
        dispatch(userSlice.actions.userProfileFetching());
        const response = await axios.get<UserProfile>(`${process.env.REACT_APP_PUBLIC_URL}/profile`, {
            headers:{authorization:`Bearer ${localStorage.getItem('token')}`}
        });
        dispatch(userSlice.actions.userProfileFetchingSuccess(response.data))
    } catch (e:any){
        dispatch(userSlice.actions.userProfileFetchingError(e))
    }
}