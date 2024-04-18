import { BaseUrl } from "@/components/const/urls"
import AxiosAdmin from "@/components/utils/axiosAdmin"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const initialState = {
    admin: '',
    token: '',
    // users: [],
}

export const adminLogin = createAsyncThunk("admin/adminLogin", async (data) => {
    const res = await axios.post(BaseUrl + 'admin/', data)
    console.log(" res ", res.data.access)
    return res.data.access
})

export const editUserDetails = createAsyncThunk("admin/editUserDetails", async ({id, data})=> {
    const res = await AxiosAdmin.patch(BaseUrl+`user/update/${id}`,data)
    return res.data
}) 

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCleanAdmin: (state, action) => {
            state.admin = ''
            state.token = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // loginAdmin
            .addCase(adminLogin.fulfilled, (state, action) => {
                console.log("admin login success, response: ", action.payload);
                state.token = action.payload
                console.log("admin token :", state.token);
                localStorage.setItem('admin-token', action.payload)
                const admin_id = jwtDecode(state.token).user_id
                state.admin = admin_id
                console.log("admin id : ", admin_id);
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log("admin login rejected: ", action.error);
            })
    }
})

export const { setCleanAdmin } = adminSlice.actions
export default adminSlice.reducer