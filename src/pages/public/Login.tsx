import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { loginApi } from "@/api";
import type { LoginRequest } from "@/models/authModel";
import { loginSuccess } from "@/store/authSlice";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginRequest = {
      username,
      password,
    };

    try {
      const res = await loginApi(payload); // ✅ 发送请求
      const token = res.access_token;
      const user = res.user ?? { id: "1", name: username };

      // ✅ 保存 token（可选）
      localStorage.setItem("token", token);

      // ✅ 写入 Redux
      dispatch(loginSuccess({ token, user }));

      // ✅ 跳转到原始路径或首页
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
