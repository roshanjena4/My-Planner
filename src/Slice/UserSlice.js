import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getUserProfile, signupApi } from "../Api/Auth";

const getToken = localStorage.getItem('token');
const initialState = {
    status: false,
    isLoggedIn: getToken ? true  : false,  
    user: null,
    token: null,    
    loading: false,
    error: null
}

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        const token = await loginApi({ email, password });
        localStorage.setItem('token', token.access_token);

        const userData = await getUserProfile(token.access_token);
        return {
            user: userData,
            token: token.access_token,
        };
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password }, thunkAPI) => {
        const userData = await signupApi({ name, email, password });

    })

export const UserSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        logout: (state) => {
            // debugger
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                // debugger
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                // debugger
                state.status = true;
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                // debugger
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = true;
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;