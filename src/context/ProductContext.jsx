import React, { createContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
export const ProductContext = createContext()

export const ProductProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [wishlist,setWishlist] = useState([]);
  

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data); 
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const addItemToWishList = async (item) => {
    // Check if the item already exists in the wishlist
    const exists = wishlist.some(wishItem => wishItem.id === item.id);
    if (exists) {
        alert("Product is already in the wishlist!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/wishlist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
            const updateWishList = await response.json();
            setWishlist((prevWishlist) => [...prevWishlist, updateWishList]);
            alert("Product added to wishlist!"); // Use a proper method to show messages
        } else {
            alert("Failed to add product to wishlist."); // Use a proper method to show messages
        }
    } catch (error) {
        console.error("Error while adding item to wishlist:", error);
    }
};

  useEffect(() => {
    getData(); 
  }, [cart]); 
  return (
    <ProductContext.Provider value={{ cart,getData,addItemToWishList,wishlist}}>
            {children}
        </ProductContext.Provider>
  )
}

export default ProductContext
