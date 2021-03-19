import { User } from "./User";

export interface LoginDto {
  token: string,
  user: User
}