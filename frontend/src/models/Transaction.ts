import { TransactionType } from "./TransactionType";


export interface Transaction {
  id: string,
  value: number,
  date: Date,
  symbol: "EUR" | "USD",
  operation: TransactionType
}