import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext"; // 👈 add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>   {/* 👈 wrap App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);