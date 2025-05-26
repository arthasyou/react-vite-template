import type { LoginRequest, LoginResponse } from "@/models/authModel";
import { request } from "./baseApi";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await request<LoginRequest, LoginResponse>({
    method: "POST",
    url: "auth/login",
    body: payload,
  });
  return response; // 解构 data，返回具体类型
};
