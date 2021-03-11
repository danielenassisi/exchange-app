import { prisma } from "../utils/prisma"
import IDepositRequest from "../models/IDepositRequest"
import IWithdrawRequest from "../models/IWithdrawRequest"
import IBuyRequest from "../models/IBuyRequest"
import { Operation } from "@prisma/client"



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

export async function createBuy({ userId, value, fromSymbol, toSymbol }: IBuyRequest, convertedValue: number) {
  try {
    const currentAccount = await prisma.currentAccount.findFirst({
      where: {
        userId,
        symbol: fromSymbol
      }
    })

    if (!currentAccount) {
      return false
    }

    if (currentAccount.value.lt(value)) {
      return false
    }

    const createWithdrawTransaction = prisma.transaction.create({
      data: {
        userId,
        operation: Operation.BUY_WITHDRAW,
        symbol: fromSymbol,
        value,
      }
    })

    const createDepositTransaction = prisma.transaction.create({
      data: {
        userId,
        operation: Operation.BUY_DEPOSIT,
        symbol: toSymbol,
        value: convertedValue
      }
    })

    const updateCurrentAccountWithdraw = prisma.currentAccount.update({
      where: {
        id: currentAccount.id
      },
      data: {
        value: currentAccount.value.add(-value)
      }
    })

    const depositCurrentAccount = await prisma.currentAccount.findFirst({
      where: {
        symbol: toSymbol,
        userId
      }
    })

    if (!depositCurrentAccount) {
      const createDepositAccount = prisma.currentAccount.create({
        data: {
          userId,
          symbol: toSymbol,
          value: convertedValue
        }
      })

      await prisma.$transaction([createWithdrawTransaction, createDepositTransaction, createDepositAccount, updateCurrentAccountWithdraw])
    } else {
      const updateDepositAccount = prisma.currentAccount.update({
        where: {
          id: depositCurrentAccount.id
        },
        data: {
          value: depositCurrentAccount.value.add(convertedValue)
        }
      })

      await prisma.$transaction([createWithdrawTransaction, createDepositTransaction, updateDepositAccount, updateCurrentAccountWithdraw])
    }
    
    return true
  } catch(e) {
    throw e
  }
}