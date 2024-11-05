import React, { createContext, useEffect, useState } from 'react'

export const ProductContext = createContext()

export const ProductProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data); // Directly set the cart data
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    getData(); 
  }, [cart]); 
  return (
    <ProductContext.Provider value={{ cart,getData}}>
            {children}
        </ProductContext.Provider>
  )
}

export default ProductContext
