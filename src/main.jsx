import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <UserProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </UserProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
