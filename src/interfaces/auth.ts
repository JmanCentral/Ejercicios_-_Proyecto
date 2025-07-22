
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
  message: string;
}
