// src/routes/index.tsx
import { createBrowserRouter } from "react-router";
import { authRoutes } from "./authRoutes";
import { publicRoutes } from "./publicRoutes";

const router = createBrowserRouter([publicRoutes, authRoutes]);

export default router;
