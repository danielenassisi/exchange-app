import { useQuery } from "react-query"
import { getToken, removeToken } from "../utils/auth"
import { authApi } from "../utils/api"
import { User } from "../models/User"
import { AxiosError } from "axios"
import { useHistory } from "react-router"

export function useMeQuery() {
  const history = useHistory()
  return useQuery('me', () => authApi().get<User>('users/me'), {
    onError: (err: AxiosError) => {
      if (err.code == "401") {
        removeToken()
        history.push('/login')
      }
    }
  })
}