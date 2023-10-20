import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userProfileReducer from './redusers/UserProfileSlice';
import popupReducer from './redusers/ShowHidePopupSlice';
import networkSlice from './redusers/NetworkSlice';
import messagesSlice from './redusers/MessagesSlice';
import chatSlice from './redusers/ChatSlice';
import { NetworkApi } from './services/NetworkService';
import { UserProfileApi } from './services/userProfileService';
import { ChatApi } from './services/ChatService';
import { MessageApi } from './services/MessagesService';

const rootReducer = combineReducers({
    userProfileReducer,
    networkSlice,
    chatSlice,
    popupReducer,
    messagesSlice,
    [NetworkApi.reducerPath]: NetworkApi.reducer,
    [UserProfileApi.reducerPath]: UserProfileApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [MessageApi.reducerPath]: MessageApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                NetworkApi.middleware,
                UserProfileApi.middleware,
                MessageApi.middleware,
                ChatApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']