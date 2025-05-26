import axios from "axios";

// 创建 axios 实例
const httpClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
httpClient.interceptors.request.use(
  (config) => {
    // 可添加 token
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    Promise.reject(
      new Error(error instanceof Error ? error.message : String(error))
    )
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 可统一处理错误提示
    console.error("请求出错:", error);
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

export default httpClient;
