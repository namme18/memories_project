import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoaded, isLoading } from "../../postsReducer";
import { singlePost } from "../../postsReducer";
import axios from 'axios';

export const getOnePost = createAsyncThunk('getOnePost', async (id,{dispatch, rejectWithValue}) => {
    dispatch(isLoading());
    return axios.get(`/onepost/${id}`)
        .then(post => {
            dispatch(singlePost(post.data));
            return dispatch(isLoaded());
        })
        .catch(err =>{
            dispatch(isLoaded());
            return rejectWithValue(err);
        });
});