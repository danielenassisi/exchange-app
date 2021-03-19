import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import { config } from "dotenv"

export function generateJwtToken({ id, email }: User) {
  const key = config().parsed?.SECRET_JWT_KEY || ""

  return jwt.sign({
    id,
    email
  }, key, {
    algorithm: "HS256",
    jwtid: id
  })
}