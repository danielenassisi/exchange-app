import { User } from "@prisma/client"
import jwt, { decode } from "jsonwebtoken"
import { config } from "dotenv"
import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { TokenInfo } from "../models/TokenInfo"

const key = config().parsed?.SECRET_JWT_KEY || ""

export function generateJwtToken({ id, email }: User) {
  

  return jwt.sign({
    email
  }, key, {
    algorithm: "HS256",
    jwtid: id
  })
}

export function verifyToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, key, {
      ignoreExpiration: false
    }) as TokenInfo
    
    return decodedToken
  } catch(e) {
    throw { code: Status.INVALID_ARGUMENT } as ServiceError
  }
}