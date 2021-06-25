import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';


export default configureStore({
    reducer: {
        postsReducer: postsReducer,
        authReducer: authReducer,
        errorReducer: errorReducer,
    }
});