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

  useEffect(() => {
    // Fetch data only once when the component mounts
    if (data.length === 0) {
      getData();
      console.log('...fetching data');
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
}
