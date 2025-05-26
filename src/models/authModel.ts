export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: { id: string; name: string };
  access_token: string;
  refresh_token: string;
}
