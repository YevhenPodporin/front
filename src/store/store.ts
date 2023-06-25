import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userProfileReducer from './redusers/UserProfileSlice';

const rootReducer = combineReducers({
    userProfileReducer
})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']