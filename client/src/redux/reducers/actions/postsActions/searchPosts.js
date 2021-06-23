import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { searchPost } from "../../postsReducer";
import { isLoaded, isLoading } from "../../postsReducer";


export const searchPosts = createAsyncThunk('searchPosts', async({search, Tags}, {dispatch, rejectWithValue}) => {
    dispatch(isLoading());
    return axios.get(`/search?searchQuery=${search || 'none'}&tags=${Tags || 'none'}`)
        .then(res => {
            dispatch(searchPost(res.data));
            dispatch(isLoaded());
        })
        .catch(err => {
            console.log(err)
            dispatch(isLoaded());
            return rejectWithValue(err);
        })
})