import type { RouteObject } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/protected/Home";
import About from "@/pages/protected/About";
import LogoutPage from "@/pages/protected/Logout";

export const protectedRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      index: true, // Default path `/`
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
  ],
};
