import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadUser, logoutUser } from "../../authReducer";

export const signupUser = createAsyncThunk('signpUser', async (newUser, {dispatch, rejectWithValue}) => {
    //config
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
    //body
        const body = JSON.stringify(newUser);
        console.log(body);

        return axios.post('/register', body, config)
            .then(res => {
                const newuser = {
                    result: res.data.user,
                    token: res.data.token
                }
               return dispatch(loadUser(newuser));
            })
            .catch(err => {
                dispatch(logoutUser());
                return rejectWithValue(err);
            })
});