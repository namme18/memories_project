import { createSlice } from '@reduxjs/toolkit';

export const postsReducer = createSlice({
    name: 'postsReducer',
    initialState: {
        posts: [],
        msg:'',
        numberOfPage: null,
        currentPage: null,
        isLoading: false
    },
    reducers: {
        searchPost: (state, action) => {
            return {
                ...state,
                posts: action.payload,
                numberOfPage: null,
                currentPage:null
            }
        },

        loadPosts: (state, action) =>{
            return {
                ...state,
                posts: action.payload.data,
                numberOfPage: action.payload.numberOfPage,
                currentPage: action.payload.currentPage,
                msg: '',
            }
        },

        createPost: (state, action) => {
            return {
                ...state,
                posts: [
                    action.payload.newPost,
                    ...state.posts
                ],
                msg: action.payload.msg
            }
        },

        updatedPost: (state, action) => {
            return{
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post )
            }
        },

        deletedPost: (state, action) => {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        },

        isLoading: (state, action) => {
            return{
                ...state,
                isLoading: true
            }
        },

        isLoaded: (state, action) => {
            return{
                ...state,
                isLoading: false
            }
        }
    }
});

export const { loadPosts, createPost, updatedPost, deletedPost, isLoading, isLoaded, searchPost } = postsReducer.actions;
export default postsReducer.reducer;