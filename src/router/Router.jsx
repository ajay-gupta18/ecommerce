import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import Product from '../components/Product';
import ProductDetail from '../components/sub-components/ProductDetail';
import Login from '../components/LoginPage';
import SignupForm from '../components/SignupForm';
import ProtectedRoute from './ProtectedRoute';
import Cart from '../components/sub-components/Cart';
import Wishlist from '../components/sub-components/Wishlist';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signupPage' element={<SignupForm />} />
      <Route path='/loginPage' element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/cart' element={<Cart/>}/>
        <Route path='/product/wishlist' element={<Wishlist/>}/>
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
