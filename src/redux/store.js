import { configureStore } from "@reduxjs/toolkit";
import productData from "./slice/productSlice";


export const store=configureStore({
    reducer:{
        product:productData
    }
})