import React, { useContext, useEffect } from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../../redux/slice/usersSlice';
 // Import the remove action

const Cart = () => {
  const cartData = useSelector((state) => state.users.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id)); 
  };

  if (!cartData) {
    return <div>Please log in to see your cart.</div>;
  }

  return (
    <div className='main-container'>
      <div className='list-container'>
        <h3 className='cart-heading'>Shopping Cart</h3>
        <hr />
        <div className="cart-container">
          <ul>
            {cartData && cartData.length > 0 ? (
              cartData.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    <div className='title-price'>
                      <Link to={`/product/${item.id}`} className="product-link">
                        <h3>{item.title}</h3>
                        <p>{item.description.slice(0, 120) + '...'}</p>
                      </Link>
                      <div className='price-btn'>
                        <p className="price">${item.price}</p>
                        <button onClick={() => handleRemove(item.id)} className='buy-button'>
                          <MdOutlineRemoveShoppingCart />
                          <span>Remove</span>
                        </button>
                      </div>
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
