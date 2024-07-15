import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTransactions = createAsyncThunk("customers/getAllTransactions", async () => {
    return await axios.get("https://bhaa-gg.github.io/RouteTaskApi/db.json").then(data => data).catch(err => err)
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
        //===========================   
        builder.addCase(getAllTransactions.fulfilled, (state, { payload }) => {
            state.transactions = payload.data.transactions;
            state.customers = payload.data.customers;
            state.customersTransactions = payload.data.customers?.map(customer => {
                const userTrans = payload.data.transactions?.filter(trans => trans.customer_id === customer.id)
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
