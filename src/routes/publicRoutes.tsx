import type { RouteObject } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/public/Login";

export const publicRoutes: RouteObject = {
  path: "/login",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Login />,
    },
  ],
};
