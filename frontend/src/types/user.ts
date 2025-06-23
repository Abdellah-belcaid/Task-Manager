export interface UserDTO {
  id: string;
  name: string;
  email: string;
  username: string;
  role: Role;
  enabled: boolean;
  token: string;
  createTime: string;
  updatedAt: string;
}

export interface AuthenticationRequest {
  username: string;
  password: string;
}

export type Role = "USER" | "ADMIN" | "MANAGER";

export const INITIAL_AUTH_VALUES: AuthenticationRequest = {
  username: "",
  password: "",
};
