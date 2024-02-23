import { createAsyncThunk } from '@reduxjs/toolkit'
import {getToken, removeToken, setToken} from '../../utils/helperFuntions.ts';
import api from '../../sercives/api.ts';
import axios from "axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, {rejectWithValue}) => {
    try{
        const accessToken = getToken();
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        console.log(accessToken, 'accessToken')
        const response = await api.get('/protected/user', {
            withCredentials: true,
        });
        if (response.status === 200) {
            return {...response.data, accessToken};
        }
    }catch(e){
        removeToken();
        return rejectWithValue('');
    }
});

export const login = createAsyncThunk(
    'auth/login',
    async ({username, password}: {username: string, password: string}, thunkAPI) => {
        try {
            const response = await axios.post('/auth/login', {
                username,
                password
            });
            let data = await response.data;
            if (response.status === 200) {
                console.log(data, 'data')
                setToken(data.token);
                return {...data, username: username};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log('Error');

        }
    }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
    removeToken();
});