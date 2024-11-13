import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { IoMdRemoveCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../redux/slice/usersSlice";

const Wishlist = () => {
  const { usersData } = useContext(UserContext);
  const wishlistData = useSelector((state) => state.users.wishlist);
  const userId = useSelector((state) => state.users.id);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  if (!usersData) {
    return <div>Please login to see the wishlist</div>;
  }
  const handleRemove = async (id) => {
    dispatch(removeItemFromWishlist(id));

    try {
      let updatedWishlist = wishlistData.filter((item) => item.id !== id);
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
        throw new Error("Failed to update Wishlist");
      }
      console.log("Wishlist updated successfully!");
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  return (
    <div className="main-container">
      <div className="list-container">
        <h3 className="cart-heading">Shoping Cart</h3>
        <hr />
        <div className="cart-container">
          <ul>
            {wishlistData && wishlistData.length > 0 ? (
              wishlistData.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    <div className="title-price">
                      <Link to={`/product/${item.id}`} className="product-link">
                        <h3>{item.title}</h3>
                        <p>{item.description.slice(0, 28)}</p>
                        <p className="price">${item.price}</p>
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="buy-button"
                      >
                        <IoMdRemoveCircle />
                        <span>Remove</span>
                      </button>
                    </div>
                    <div className="img-div">
                      <img
                        src={item.image}
                        alt={item.title}
                        width="100px"
                        height="100px"
                      />
                    </div>
                  </div>
                  <hr />
                </li>
              ))
            ) : (
              <li>Your Wishlist is empty.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
