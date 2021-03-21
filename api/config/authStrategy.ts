import { Strategy } from "passport-http-bearer"
import { UsersService } from "../services/UsersService"


export const bearerStrategy = new Strategy((token, done) => {
  const service = new UsersService()

  service.me(token)
    .then(user => {
      console.log(user)
      done(null, user)
    })
    .catch(err => {
      done(err)
    })
})