import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import online from '../assets/online-shop.png'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const {user,logout } = useContext(UserContext)

 
  return (
    <div className='navbar'>
      <div className='icon'>
        <img src={online} alt="logo" />
      </div>
      <div className='tab-link'>
        <Link to='/'>Home</Link>
        <Link to='/product'>Products</Link>
      </div>
      <div className='product-link'>
      {token ? (
        <><Link to='/product/addProduct'><button>Add Product</button></Link>
      
          <button className='login' onClick={logout}>Logout</button></>
        ) : (
          <Link to='/loginPage'><button className='login'>Sign-up/Login</button></Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
