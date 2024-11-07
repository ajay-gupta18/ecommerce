import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import online from '../assets/online-shop.png';
import { UserContext } from '../context/UserContext';
import { BsCart } from "react-icons/bs";
import { FaHeart } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons

const Navbar = () => {
  const token = localStorage.getItem('token');
  const { usersData, logout } = useContext(UserContext);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistcount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    setCartCount(usersData.cart.length);
    setWishlistcount(usersData.wishlist.length);
  }, [usersData]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className='icon'>
        <img src={online} alt="logo" />
        <Link to='/'><span className='permanent-marker-regular'>SpiderCraftStore.com</span></Link>
      </div>
      <div className={`product-link ${isMobileMenuOpen ? 'open' : ''}`}>
        {token ? (
          <>
            <div className='nav-single-btn'>
              <Link to='/product'>
                <AiFillProduct />
                <span>Products</span>
              </Link>
            </div>
            <div className='nav-single-btn'>
              <Link to='/product/cart'>
                <div style={{ position: 'relative' }}>
                  <BsCart /><sup style={{ position: "absolute", top: '0px', right: '-9px', borderRadius: '50%', color: '#F3A847', padding: '0px 3px' }}>{cartCount}</sup>
                </div>
                <span>Cart</span>
              </Link>
            </div>
            <div className="nav-single-btn">
              <Link to='/product/wishlist'>
                <div style={{ position: 'relative' }}>
                  <FaHeart />
                  <sup style={{ position: "absolute", top: '0px', right: '-10px', borderRadius: '50%', color: '#F3A847', padding: '0px 3px' }}>{wishlistCount}</sup>
                </div>
                <span>WishList</span>
              </Link>
            </div>
            <button className='login' onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to='/loginPage'><button className='login'>Login</button></Link>
        )}
      </div>
      <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}

export default Navbar;
