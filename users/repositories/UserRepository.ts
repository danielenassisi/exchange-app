import { prisma } from "../utils/prisma"
import ISignupRequest from "../models/ISignupRequest"
import { User } from "@prisma/client"
import { hashPassword } from "../utils/passwordHasher"
import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"

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
    throw { code: Status.INTERNAL } as ServiceError;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw { code: Status.NOT_FOUND } as ServiceError
    } 

    return user
  } catch(e) {
    throw { code: Status.INTERNAL } as ServiceError
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id }})

    if (!user) {
      throw { code: Status.NOT_FOUND } as ServiceError
    }

    return user
  } catch(err) {
    throw { code: Status.INTERNAL } as ServiceError
  }
}