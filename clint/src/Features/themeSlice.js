import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeColor: sessionStorage.getItem('chat-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.themeColor = action.payload;
            sessionStorage.setItem('chat-theme', action.payload);
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer