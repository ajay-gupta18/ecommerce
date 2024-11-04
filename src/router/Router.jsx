import React from 'react'
import {Routes, Route } from 'react-router-dom'

import Home from '../components/Home'
import Product from '../components/Product'
import ProductDetail from '../components/sub-components/ProductDetail'
import AddProduct from '../components/sub-components/AddProduct'
import Login from '../components/LoginPage'
import SignupForm from '../components/SignupForm'
const Router = () => {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route path='/product/addProduct' element={<AddProduct />} />
        <Route path='/product/addProduct/:id' element={<AddProduct />} />
        <Route path='/signupPage' element={<SignupForm/>}/>
        <Route path='/loginPage' element={<Login/>}/>
      </Routes>
    
  )
}

export default Router
