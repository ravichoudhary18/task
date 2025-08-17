import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "./context/MainContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainProvider>
      <ToastContainer />
      <App />
    </MainProvider>
  </StrictMode>,
);
