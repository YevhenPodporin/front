import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userProfileReducer from './redusers/UserProfileSlice';
import popupReducer from './redusers/ShowHiePopup';
import { NetworkApi } from './services/NetworkService';
import  networkSlice  from './redusers/NetworkSlice';

const rootReducer = combineReducers({
    userProfileReducer,
    networkSlice,
    popupReducer,
    [NetworkApi.reducerPath]: NetworkApi.reducer,
})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware) =>
            getDefaultMiddleware().concat(NetworkApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']