import { useQuery } from "react-query"
import { getToken } from "../utils/auth"
import { authApi } from "../utils/api"
import { User } from "../models/User"

export function useMeQuery() {
  return useQuery('me', () => authApi().get<User>('users/me'))
}