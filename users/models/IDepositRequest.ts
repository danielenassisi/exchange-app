import { CurrencySymbol } from "@prisma/client";

export default interface IDepositRequest {
  userId: string,
  symbol: CurrencySymbol,
  value: number
}