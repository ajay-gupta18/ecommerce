import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/ProductContext';

const Cart = () => {
  const {cart,getData} = useContext(ProductContext)



  return (
    <div className='main-container'>
      <h3 className='cart-heading'>Cart</h3>
      <div className="cart-container">
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} width="100px" height="100px" />
              <p className="price">${item.price}</p>
            </li>
          ))}
        </ul>
      </div></div>
  );
};

export default Cart;
