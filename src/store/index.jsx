
import {configureStore } from '@reduxjs/toolkit';
import IsLoadersSlice from './slices/isLoader.slice';
import EventsSlice  from './slices/events.slice';
import CartSlice from './slices/cart.slice';
import ShowCartSlice  from './slices/showCart.slice';

export default configureStore({

    reducer:{
     isLoader: IsLoadersSlice,
     events: EventsSlice,
     cart:  CartSlice,
     showCart: ShowCartSlice

    }
});