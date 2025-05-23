import App from "@/App";
import Home from "@/pages/protected/Home";
import About from "@/pages/protected/About";

export const protectedRoutes = {
  path: "/",
  element: <App />,
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
