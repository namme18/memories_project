import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isLoading, updatedPost, isLoaded } from '../../postsReducer';

export const updatePost = createAsyncThunk('updatePost', async({currentId, newData}, {dispatch, rejectWithValue}) => {
    dispatch(isLoading());
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify(newData);
    return axios
            .patch(`/update/${currentId}`, body, config)
            .then(res => {
                dispatch(updatedPost(res.data))
                dispatch(isLoaded());
            })
            .catch(err => {
                console.log(err);
                dispatch(isLoaded);
                return rejectWithValue(err.response);
            });

});