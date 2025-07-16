import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "./next-router-mock"; // Add this import

// ✅ Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_ZmxleGlibGUtemVicmEtMzguY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <RouterProvider>
          <App />
        </RouterProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);