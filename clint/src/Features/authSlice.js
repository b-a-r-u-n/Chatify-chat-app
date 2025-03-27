import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

export const checkAuth = createAsyncThunk('checkAuth', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await responce.json();
        // console.log(data);
        if (!data.success) throw new Error(data.message || "Request failed");

        return data;
    } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        return rejectWithValue(error.message || "Something went wrong");
    }
})

export const handleSignup = createAsyncThunk('handleSignup', async (formData, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await responce.json(); 
        
        if (!data.success) throw new Error(data.message || "Signup failed");
        
        return data;
    } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        return rejectWithValue(error?.message || "Something went wrong");
    }
})

export const handleLogin = createAsyncThunk('handleLogin', async (formData, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await responce.json();

        if (!data.success) throw new Error(data.message || "Login failed");

        return data;
    } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        return rejectWithValue(error?.message || "Something went wrong");
    }
})

export const handleLogout = createAsyncThunk('handleLogout', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await responce.json();

        if (!data.success) throw new Error(data.message || "Request failed");

        return data;
    } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        return rejectWithValue(error?.message || "Something went wrong");
    }
})

const initialState = {
    authUser: null,
    isCheckingAuth: true,

    isSignup: false,
    isLogin: false,
    isUpdateProfile: false,
    isLogout: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.fulfilled, (state, action) => {            
            if(action.payload?.success === 'true' || action.payload?.success === true)
                state.authUser = action.payload?.data || null;
            // console.log('state.authUser', state.authUser);
            state.isCheckingAuth = false;
        })
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.authUser = null;
            state.isCheckingAuth = false;
        })

        //Sign up
        builder.addCase(handleSignup.pending, (state, _) => {
            state.isSignup = true;
        })
        builder.addCase(handleSignup.fulfilled, (state, _) => {
            state.isSignup = false;
        })
        builder.addCase(handleSignup.rejected, (state, _) => {
            state.isSignup = false;
        })

        //Log in
        builder.addCase(handleLogin.pending, (state, _) => {
            state.isLogin = true;
        })
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            if(action.payload?.success === true || action.payload?.success === 'true'){
                state.authUser = action.payload?.data || null;                
            }
            state.isLogin = false;
        })
        builder.addCase(handleLogin.rejected, (state, _) => {
            state.isLogin = false;
        })

        //LogOut
        builder.addCase(handleLogout.pending, (state, _) => {
            state.isLogout = true;
        })
        builder.addCase(handleLogout.fulfilled, (state, action) => {
            if(action.payload?.success === true || action.payload?.success === 'true')
                state.authUser = null;
            console.log('state.authUser', state.authUser);
            state.isLogout = false;
        })
        builder.addCase(handleLogout.rejected, (state, _) => {
            state.isLogout = false;
        })
    }
})

export const {  } = authSlice.actions;
export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// export const checkAuth = createAsyncThunk('checkAuth', async (_, { rejectWithValue }) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error?.message || error);
//         toast.error(error?.message || "Something went wrong");
//         return rejectWithValue(error?.message || "Something went wrong");
//     }
// });

// export const handleSignup = createAsyncThunk('handleSignup', async (formData, { rejectWithValue }) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
//             method: 'POST',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });
//         const data = await response.json();
//         if (!data.success) throw new Error(data.message || "Signup failed");
//         return data;
//     } catch (error) {
//         toast.error(error?.message || "Something went wrong");
//         return rejectWithValue(error?.message || "Something went wrong");
//     }
// });

// export const handleLogin = createAsyncThunk('handleLogin', async (formData, { rejectWithValue }) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
//             method: 'POST',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });
//         const data = await response.json();
//         if (!data.success) throw new Error(data.message || "Login failed");
//         return data;
//     } catch (error) {
//         toast.error(error?.message || "Something went wrong");
//         return rejectWithValue(error?.message || "Something went wrong");
//     }
// });

// export const handleLogout = createAsyncThunk('handleLogout', async (_, { rejectWithValue }) => {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         const data = await response.json();
//         if (!data.success) throw new Error(data.message || "Logout failed");
//         return data;
//     } catch (error) {
//         toast.error(error?.message || "Something went wrong");
//         return rejectWithValue(error?.message || "Something went wrong");
//     }
// });

// const initialState = {
//     authUser: null,
//     isCheckingAuth: true,
//     isSignup: false,
//     isLogin: false,
//     isUpdateProfile: false,
//     isLogout: false
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Check Auth
//             .addCase(checkAuth.fulfilled, (state, action) => {
//                 state.authUser = action.payload?.success ? action.payload?.data : null;
//                 state.isCheckingAuth = false;
//             })
//             .addCase(checkAuth.rejected, (state) => {
//                 state.authUser = null;
//                 state.isCheckingAuth = false;
//             })

//             // Signup
//             .addCase(handleSignup.pending, (state) => { state.isSignup = true; })
//             .addCase(handleSignup.fulfilled, (state) => { state.isSignup = false; })
//             .addCase(handleSignup.rejected, (state) => { state.isSignup = false; })

//             // Login
//             .addCase(handleLogin.pending, (state) => { state.isLogin = true; })
//             .addCase(handleLogin.fulfilled, (state, action) => {
//                 state.authUser = action.payload?.success ? action.payload?.data : null;
//                 state.isLogin = false;
//             })
//             .addCase(handleLogin.rejected, (state) => { state.isLogin = false; })

//             // Logout
//             .addCase(handleLogout.pending, (state) => { state.isLogout = true; })
//             .addCase(handleLogout.fulfilled, (state, action) => {
//                 if (action.payload?.success) state.authUser = null;
//                 state.isLogout = false;
//             })
//             .addCase(handleLogout.rejected, (state) => { state.isLogout = false; });
//     }
// });

// export default authSlice.reducer;
