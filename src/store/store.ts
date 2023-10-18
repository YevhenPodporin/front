import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userProfileReducer from './redusers/UserProfileSlice';
import popupReducer from './redusers/ShowHidePopupSlice';
import { NetworkApi } from './services/NetworkService';
import  networkSlice  from './redusers/NetworkSlice';
import chatSlice  from './redusers/ChatSlice';
import { UserProfileApi } from './services/userProfileService';
import { ChatApi } from './services/ChatService';

const rootReducer = combineReducers({
    userProfileReducer,
    networkSlice,
    chatSlice,
    popupReducer,
    [NetworkApi.reducerPath]: NetworkApi.reducer,
    [UserProfileApi.reducerPath]: UserProfileApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                NetworkApi.middleware,
                UserProfileApi.middleware,
                ChatApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']