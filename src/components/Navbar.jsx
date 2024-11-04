import React from 'react'
import { Link } from 'react-router-dom'
import online from '../assets/online-shop.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='icon'>
        <img src={online} alt="logo"/>
      </div>
      <div className='tab-link'>
        <Link to='/'>Home</Link>
        <Link to='/product'>Products</Link>
      </div>
      <div className='product-link'>
        <Link to='/product/addProduct'><button>Add Product</button></Link>
        <Link to='/loginPage'><button className='login'>Login</button></Link>
      </div>
    </div>
  )
}

export default Navbar
