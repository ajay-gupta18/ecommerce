// DataContext.js
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const getData = () => {
    fetch('http://localhost:3000/products', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response));
  };

  const addProduct = (newProduct) => {
    setData((prevData) => [...prevData, newProduct]);
    // Optionally, you can also send this new product to the server
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  };

  useEffect(() => {
    // Fetch data only once when the component mounts
    if (data.length === 0) {
      getData();
      console.log('...fetching data');
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data,addProduct }}>
      {children}
    </DataContext.Provider>
  );
}
