import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from './sub-components/ProductDetail';
import { DataContext } from '../context/DataContext';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from "react-icons/fa";
import { TiHeart } from 'react-icons/ti';


const Product = () => {
    const [onActive,setOnActive] = useState(false)
    const token = localStorage.getItem('token');
    const { data, deleteProduct } = useContext(DataContext);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };
    const handleClick=()=>{
        if(onActive){setOnActive(true)}
        else{
            setOnActive(false)
        }
    }

    return (
        <div className='product-container'>
            {data.map((product, index) => (
                <div key={index} className="card">
                    <Link to={`/product/${product.id}`} className="product-link">
                        <img src={product.image} alt="product image" className="product-image" />
                        <h3 className="product-name">{product.title}</h3>
                        {/* <p className="product-description">{product.description}</p> */}
                        <div className='price-rating'>
                            <p className="price">${product.price}</p>
                            <p className='rating'><span>Rating : </span>{product.rating}</p>
                        </div>
                    </Link>
                    <div className='btn-group'>
                    <span className="wish-list" onClick={()=>handleClick()}>{onActive?<CiHeart/>:<FaHeart/>}</span>
                    {token && (
                        <div className="admin-buttons">
                            <Link to={`/product/editProduct/${product.id}`}><button className="edit-button"><FaEdit /></button></Link>
                            <button onClick={() => handleDelete(product.id)} className='delete-button'><MdDelete /></button>
                        </div>
                    )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
