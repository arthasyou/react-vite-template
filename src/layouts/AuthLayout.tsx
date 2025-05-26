import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
