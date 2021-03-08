import { hash } from "bcrypt"

export function hashPassword(plainText: string) {
  const rounds = 10
  return hash(plainText, 10)
} 