import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { DataContext } from '../context/DataContext';
import { UserContext } from "../context/UserContext";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productSlice";
const Product = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  console.log(productData);
  const { usersData, toggleWishlist, addToCart } = useContext(UserContext);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const isProductInWishlist = (product) => {
    return usersData.wishlist.some((item) => item.id === product.id);
  };

  return (
    <div className="product-container">
      {productData &&
        productData.map((product, index) => (
          <div key={index} className="card">
            <a href={`/product/${product.id}`} className="product-link">
              <img
                src={product.image}
                alt="product"
                className="product-image"
              />
              <h3 className="product-name">
                {product.title.slice(0, 20) + "..."}
              </h3>
              <div className="price-rating">
                <p className="price">${product.price}</p>
                <p className="rating">
                  <span>Rating: </span>
                  {product.rating}⭐
                </p>
              </div>
            </a>
            <div className="btn-group">
              <button
                className="wish-list"
                onClick={() => toggleWishlist(product)}
              >
                {isProductInWishlist(product) ? <FaHeart /> : <FaRegHeart />}
                Wishlist
              </button>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                <TiShoppingCart />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Product;
