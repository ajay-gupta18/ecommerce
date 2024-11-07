import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { TiShoppingCart } from "react-icons/ti";
import { UserContext } from '../../context/UserContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { data } = useContext(DataContext);
    const { addToCart } = useContext(UserContext)




    return (
        <div className="product-container">
            {data.map((product) => {
                if (id === product.id) {
                    return (
                        <div key={product.id} className="product-detail">
                            <h1>{product.title}</h1>
                            <div className='image-description-group'>
                                <img src={product.image} alt={product.title} />
                                <div>
                                <p>{product.description}</p>
                                <div className='price-rating'>
                                    <p className="price">Price : ${product.price}</p>
                                    <p className='rating-dt'>Rating : {product.rating}⭐</p>
                                </div>
                                <button className="buy-button" onClick={() => addToCart(product)}>
                                    <TiShoppingCart /> Add to cart
                                </button>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ProductDetail;
