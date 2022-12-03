import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    payees: [],
    error: "",
    message: "",
};

export const createPayee = createAsyncThunk("payees/createPayee", (data) => {
    return axios
        .post(`/api/payees`, data)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const fetchPayees = createAsyncThunk("payees/fetchPayees", (queries) => {
    return axios
        .get(`/api/payees?search=${queries.search}`)
        .then(response => {
            const { payees } = response.data;
            return payees;
        });
})

export const findPayee = createAsyncThunk("payees/findPayee", (requestObj) => {
    const { id } = requestObj;
    // const { id, queries } = requestObj
    return axios
        .get(`/api/payees/${id}`)
        // .get(`/api/payees/${id}?since=${queries.since}&till=${queries.till}`)
        .then(response => {
            return response.data;
        });
})

export const updatePayee = createAsyncThunk("payees/updatePayee", (requestObj) => {
    const { id, data } = requestObj;
    return axios
        .put(`/api/payees/${id}`, data)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})

export const deletePayee = createAsyncThunk("payees/deletPayee", (id) => {
    return axios
        .delete(`/api/payees/${id}`)
        .then(response => {
            const { message } = response.data;
            return message;
        });
})


const payeesSlice = createSlice({
    name: "payees",
    initialState,
    extraReducers: builder => {
        //  CREATE
        builder.addCase(createPayee.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(createPayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(createPayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  FETCH ALL
        builder.addCase(fetchPayees.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(fetchPayees.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.payees = action.payload;
            state.error = "";
        });
        builder.addCase(fetchPayees.rejected, (state, action) => {
            state.loading = false;
            state.payees = [];
            state.error = action.error.message;
        })
        //  FIND PAYEE
        builder.addCase(findPayee.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(findPayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "";
            state.payees = action.payload;
            state.error = "";
        });
        builder.addCase(findPayee.rejected, (state, action) => {
            state.loading = false;
            state.payees = [];
            state.error = action.error.message;
        })
        //  UPDATE
        builder.addCase(updatePayee.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(updatePayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(updatePayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
        //  DELETE
        builder.addCase(deletePayee.pending, state => {
            state.message = "";
            state.error = "";
            state.loading = true;
        });
        builder.addCase(deletePayee.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = "";
        });
        builder.addCase(deletePayee.rejected, (state, action) => {
            state.loading = false;
            state.message = "";
            state.error = action.error.message;
        })
    }
})


export default payeesSlice.reducer;
