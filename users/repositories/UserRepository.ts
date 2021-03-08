import { prisma } from "../utils/prisma"
import ISignupRequest from "../models/ISignupRequest"
import { User } from "@prisma/client"
import { hashPassword } from "../utils/passwordHasher"

export async function addUser({ email, name, surname, iban, password }: ISignupRequest): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        surname,
        iban,
        hashedPassword  
      }
    })
    
    return user
  } catch (e) {
    throw e;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  } catch(e) {
    throw e
  }
}