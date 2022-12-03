import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    cheques: [],
    error: "",
    message: "",
};

export const createCheque = createAsyncThunk("cheques/createCheque", (data) => {
    data.dueDate = new Date(data.dueDate);
    return axios
        .post(`/api/cheques`, { cheque: data })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const fetchCheques = createAsyncThunk("cheques/fetchCheques", (queries) => {
    return axios
        .get(`/api/cheques?since=${queries.since}&till=${queries.till}&search=${queries.search}`)
        .then(response => {
            const { cheques, sum } = response.data;
            return { cheques, sum };
        });
})

export const findCheque = createAsyncThunk("cheques/findCheque", (id) => {
    return axios
        .get(`/api/cheques/${id}`)
        .then(response => {
            const { cheque } = response.data;
            return cheque;
        });
})

export const updateCheque = createAsyncThunk("cheques/updateCheque", (requestObj) => {
    const { id, data } = requestObj;
    return axios
        .put(`/api/cheques/${id}`, {
            cheque: data
        })
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const deleteCheque = createAsyncThunk("cheques/deleteCheque", (id) => {
    return axios
        .delete(`/api/cheques/${id}`)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})


const chequesSlice = createSlice({
    name: "cheques",
    initialState,
    extraReducers: builder => {
        //  createCheque
        builder.addCase(createCheque.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(createCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createCheque.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //  fetchCheques
        builder.addCase(fetchCheques.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(fetchCheques.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.cheques = action.payload;
            state.error = "";
        });
        builder.addCase(fetchCheques.rejected, (state, action) => {
            state.loading = false;
            state.cheques = [];
            state.message = "";
            state.error = action.error.message;
        })
        //  findCheque
        builder.addCase(findCheque.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(findCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.cheques = action.payload;
            state.error = "";
        });
        builder.addCase(findCheque.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.cheques = [];
            state.error = action.error.message;
        })
        //  UPDATE
        builder.addCase(updateCheque.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(updateCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updateCheque.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deleteCheque.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(deleteCheque.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deleteCheque.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })

    }
})


export default chequesSlice.reducer;
