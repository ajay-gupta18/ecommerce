import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  id: "",
  fullname: "",
  email: "",
  cart: [],
  wishlist: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      const { id, email, cart, wishlist, password, fullname } = action.payload;
      state.id = id;
      state.email = email;
      state.fullname = fullname;
      state.cart = cart;
      state.wishlist = wishlist;
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((product) => product.id === item.id);
      if (!existingItem) {
        state.cart.push(item);
        toast.success("item added to cart successfully");
      } else {
        toast.error("item already exist");
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    removeItemFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
    },
    toggleItemToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlist.find(
        (product) => product.id === item.id
      );
      if (!existingItem) {
        state.wishlist.push(item);
        toast.success("item added to wishlist");
      } else {
        state.wishlist = state.wishlist.filter(
          (product) => product.id !== item.id
        );
        toast.success("item removed from wishlist");
      }
    },
  },
});

export const {
  loggedUser,
  removeItemFromCart,
  addItemToCart,
  toggleItemToWishlist,
  removeItemFromWishlist
} = usersSlice.actions;
export default usersSlice.reducer;
