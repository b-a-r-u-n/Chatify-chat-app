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
        console.log(error);
    }
})

export const getMessages = createAsyncThunk('getMessages', async (userId, {rejectWithValue}) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/message/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await responce.json();
        // console.log(data);
        if(!data.success){
            toast.error(data.message || "Request failed");
            throw new Error(data.message || "Request failed");
        }

        return data;
    } catch (error) {
        console.log(error);
    }
})

export const sendMessage = createAsyncThunk('sendMessage', async ({userId, formData}, {rejectWithValue}) => {
    try {
        console.log(formData);
        
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/message/send/${userId}`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        const data = await responce.json();
        console.log(data);
        if(!data.success){
            toast.error(data.message || "Request failed");
            throw new Error(data.message || "Request failed");
        }
    } catch (error) {
        console.log(error?.message || error);
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
    reducers:{
        selectUser: (state, action) => {
            state.selectedUser = action.payload;            
        }
    },
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

        //get Messages
        builder.addCase(getMessages.pending, (state, _) => {
            state.isMessageLoading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            if(action.payload?.success === 'true' || action.payload?.success === true)
                state.messages = action.payload?.data || null;
            state.isMessageLoading = false;
        })
        builder.addCase(getMessages.rejected, (state, ) => {
            state.isMessageLoading = false;
        })
    }
})

export const {selectUser} = messageSlice.actions;
export default messageSlice.reducer;