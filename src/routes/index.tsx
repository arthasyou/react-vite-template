import { createBrowserRouter } from "react-router";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

const router = createBrowserRouter([publicRoutes, protectedRoutes]);

export default router;
