import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface isShowPopup {
    isShow: boolean,
}

const initialState: isShowPopup = {
        isShow:false
}

export const popupSlice = createSlice({
    name:'showHidePopup',
    initialState,
    reducers:{
        showPopup(state,action:PayloadAction<boolean>){
            state.isShow = true
        },
        hidePopup(state){
            state.isShow = false
        },
    }
})
export default popupSlice.reducer;