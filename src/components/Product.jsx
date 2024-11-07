import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { UserContext } from '../context/UserContext';
import { CiHeart } from 'react-icons/ci';
import { TiShoppingCart } from 'react-icons/ti';


const Product = () => {
    // const [onActive, setOnActive] = useState(false);
    const token = localStorage.getItem('token');
    const { data, deleteProduct } = useContext(DataContext);
    const {addToWishList,addToCart} = useContext(UserContext)

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    return (
        <div className='product-container'>
            {data && data.map((product, index) => (
                <div key={index} className="card">
                    <Link to={`/product/${product.id}`} className="product-link">
                        <img src={product.image} alt="product" className="product-image" />
                        <h3 className="product-name">{product.title.slice(0,20)+'...'}</h3>
                        <div className='price-rating'>
                            <p className="price">${product.price}</p>
                            <p className='rating'><span>Rating: </span>{product.rating}⭐</p>
                        </div>
                    </Link>
                    <div className='btn-group'>
                        <button className="wish-list" onClick={() => addToWishList(product)}>
                        <CiHeart />
                           Wishlist 
                        </button>
                        <button className="add-to-cart" onClick={() => addToCart(product)}>
                        <TiShoppingCart /> 
                        </button>
                        {/* {token && (
                            <div className="admin-buttons">
                                <Link to={`/product/editProduct/${product.id}`}>
                                    <button className="edit-button"><FaEdit /></button>
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className='delete-button'><MdDelete /></button>
                            </div>
                        )} */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
