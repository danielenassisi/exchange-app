import { CurrencySymbol } from "@prisma/client"
import { prisma } from "../utils/prisma"


export async function getCurrentAccountBySymbol(userId: string, symbol: CurrencySymbol) {
  try {
    return await prisma.currentAccount.findFirst({ where: { userId, symbol }})
  } catch(e) {
    throw e
  }
}