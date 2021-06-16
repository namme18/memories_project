import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deletedPost, isLoaded, isLoading } from '../../postsReducer';

export const deletePost = createAsyncThunk('deletePost', async(id, {dispatch, rejectWithValue}) => {
                dispatch(isLoading());
    return axios.delete(`/delete/${id}`)
                .then(() => {
                    dispatch(deletedPost(id))
                    dispatch(isLoaded());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(isLoaded);
                    return rejectWithValue(err.response.data.msg);
                })
});