import { request } from "./base";
import type { UserInfo } from "@/models/userModel";

export const getUserInfoApi = async (): Promise<UserInfo> => {
  const response = await request<undefined, UserInfo>({
    method: "GET",
    url: "/user/get_info",
  });
  return response;
};
