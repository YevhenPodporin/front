import { createSlice } from "@reduxjs/toolkit";



const initialState: {page:number} = {
 page:0
}

export const TestSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {
        nextPage:(state, action)=>{
            state.page = action.payload
        }
    }
})
export default TestSlice.reducer;