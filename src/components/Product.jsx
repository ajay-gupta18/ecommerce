import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import ProductDetail from './sub-components/ProductDetail';
import { DataContext } from '../context/DataContext';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// import data from './data/data.json'

const Product = () => {
    const { data,deleteProduct } = useContext(DataContext);
    const handleDelete =(id) =>{
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    }
    return (
        <>
          
            <div className="card">
                {data.map((product, index) => (

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
                        <Link to={`/product/addProduct/${product.id}`}><button className="buy-button"><FaEdit/></button></Link>
                        <button onClick={(id)=>handleDelete(product.id)} className='buy-button'><MdDelete/></button>

                    </div>

                ))}

            </div></>
    )
}

export default Product
