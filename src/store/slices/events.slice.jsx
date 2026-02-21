import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsloader } from "./isLoader.slice";

export const EventsSlice = createSlice({
    name: "events",
    initialState: [],
    reducers: {
        setEvents:(state, action)=>{
            return action.payload;
        }
    },
});

export const getThumbsEvents = (searchTerm) =>(dispatch)=>{
   dispatch(setIsloader(true));
   
   axios
   .get(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/events/areas?name_event=${searchTerm}`)
   .then((resp) =>dispatch(setEvents(resp.data)))
   .catch((error) => console.log(error))
   .finally(() =>dispatch(setIsloader(false)))
 
}

export const getOneEventThunk =(id)=> (dispatch)=>{
    dispatch(setIsloader(true));
    axios
    .get(`https://entra-ticket-morning-darkness-5746.fly.dev/api/v1/events/${id}`)
    .then((resp) =>dispatch(setEvents([resp.data])))
    .catch((error) => console.log(error))
    .finally(() =>dispatch(setIsloader(false)))
}

export const {setEvents}=EventsSlice.actions;
export default EventsSlice.reducer;