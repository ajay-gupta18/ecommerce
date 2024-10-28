import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='icon'>
        <img src="https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg" alt="logo"/>
      </div>
      <div className='tab-link'>
        <Link to='/'>Home</Link>
        <Link to='/product'>Products</Link>
      </div>
      <div className='product-link'>
        <Link to='/product/addProduct'><button>Add Product</button></Link>
      </div>
    </div>
  )
}

export default Navbar
