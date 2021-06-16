import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updatedPost } from '../../postsReducer';

export const likePost = createAsyncThunk('likePost', async(id, {dispatch, rejectWithValue}) => {

    return axios.patch(`/likepost/${id}`)
        .then(res => {
            return dispatch(updatedPost(res.data))
        })
        .catch(err => {
            return rejectWithValue(err);
        })

})