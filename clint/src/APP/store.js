import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Features/authSlice.js';
import themeSlice from '../Features/themeSlice.js';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice
    }
})