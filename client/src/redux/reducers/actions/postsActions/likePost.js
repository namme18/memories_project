import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updatedPost } from '../../postsReducer';
import { tokenConfig } from '../tokenConfig';
import { clearErrors, getErrors } from '../../errorReducer';

export const likePost = createAsyncThunk('likePost', async(id, {dispatch, getState, rejectWithValue}) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    config.headers['authorization'] = getState().authReducer.token;

    return axios.patch(`/likepost/${id}`,config, tokenConfig(getState))
        .then(res => {
            dispatch(clearErrors());
            return dispatch(updatedPost(res.data))
        })
        .catch(err => {
            const errData = {
                msg: err.response.data.msg,
                status: err.response.status,
                id: err.response.data.id
            }
            dispatch(getErrors(errData));
            return rejectWithValue(err);
        })

})