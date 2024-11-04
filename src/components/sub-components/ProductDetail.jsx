import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { data } = useContext(DataContext);
    // console.log(data)
    return (

        <>
      
        <div className="product-container">
            {data.map((product) => {
                if (Number(id) == product.id) {
                    return (
                        <div key={product.id} className="product-detail">
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
        </>
    );
};

export default ProductDetail;
