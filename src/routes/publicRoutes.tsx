import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/public/Login";

export const publicRoutes = {
  path: "/login",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
  ],
};
