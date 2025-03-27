import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Features/authSlice.js';

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})