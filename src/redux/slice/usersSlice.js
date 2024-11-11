import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsersData = createAsyncThunk(
  "users/fetchUsersData",
  async () => {
    const res = await fetch("http://localhost:3000/users");
    console.log(res);
    return res.json();
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: initialStateValue,
  reducers: {
    setUsersData: (state, action) => {
        state.users = action.payload;
      },
    addToCart:{
        
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      }).addCase(fetchUsersData.rejected,(state,action)=>{
        state.status='rejected';
        state.error= action.error.message;
      })
  },
});
