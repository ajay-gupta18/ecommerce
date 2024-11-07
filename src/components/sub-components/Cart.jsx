import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {
  const { usersData, removeFromCart } = useContext(UserContext);
  const handleRemove = (id) => {
    removeFromCart(id)
  }
  if (!usersData) {
    return <div>Please log in to see your cart.</div>;
  }

  return (
    <div className='main-container'>
      <div className='list-container'>
        <h3 className='cart-heading'>Shoping Cart</h3>
        <hr />
        <div className="cart-container">
          <ul>
            {usersData.cart && usersData.cart.length > 0 ? (
              usersData.cart.map((item) => (
                <li key={item.id} >
                  <div className="cart-item">
                    <div className='title-price'>
                  <Link to={`/product/${item.id}`} className="product-link">
                      <h3>{item.title}</h3>
                      <p>{item.description.slice(0, 120)+'...'}</p>
                      </Link>
                      <div className='price-btn'><p className="price">${item.price}</p>
                        <button onClick={() => handleRemove(item.id)} className='buy-button'
                        ><MdOutlineRemoveShoppingCart />
                          <span>Remove</span></button></div>
                    </div>
                    <div className='img-div'>
                      <img src={item.image} alt={item.title} width="100px" height="100px" />
                    </div>
                  </div>
                  <hr />
                </li>
              ))
            ) : (
              <li>Your cart is empty.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
