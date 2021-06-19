import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updatedPost } from '../../postsReducer';
import { tokenConfig } from '../tokenConfig';

export const likePost = createAsyncThunk('likePost', async(id, {dispatch, getState, rejectWithValue}) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    config.headers['authorization'] = getState().authReducer.token;

    return axios.patch(`/likepost/${id}`,config, tokenConfig(getState))
        .then(res => {
            return dispatch(updatedPost(res.data))
        })
        .catch(err => {
            return rejectWithValue(err);
        })

})