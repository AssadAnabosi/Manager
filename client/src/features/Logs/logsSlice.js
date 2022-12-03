import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    logs: [],
    error: "",
    message: "",
};

export const fetchLogs = createAsyncThunk("logs/fetchLogs", (queries) => {
    return axios
        .get(`/api/logs?since=${queries.since}&till=${queries.till}&search=${queries.search}`)
        .then(response => {
            const { logs, paymentsSum, OTVSum, count } = response.data;
            return { logs, paymentsSum, OTVSum, count };
        });
})

export const findLog = createAsyncThunk("logs/findLog", (id) => {
    return axios
        .get(`/api/logs/${id}`)
        .then(response => {
            const { log } = response.data;
            return log;
        });
})

export const createLog = createAsyncThunk("logs/createLog", (data) => {
    data.date = new Date(data.date);
    return axios
        .post(`/api/logs`, {
            log: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const updateLog = createAsyncThunk("logs/updateLog", (requestObj) => {
    const { id, data } = requestObj;
    return axios
        .put(`/api/logs/${id}`, {
            log: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const deleteLog = createAsyncThunk("logs/deleteLog", (id) => {
    return axios
        .delete(`/api/logs/${id}`)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

const logsSlice = createSlice({
    name: "logs",
    initialState,
    extraReducers: builder => {
        //  CREATE
        builder.addCase(createLog.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(createLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createLog.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  Fetch All Logs
        builder.addCase(fetchLogs.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(fetchLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.logs = action.payload;
            state.error = "";
        });
        builder.addCase(fetchLogs.rejected, (state, action) => {
            state.loading = false;
            state.logs = [];
            state.message = "";
            state.error = action.error.message;
        })
        //  Find Log
        builder.addCase(findLog.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(findLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.logs = action.payload;
            state.error = "";
        });
        builder.addCase(findLog.rejected, (state, action) => {
            state.loading = false;
            state.logs = [];
            state.message = "";
            state.error = action.error.message;
        })
        //  UPDATE
        builder.addCase(updateLog.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(updateLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updateLog.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deleteLog.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(deleteLog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deleteLog.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})


export default logsSlice.reducer;
