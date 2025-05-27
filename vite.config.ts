import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // 加载 .env.[mode] 文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          ws: false,
        },
        "/auth": {
          target: env.VITE_AUTH_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ""),
          ws: false,
        },
        "/files": {
          target: env.VITE_FILES_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/files/, ""),
          ws: false,
        },
      },
    },
  };
});
