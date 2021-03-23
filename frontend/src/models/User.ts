import { CurrentAccount } from "./CurrentAccount"

export interface User {
  id: string,
  name: string,
  surname: string,
  email: string,
  iban: string,
  eurCurrentAccount?: CurrentAccount
  usdCurrentAccount?: CurrentAccount
}