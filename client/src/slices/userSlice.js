import { createSlice } from "@reduxjs/toolkit";

// Define initialState outside the slice
const initialState = {
    loading: false,
    authLoading: false,
    error: null,
    isAuthenticated: localStorage.getItem('authState') === 'true',
    user: {
        avatar: '', 
        firstName: '',
        lastName: '',
        email: '',
        avatar: ''
    }
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        registerRequest: (state) => {
            state.authLoading = true;
        },
        registerSuccess: (state) => {
            state.authLoading = false;
        },
        registerFail: (state, action) => {
            state.authLoading = false;
            state.error = action.payload;
        },

        loginRequest: (state) => {
            state.authLoading = true;
        },
        loginSuccess: (state) => {
            state.authLoading = false;
        },
        loginFail: (state, action) => {
            state.authLoading = false;
            state.error = action.payload;
        },

        verifyLoginRequest: (state) => {
            // state.loading = true;
        },
        verifyLoginSuccess: (state, action) => {
            state.isAuthenticated = action.payload.isLogin;
        },
        verifyLoginFail: (state, action) => {
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        getUserRequest: (state) => {
            state.loading = true;
        },
        getUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            Object.assign(state, initialState);  // Reset state using initialState
        }
    }
});

export const {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    verifyLoginRequest,
    verifyLoginSuccess,
    verifyLoginFail,
    getUserRequest,
    getUserSuccess,
    getUserFail,
    logout
} = userSlice.actions;

export default userSlice.reducer;
