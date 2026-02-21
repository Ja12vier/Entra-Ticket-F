
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsloader } from "./isLoader.slice";
import Config from "../../utils/Config";

export const CartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        setCart:(state, action)=>{
            return action.payload;
        }
    }
});

export const getCartThunk=()=>(dispatch)=>{
    dispatch(setIsloader(true));

    axios
      .get("https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/carts", Config())
      .then((resp)=>dispatch(setCart(resp.data)))
      .catch((error)=>console.log(error))
      .finally(()=>dispatch(setIsloader(false)));
}


export const {setCart} = CartSlice.actions;
export default CartSlice.reducer;