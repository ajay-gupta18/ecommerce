import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  //fetch data
  const getData = async () => {
    await fetch("http://localhost:3000/products", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response));
  };

  useEffect(() => {
    if (data.length === 0) {
      getData();
      console.log("...fetching data");
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data,setData }}>
      {children}
    </DataContext.Provider>
  );
}
