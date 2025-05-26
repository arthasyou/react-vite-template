import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import { loginSuccess } from "@/store/authSlice";
import type { RootState } from "@/store";
import { publicRoutes } from "@/routes/publicRoutes";
import { protectedRoutes } from "@/routes/protectedRoutes";

export default function App() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 你可以加一个实际的 /me 请求，这里暂时 mock 用户
      dispatch(loginSuccess({ token, user: { id: "local", name: "Guest" } }));
    }
    setIsRestored(true);
  }, [dispatch]);

  const router = useMemo(() => {
    if (!isRestored) return null;

    return createBrowserRouter([
      isLogin ? protectedRoutes : publicRoutes,
      {
        path: "*",
        element: <Navigate to={isLogin ? "/" : "/login"} replace />,
      },
    ]);
  }, [isLogin, isRestored]);

  if (!router) return null; // or <Loading />

  return <RouterProvider router={router} />;
}
