import { ServiceError } from "@grpc/grpc-js"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { CurrencySymbol } from "@prisma/client"
import { prisma } from "../utils/prisma"


export async function getCurrentAccountBySymbol(userId: string, symbol: CurrencySymbol) {
  try {
    const ca =  await prisma.currentAccount.findFirst({ where: { userId, symbol }})

    if (!ca) {
      throw { code: Status.NOT_FOUND } as ServiceError
    }

    return ca
  } catch(e) {
    throw { code: Status.INTERNAL } as ServiceError
  }
}