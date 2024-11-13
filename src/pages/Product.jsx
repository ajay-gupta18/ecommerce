import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productSlice";
import { addItemToCart, toggleItemToWishlist } from "../redux/slice/usersSlice";

const Product = () => {
  const token = localStorage.getItem("token");
  // const [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);
  const wishlistData = useSelector((state) => state.users.wishlist);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const isWishlistItemExist = (productId) => {
    return wishlistData.some((item) => item.id === productId);
  };

  const handleWishlistToggle = async (product) => {
    dispatch(toggleItemToWishlist(product));
    try {
      let updatedWishlist;
      if (isWishlistItemExist(product.id)) {
        updatedWishlist = user.wishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        updatedWishlist = [...user.wishlist, product];
      }
      const updateResponse = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            wishlist: updatedWishlist,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update wishlist");
      }
      console.log("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleAddToCart = async (product) => {
    dispatch(addItemToCart(product));
    try {
      const updatedCart = [...user.cart, product];
      const updateResponse = await fetch(
        `http://localhost:3000/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            cart: updatedCart,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update cart");
      }
      toast("Cart updated successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="product-container">
      {productData &&
        productData.map((product, index) => (
          <div key={index} className="card">
            <Link to={`/product/${product.id}`} className="product-link">
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
            </Link>
            <div className="btn-group">
              <button
                className="wish-list"
                onClick={() => handleWishlistToggle(product)}
              >
                {isWishlistItemExist(product.id) ? <FaHeart /> : <FaRegHeart />}
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
