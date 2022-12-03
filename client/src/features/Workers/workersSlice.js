import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    workers: [],
    error: "",
    message: "",
};

export const createWorker = createAsyncThunk("workers/createWorker", (data) => {
    return axios
        .post(`/api/register`, data)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const fetchWorkers = createAsyncThunk("workers/fetchWorkers", (queries) => {
    return axios
        .get(`/api/workers?search=${queries.search}`)
        .then(response => {
            const { workers } = response.data;
            return workers;
        });
})

export const findWorker = createAsyncThunk("workers/findWorker", (requestObj) => {
    const { id } = requestObj;
    // const { id, queries } = requestObj;
    return axios
        .get(`/api/workers/${id}`)
        // .get(`/api/workers/${id}?since=${queries.since}&till=${queries.till}`)
        .then(response => {
            return response.data;
        });
})

export const updateWorker = createAsyncThunk("workers/updateWorker", (requestObj) => {
    const { id, data } = requestObj;
    return axios
        .put(`/api/workers/${id}`, data)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const deleteWorker = createAsyncThunk("workers/deletWorker", (id) => {
    return axios
        .delete(`/api/workers/${id}`)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})


const workersSlice = createSlice({
    name: "workers",
    initialState,
    extraReducers: builder => {
        //  CREATE
        builder.addCase(createWorker.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(createWorker.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createWorker.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  FETCH ALL
        builder.addCase(fetchWorkers.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(fetchWorkers.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.workers = action.payload;
            state.error = "";
        });
        builder.addCase(fetchWorkers.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.workers = [];
            state.error = action.error.message;
        })
        //  FETCH USER
        builder.addCase(findWorker.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(findWorker.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.workers = action.payload;
            state.error = "";
        });
        builder.addCase(findWorker.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.workers = [];
            state.error = action.error.message;
        })
        //  UPDATE
        builder.addCase(updateWorker.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(updateWorker.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updateWorker.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deleteWorker.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(deleteWorker.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deleteWorker.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})


export default workersSlice.reducer;
