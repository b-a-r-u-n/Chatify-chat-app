import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Features/authSlice.js';
import themeSlice from '../Features/themeSlice.js';
import messageSlice from '../Features/messageSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSlice,
        message: messageSlice
    }
})