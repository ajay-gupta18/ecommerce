import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { TiShoppingCart } from "react-icons/ti";

const ProductDetail = () => {
    const { id } = useParams();
    const { data } = useContext(DataContext);
    const [addProductCart, setAddProductCart] = useState([]);

    const handleCart = async (product) => {
        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product) // Send the product details to the server
            });

            if (response.ok) {
                // Assuming the response contains the updated cart
                const updatedCart = await response.json();
                setAddProductCart(updatedCart);
                alert("Product added to cart!");
            } else {
                alert("Failed to add product to cart.");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred while adding the product to the cart.");
        }
    };

    return (
        <div className="product-container">
            {data.map((product) => {
                if (id === product.id) {
                    return (
                        <div key={product.id} className="product-detail">
                            <h1>{product.title}</h1>
                            <img src={product.image} alt={product.title} width="300px" height="300px" />
                            <p>{product.description}</p>
                            <p className="price">${product.price}</p>
                            <button className="buy-button" onClick={() => handleCart(product)}>
                                <TiShoppingCart /> Add to cart
                            </button>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ProductDetail;
