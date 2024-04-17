import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
    const res = await axios.post("http://127.0.0.1:8000/api/account/login/", data)
    return res.data
})

export const registerUser = createAsyncThunk("user/registerUser", async (data) => {
    const res = await axios.post("http://127.0.0.1:8000/api/account/signup/", data)
    return res.data
})

const initialState = {
    user: '',
    token: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCleanUser: (state, action) => {
            state.user = ''
            state.token = ''
            console.log("state", state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("SignIn success, response: ", action.payload);
                state.token = action.payload.access
                console.log("token :", state.token);
                const user_id = jwtDecode(state.token).user_id
                state.user = user_id
                console.log("user : ", user_id);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("SignIn rejected: ", action.error);
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("User register rejected: ", action.error);
            })

    },
})

export const { setCleanUser } = userSlice.actions;
export default userSlice.reducer;
