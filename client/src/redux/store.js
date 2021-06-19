import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';


export default configureStore({
    reducer: {
        postsReducer: postsReducer,
        authReducer: authReducer
    }
});