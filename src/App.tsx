import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";

import type { RootState } from "./store"; // 根据你的 store 类型调整路径
import { publicRoutes, protectedRoutes } from "./routes"; // Adjust the path as needed

export default function App() {
  const isLogin = useSelector((state: RootState) => state.auth?.isLogin);
  const [router, setRouter] = useState(() =>
    createBrowserRouter([publicRoutes])
  );

  useEffect(() => {
    // Switch router on login status change
    setRouter(
      createBrowserRouter(isLogin ? [protectedRoutes] : [publicRoutes])
    );
  }, [isLogin]);

  return <RouterProvider router={router} />;
}
