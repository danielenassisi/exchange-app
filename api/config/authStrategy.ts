import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { Strategy } from "passport-http-bearer"
import { UsersService } from "../services/UsersService"


export const bearerStrategy = new Strategy((token, done) => {
  const service = new UsersService()
  console.log(token)
  service.me(token)
    .then(user => {
      done(null, user)
    })
    .catch((err: ServiceError) => {
      if (err.code === Status.NOT_FOUND || err.code === Status.INVALID_ARGUMENT) {
        done(null, false)
      }
      done(err)
    })
})