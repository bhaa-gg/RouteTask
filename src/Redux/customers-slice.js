import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCustomers = createAsyncThunk("customers/getAllCustomers", async () => {
    return await axios.get("http://localhost:8000/customers").then(data => data).catch(err => err)
})

export const getAllTransactions = createAsyncThunk("customers/getAllTransactions", async () => {
    return await axios.get("http://localhost:8000/transactions").then(data => data).catch(err => err)
})


export const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: null,
        transactions: null,
        userCart: null,
        customersTransactions: null,
        loading: false,
    },


    reducers: {
        setChartData: (state, { payload }) => {
            state.userCart = payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllCustomers.fulfilled, (state, { payload }) => {
            state.customers = payload.data;
            state.loading = false;
        })
        builder.addCase(getAllCustomers.rejected, (state, { payload }) => {
            state.customers = null;
            state.loading = false;

        })
        builder.addCase(getAllCustomers.pending, (state, { payload }) => {
            state.customers = null;
            state.loading = true;

        })
        //===========================   
        builder.addCase(getAllTransactions.fulfilled, (state, { payload }) => {
            state.transactions = payload.data;
            state.customersTransactions = state?.customers?.map(customer => {
                const userTrans = payload?.data?.filter(trans => trans.customer_id == customer.id)
                return {
                    id: customer.id,
                    name: customer.name,
                    userTrans
                }
            })
            state.loading = false;
        })
        builder.addCase(getAllTransactions.rejected, (state, { payload }) => {
            state.transactions = null;
            state.loading = false;

        })
        builder.addCase(getAllTransactions.pending, (state, { payload }) => {
            state.transactions = null;
            state.loading = true;

        })
    }
})


export const customersReducer = customersSlice.reducer
export const { setChartData } = customersSlice.actions
