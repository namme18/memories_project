import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadUser, logoutUser } from "../../authReducer";

export const login = createAsyncThunk('login', async (user, {dispatch, rejectWithValue}) => {
    //config
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    //body
    const body = JSON.stringify(user);
    return axios.post('/login', body, config)
        .then(res => {
           const userData = {
                result : res.data.user,
                token: res.data.token
            }
            return dispatch(loadUser(userData));
        })
        .catch(err => {
            dispatch(logoutUser());
            return rejectWithValue(err);
        })
});