import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoaded, isLoading, loadPosts } from '../../postsReducer';
import axios from 'axios';

export const getAllPosts = createAsyncThunk('getAllPosts', async (page, { getState, dispatch, rejectWithValue }) => {
    dispatch(isLoading());
    return axios
      .get(`/allposts?page=${page}`)
      .then(res => {
        dispatch(loadPosts(res.data));
        dispatch(isLoaded());
      })
      .catch(err => {
        dispatch(isLoaded());
        return rejectWithValue(err.message);
      });
  }
);
