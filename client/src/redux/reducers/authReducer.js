import { createSlice } from '@reduxjs/toolkit';


export const authReducer = createSlice({
    name:'authReducer',
    initialState: {
        user: JSON.parse(localStorage.getItem('result')),
        token: JSON.parse(localStorage.getItem('token')),
        isAuthenticated: false,
    },
    reducers: {
        loadUser: (state, action) => {
            localStorage.setItem('result', JSON.stringify(action.payload.result));
            localStorage.setItem('token' , JSON.stringify(action.payload.token))
            return {
                ...state,
                user: action.payload.result,
                token: action.payload.token,
                isAuthenticated: true,
            }
        },

        logoutUser: (state, action) => {
            localStorage.clear();
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
            }
        }
    }
});

export const { loadUser, logoutUser } = authReducer.actions;
export default authReducer.reducer;