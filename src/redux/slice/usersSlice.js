import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const fetchusers = createAsyncThunk("users/fetchusers", async () => {
  const res = await fetch("http://localhost:3000/users");
  const data=await res.json();
  return data;
});

export const addToCartAsync = createAsyncThunk(
  "users/addToCart",
  async ({ userId, item }) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();

    const updatedUser = {
      ...user,
      cart: [...(user.cart || []), item],
    };

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: updatedUser.cart }),
    });

    return updatedUser;
  }
);


export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          cart: [...(state.users[userIndex].cart || []), action.payload.item]
        };
      }
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchusers.pending, (state) => {
      state.users = [];
    });
    builder.addCase(fetchusers.fulfilled, (state, action) => {
      state.users = [...action.payload];
    });
    builder.addCase(fetchusers.rejected, (state) => {
      state.users = [];
    }).addCase(addToCartAsync.fulfilled, (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
  },
});
export const {addToCart}=usersSlice.actions;
export default usersSlice.reducer;