import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const navigate = useNavigate()
  const [data, setData] = useState([]);


  //fetch data
  const getData = async () => {
    await fetch('http://localhost:3000/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response));
  };

  //addproduct
  const addProduct = async (newProduct) => {
    setData((prevData) => [...prevData, newProduct]);
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(newProduct),
    });
  };

  useEffect(() => {

    if (data.length === 0) {
      getData();
      console.log('...fetching data');
    }
  }, [data]);

  //edit product
  const editProduct = async (updatedProduct, id) => {
    setData((prevData) =>
      prevData.map((product) => (product.id === id ? updatedProduct : product))
    );

    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    }).then(() => {
      navigate('/product');
    });
  };

  //delete data 
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product: ' + response.statusText);
      }

      // Update state to remove the deleted product
      setData((prevData) => prevData.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  return (
    <DataContext.Provider value={{ data, addProduct, editProduct,deleteProduct }}>
      {children}
    </DataContext.Provider>
  );
}
