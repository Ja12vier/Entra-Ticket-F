
import {createSlice} from '@reduxjs/toolkit';

export const IsLoadersSlice = createSlice({
    name:"isLoader",
    initialState: false,
    reducers: {
        setIsloader:(state, action)=>{
            return action.payload;
        }
    }
})

export const {setIsloader} = IsLoadersSlice.actions;
export default IsLoadersSlice.reducer;