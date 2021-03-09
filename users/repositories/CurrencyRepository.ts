import { prisma } from "../utils/prisma"
import IDepositRequest from "../models/IDepositRequest"
import IWithdrawRequest from "../models/IWithdrawRequest"



export async function createDeposit({ userId, symbol, value }: IDepositRequest): Promise<boolean | null> {
  try {
    const currentAccount = await prisma.currentAccount.findFirst({
      where: {
        userId,
        symbol
      }
    })

    const createTransaction = prisma.transaction.create({
      data: {
        operation: "DEPOSIT",
        symbol,
        value,
        userId
      }
    })


    if (!currentAccount) {
      const createCurrentAccount = prisma.currentAccount.create({
        data: {
          symbol,
          value,
          userId
        }
      })

      await prisma.$transaction([createTransaction, createCurrentAccount])
      
    } else {
      const updateCurrentAccount = prisma.currentAccount.update({
        where: {
          id: currentAccount.id
        },
        data: {
          value: currentAccount.value.add(value)
        }
      })
  
      await prisma.$transaction([createTransaction, updateCurrentAccount])
    }
    return true
  } catch(e) {
    throw e
  }
}

export async function createWithdraw({ userId, symbol, value }: IWithdrawRequest) {
  try {
    const currentAccount = await prisma.currentAccount.findFirst({
      where: {
        userId,
        symbol
      }
    })

    if (!currentAccount) {
      return false
    }

    const createTransaction = prisma.transaction.create({
      data: {
        operation: "WITHDRAW",
        symbol,
        value,
        userId
      }
    })

    const updateCurrentAccout = prisma.currentAccount.update({
      where: {
        id: currentAccount.id
      },
      data: {
        value: currentAccount.value.add(-value)
      }
    })

    await prisma.$transaction([createTransaction, updateCurrentAccout])

    return true
  } catch(e) {
    throw e
  }
}

