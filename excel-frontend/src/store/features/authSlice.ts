import { createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import {fetchUserData, login, signOut} from '../middlewares/authMiddleware';

interface AuthState {
    token: string | null;
    loading: boolean;
    userData: any;
}

interface LoginPayload {
    token: string;
    username: any;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    userData: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addCase(signOut.fulfilled, (state : AuthState) => {
                state.loading = false;
                state.userData = {};
                state.token = null;
            })
            .addCase(login.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<LoginPayload>) => {
                const {token, username} = action.payload;
                console.log(action.payload, 'fulfilled');
                state.token = token;
                state.userData = username;
                state.loading = false;
            })
            .addCase(login.rejected, (state: AuthState) => {
                state.loading = false;
            })
            .addCase(fetchUserData.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state: AuthState, action: PayloadAction<LoginPayload>) => {
                const {token, username} = action.payload;
                state.token = token;
                state.userData = username;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state: AuthState) => {
                state.loading = false;
                state.userData = {};
                state.token = null;
            });
    },
})

export const {} = authSlice.actions;

export default authSlice.reducer;