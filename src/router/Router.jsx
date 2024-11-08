import React from "react";
import { Routes, Route } from "react-router-dom";


import Product from "../pages/Product";
import ProductDetail from "../components/sub-components/ProductDetail";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../components/sub-components/Cart";
import Wishlist from "../components/sub-components/Wishlist";
import Home from "../pages/Home";
import SignupForm from "../pages/SignupForm";
import LoginPage from "../pages/LoginPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signupPage" element={<SignupForm/>} />
      <Route path="/loginPage" element={<LoginPage/>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/cart" element={<Cart />} />
        <Route path="/product/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
