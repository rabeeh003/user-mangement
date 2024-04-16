import { configureStore } from "@reduxjs/toolkit";
import themReducer from "./Them"
import userReducer from "./User"
export const store = configureStore({
    reducer: {
        them: themReducer,
        user: userReducer,
    }
})