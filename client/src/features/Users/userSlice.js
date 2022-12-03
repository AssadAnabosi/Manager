import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    user: null,
    success: true,
    message: "",
};

export const loginUser = createAsyncThunk("users/loginUser", (data) => {
    return axios
        .post("/api/login", data)
        .then(response => {
            return response.data;
        });
})

export const logoutUser = createAsyncThunk("users/logoutUser", () => {
    return axios
        .get("/api/logout")
        .then(response => {
            return response.data;
        });
})

export const getUser = createAsyncThunk("users/fetchUserData", () => {
    return axios
        .get("/api/user")
        .then(response => {
            const { user } = response.data;
            return user;
        });
})
export const setUserPermissions = createAsyncThunk("users/setPermissions", (reqObj) => {
    const { permission, id } = reqObj;
    return axios
        .patch(`/api/updatePermissions/${id}`, { permission: permission })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const setUserPassword = createAsyncThunk("users/setPassword", (reqObj) => {
    const { password, id } = reqObj;
    return axios
        .patch(`/api/changePassword/${id}`, { password: password })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        //  loginUser
        builder.addCase(loginUser.pending, state => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.success = action.payload.success;
            state.message = action.payload.message
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.success = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  logoutUser
        builder.addCase(logoutUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.message = action.payload.message;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message;
        })
        //  getUser
        builder.addCase(getUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.message = "";
            state.error = action.error.message;
        })
        //  SET PERMISSIONS
        builder.addCase(setUserPermissions.pending, state => {
            state.loading = true;
        });
        builder.addCase(setUserPermissions.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(setUserPermissions.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  SET PASSWORD
        builder.addCase(setUserPassword.pending, state => {
            state.loading = true;
        });
        builder.addCase(setUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(setUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})

export const selectUser = (state) => state.users.user;
export default userSlice.reducer;
