import { CurrencySymbol } from "@prisma/client";

export default interface IBuyRequest {
  userId: string,
  fromSymbol: CurrencySymbol,
  value: number
}