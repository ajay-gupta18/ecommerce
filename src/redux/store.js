import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productData from "./slice/productSlice";
import userData from "./slice/usersSlice";

const rootReducer = combineReducers({
  product: productData,
  users: userData,
});

export const store = configureStore({
  reducer: rootReducer,
});
