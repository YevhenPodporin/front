import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userProfileReducer from './redusers/UserProfileSlice';
import popupReducer from './redusers/ShowHiePopup';

const rootReducer = combineReducers({
    userProfileReducer, popupReducer
})

export const setupStore = ()=>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']