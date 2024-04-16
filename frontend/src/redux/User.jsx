import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.type == "logout") {
                localStorage.removeItem('user')
                state.user = ''
            } else {
                const exUser = localStorage.getItem('user')
                if (exUser) {
                    state.user = exUser
                } else {
                    state.user = action.payload
                }
            }
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
