import { customersReducer } from "./customers-slice";

import { configureStore } from "@reduxjs/toolkit"



export const Reducer = configureStore({
    reducer: {
        customersReducer
    }
})