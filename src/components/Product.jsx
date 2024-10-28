import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import ProductDetail from './sub-components/ProductDetail';
import { DataContext } from '../context/DataContext';
// import data from './data/data.json'

const Product = () => {
    const { data } = useContext(DataContext);
    return (
        <div className="card">
            {data.map((product,index) => (
                
                  <div key={index} className="product-description">
                   <Link to={`/product/${product.id}`}>
                        <h3 className="product-name">{product.title}</h3>
                        <img src={product.image} alt="product image" width="200px" height="200px" />
                        <ul key={product.id}>
                            <li>{product.description}</li>
                        </ul>
                        <p className="price">${product.price}</p>
                    <button className="buy-button">Buy now</button>
                    </Link>
                    </div>
                
            ))}

        </div>
    )
}

export default Product
