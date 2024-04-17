import { BaseUrl } from "@/components/const/urls";
import Axios from "@/components/utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
    const res = await axios.post(BaseUrl + "login/", data)
    return res.data
})

export const getUserDetails = createAsyncThunk("user/getUserDetails", async (id) => {
    const res = await Axios.get(BaseUrl + `user/${id}/`)
    console.log("user detailsssgfhjfhjt :", res.data);
    return res.data
})

export const updateProfile = createAsyncThunk("user/updateProfile", async ({user, profile}) => {
    // const user = data.pop('user')
    // console.log("data to update",data);
    const res = await Axios.put(BaseUrl + `profile/${user}/`,profile)
    console.log("profile updated :", res.data);
    return res.data
})

const initialState = {
    user: '',
    token: '',
    userDetails: '',
    register_id: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCleanUser: (state, action) => {
            state.user = ''
            state.token = ''
            state.register_id = ''
            state.userDetails = ''
            console.log("state", state);
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("SignIn success, response: ", action.payload);
                state.token = action.payload.access
                console.log("token :", state.token);
                localStorage.setItem('token', action.payload.access)
                const user_id = jwtDecode(state.token).user_id
                state.user = user_id
                console.log("user : ", user_id);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("SignIn rejected: ", action.error);
            })
            // getUserDetails
            .addCase(getUserDetails.fulfilled, (state, action) => {
                console.log("user details fetched : ", action.payload);
                state.userDetails = {
                    username: action.payload.user.username,
                    email: action.payload.user.email,
                    name: action.payload.user.first_name,
                    profile: action.payload.profile,
                }
                console.log("user details on store", state.userDetails);
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                console.log("failed to fetch user details : ", action.error);
            })
            // profile update
            .addCase(updateProfile.fulfilled,(state, action)=>{
                state.userDetails.profile = action.payload.profile
                console.log("profile data updated on extraReducers :",action.payload);
            })      
    },
})

export const { setCleanUser } = userSlice.actions;
export default userSlice.reducer;
