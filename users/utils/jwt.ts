import { User } from "@prisma/client"
import jwt from "jsonwebtoken"

export function generateJwtToken({ id, email }: User) {
  return jwt.sign({
    id,
    email
  }, process.env.SECRET_JWT_KEY as string, {
    algorithm: "RS256",
    jwtid: id
  })
}