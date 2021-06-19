import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPost, isLoaded, isLoading } from '../../postsReducer';
import axios from 'axios';
import { tokenConfig } from '../tokenConfig';

export const createNewPost = createAsyncThunk('createNewPost', async (newPost, {dispatch, getState, rejectWithValue}) => {
    dispatch(isLoading());
    //body
    const body = JSON.stringify(newPost);
    
    return axios.post('/addpost', body, tokenConfig(getState))
        .then(res => {
            dispatch(createPost(res.data));
            dispatch(isLoaded());
            return res.data;
        })
        .catch(err => {
            dispatch(isLoaded());
            return rejectWithValue(err.response.data);
        })

});