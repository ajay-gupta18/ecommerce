import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import online from '../assets/online-shop.png'
import { UserContext } from '../context/UserContext'
import { TiShoppingCart } from "react-icons/ti";
import ProductContext from '../context/ProductContext';

const Navbar = () => {
  const token = localStorage.getItem('token')
  const { user, logout } = useContext(UserContext)
  const { cart } = useContext(ProductContext)

  const [count,setCount] = useState(0)
  useEffect(() => {
    setCount(cart.length);
  }, [cart]);
 

  return (
    <div className='navbar'>
      <div className='icon'>
        <img src={online} alt="logo" />
        <Link to='/'><span>SpiderCraftStore.com</span></Link>
      </div>

      <div className='product-link'>
        <div className='tab-link'>

          {token ? (
            <>
              <Link to='/product/cart'><span className='cart' style={{fontSize:'20px'}}><TiShoppingCart/><sup>{count}</sup></span></Link>
              <Link to='/product'>Products</Link>
              <Link to='/product/addProduct'><button>Add Product</button></Link>

              <button className='login' onClick={logout}>Logout</button></>
          ) : (
            <Link to='/loginPage'><button className='login'>Login</button></Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
