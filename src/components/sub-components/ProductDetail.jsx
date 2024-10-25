import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ product }) => {
    const { id } = useParams();
    console.log(product)

    return (
        <div className="product_container">
            {product.map((product) => {
                if (Number(id) == product.id) {
                    return (
                        <div className="product-detail">
                            <h1>{product.title}</h1>
                            <img src={product.image} alt={product.title} width="300px" height="300px" />
                            <p>{product.description}</p>
                            <p className="price">${product.price}</p>
                            <button className="buy-button">Buy now</button>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default ProductDetail;
