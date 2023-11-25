import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
        },
        set_token: (state, action) => {
            state.token = action.payload.token;
        },
    },
});

export const { login, logout, set_token } = authSlice.actions;