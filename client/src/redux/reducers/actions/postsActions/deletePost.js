import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deletedPost, isLoaded, isLoading } from '../../postsReducer';
import { tokenConfig } from '../tokenConfig';

export const deletePost = createAsyncThunk('deletePost', async(id, {dispatch, getState, rejectWithValue}) => {
                dispatch(isLoading());
    return axios.delete(`/delete/${id}`, tokenConfig(getState))
                .then(() => {
                    dispatch(deletedPost(id))
                    dispatch(isLoaded());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(isLoaded());
                    return rejectWithValue(err.response.data.msg);
                })
});