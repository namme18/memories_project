import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPost, isLoaded, isLoading } from '../../postsReducer';
import axios from 'axios';

export const createNewPost = createAsyncThunk('createNewPost', async (newPost, {dispatch, rejectWithValue}) => {
    dispatch(isLoading());
    //config
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    //body
    const body = JSON.stringify(newPost);
    
    return axios.post('/addpost', body, config)
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