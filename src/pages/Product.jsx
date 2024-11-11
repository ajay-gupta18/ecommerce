import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productSlice";
import { fetchusers, addToCartAsync } from "../redux/slice/usersSlice";
import { toast } from "react-toastify";

const Product = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("usersData")); // Parse user data from localStorage
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  const singleUsers = useSelector((state) => state.users.users);
  const { usersData, toggleWishlist } = useContext(UserContext);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchusers());
  }, [dispatch]);

  const isProductInWishlist = (product) => {
    return usersData.wishlist.some((item) => item.id === product.id);
  };

  const handleAddToCart = (product) => {
    console.log("handleAddToCart called with product:", product); // Log to ensure function is called
    const foundUser = singleUsers && singleUsers.find((el) => el.id === userData.id);
    if (!foundUser) {
      toast.error("User not found");
      return;
    }
    console.log("Dispatching addToCartAsync with userId:", userData.id, "and product:", product); // Log data being dispatched
    dispatch(addToCartAsync({ userId: userData.id, item: product }));
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
                onClick={() => handleAddToCart(product)}
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
