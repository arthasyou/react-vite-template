import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import type { RootState } from "@/store";
import { loginSuccess } from "@/store/authSlice";

export default function RequireAuth({
  children,
}: Readonly<{ children: React.ReactElement }>) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isLogin) {
      // 👇 Optional: Fetch user info via /me API here
      dispatch(loginSuccess({ token, user: { id: "local", name: "Guest" } }));
    }

    // 👇 wait one tick to allow Redux update to propagate
    const timeout = setTimeout(() => {
      setIsRestoring(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, [dispatch, isLogin]);

  if (isRestoring) {
    return null; // or <Loading />
  }

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
