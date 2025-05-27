import { request } from "./base";
import type { UserInfo } from "@/models/userModel";

export const userInfoApi = async (): Promise<UserInfo> => {
  const response = await request<undefined, UserInfo>({
    method: "GET",
    url: "/user/info",
  });
  return response;
};
