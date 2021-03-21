import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { hash, compare } from "bcrypt"

export function hashPassword(plainText: string) {
  const rounds = 10
  return hash(plainText, 10)
}

export async function comparePassword(password: string, hashedPassword: string) {
  try {
    const res = await compare(password, hashedPassword)
    return res
  } catch(e) {
    throw { code: Status.INVALID_ARGUMENT } as ServiceError
  }
}