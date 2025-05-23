import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import router from "./routes";
import "./index.css";
import "./i18n";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
