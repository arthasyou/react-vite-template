import Home from "@/pages/protected/Home";
import About from "@/pages/protected/About";
import AppLayout from "@/layouts/AppLayout";

export const protectedRoutes = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
  ],
};
