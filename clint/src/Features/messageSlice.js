import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getAllUsers = createAsyncThunk('getAllUsers', async (__DO_NOT_USE__ActionTypes, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/user/users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await responce.json();
        // console.log(data);
        if (!data.success){
            toast.error(data.message || "Request failed");
            throw new Error(data.message || "Request failed");
        }
        return data;
        
    } catch (error) {
        
    }
})

const initialState = {
    messages: [],
    users: [],
    selectedUser: null,
    isMessageLoading: false,
    isUserLoading: false,
}

const messageSlice = createSlice({
    initialState,
    name: 'message',
    reducers:{},
    extraReducers: (builder) => {
        // get users
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.isUserLoading = true;
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            if(action.payload?.success === 'true' || action.payload?.success === true)
                state.users = action.payload?.data || null;
            state.isUserLoading = false;
        })
        builder.addCase(getAllUsers.rejected, (state, _) => {
            state.isUserLoading = false;
            // toast.error(_.error.message || "Something went wrong while fetching users");
        })
    }
})

export const {} = messageSlice.actions;
export default messageSlice.reducer;