import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Outlet />
    </div>
  );
}
