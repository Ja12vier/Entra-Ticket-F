import { createSlice } from "@reduxjs/toolkit";


export const ShowCartSlice=createSlice({
    name:"showCart",
    initialState:false,
    reducers:{
        setShowCart:(state,action)=>action.payload
    }
});

export const {setShowCart}= ShowCartSlice.actions;
export default ShowCartSlice.reducer;