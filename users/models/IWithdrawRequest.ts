import { CurrencySymbol } from "@prisma/client";

export default interface IWithdrawRequest {
  userId: string,
  symbol: CurrencySymbol,
  value: number
}