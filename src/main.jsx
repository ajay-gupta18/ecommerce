import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
// import { ProductProvider } from './context/ProductContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
